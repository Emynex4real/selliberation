# Selliberation — Backend API Guide (Node.js + Express)

This document captures **everything** you need to build the backend API for Selliberation from scratch.
It is written so you can pick it up at any time and know exactly what to build, why, and how.

---

## Table of Contents

1. [What the Backend Needs to Do](#1-what-the-backend-needs-to-do)
2. [Project Setup](#2-project-setup)
3. [Folder Structure](#3-folder-structure)
4. [Environment Variables](#4-environment-variables)
5. [Database Models](#5-database-models)
6. [Middleware](#6-middleware)
7. [Auth Routes — Register & Login](#7-auth-routes--register--login)
8. [User Routes](#8-user-routes)
9. [Course Routes](#9-course-routes)
10. [Commission Logic — The Core Business Rule](#10-commission-logic--the-core-business-rule)
11. [Commission Routes](#11-commission-routes)
12. [Withdrawal Routes](#12-withdrawal-routes)
13. [Referral Network Route](#13-referral-network-route)
14. [Paystack Payment Webhook](#14-paystack-payment-webhook)
15. [Admin Routes](#15-admin-routes)
16. [Full API Endpoint Reference](#16-full-api-endpoint-reference)
17. [Connecting the Frontend](#17-connecting-the-frontend)
18. [Deployment Notes](#18-deployment-notes)

---

## 1. What the Backend Needs to Do

Selliberation is a **subscription + affiliate commission platform**. Users pay ₦5,000/month to access courses
and earn money by referring others. The backend is responsible for:

| Responsibility | Details |
|---|---|
| Authentication | Register, login, JWT-based session |
| User Management | Profile, bank details, subscription status |
| Courses | CRUD for courses, modules, submodules, videos |
| Payments | Receive Paystack webhooks when someone pays |
| Commission Distribution | When a payment lands, walk 6 levels up the referral chain and credit each person |
| Withdrawals | User requests payout; admin approves/rejects |
| Referral Network | Return a user's full referral tree up to 6 levels deep |
| Admin Panel | Manage users, courses, withdrawals, commissions |

---

## 2. Project Setup

```bash
# Create and enter project
mkdir selliberation-api && cd selliberation-api
npm init -y

# Core dependencies
npm install express cors dotenv bcryptjs jsonwebtoken mongoose crypto

# Dev dependencies
npm install -D typescript ts-node nodemon @types/express @types/node @types/bcryptjs @types/jsonwebtoken

# Initialize TypeScript
npx tsc --init
```

Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

Update `package.json` scripts:
```json
"scripts": {
  "dev": "nodemon src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

---

## 3. Folder Structure

```
selliberation-api/
├── src/
│   ├── index.ts              # App entry point, Express setup
│   ├── db.ts                 # MongoDB connection
│   ├── models/
│   │   ├── User.ts
│   │   ├── Course.ts
│   │   ├── Commission.ts
│   │   └── Withdrawal.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── courses.ts
│   │   ├── commissions.ts
│   │   ├── withdrawals.ts
│   │   ├── referrals.ts
│   │   ├── payments.ts
│   │   └── admin.ts
│   ├── middleware/
│   │   ├── auth.ts           # JWT verification
│   │   └── adminOnly.ts      # Admin role guard
│   └── services/
│       └── commissions.ts    # Commission distribution logic
├── .env
├── .gitignore
└── package.json
```

---

## 4. Environment Variables

Create a `.env` file at the root of `selliberation-api/`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/selliberation
JWT_SECRET=your_very_long_random_secret_here
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
```

**Never commit `.env` to git.** Add it to `.gitignore`.

Load it in `src/index.ts`:
```ts
import dotenv from 'dotenv';
dotenv.config();
```

---

## 5. Database Models

These models directly map to the TypeScript types in the frontend (`src/types/index.ts`).

---

### `src/models/User.ts`

```ts
import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'student' | 'affiliate' | 'admin';
  referralCode: string;
  referredBy?: string;       // referralCode of the person who referred them
  stage: number;             // 1-6, tracks how deep in the network they are
  subscriptionStatus: 'trial' | 'premium' | 'expired';
  trialEndsAt: Date;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

const UserSchema = new mongoose.Schema<IUser>({
  name:             { type: String, required: true },
  email:            { type: String, required: true, unique: true, lowercase: true },
  phone:            { type: String, required: true },
  passwordHash:     { type: String, required: true },
  role:             { type: String, enum: ['student', 'affiliate', 'admin'], default: 'student' },
  referralCode:     { type: String, required: true, unique: true },
  referredBy:       { type: String, default: null },
  stage:            { type: Number, default: 1 },
  subscriptionStatus: { type: String, enum: ['trial', 'premium', 'expired'], default: 'trial' },
  trialEndsAt:      { type: Date },
  bankDetails: {
    bankName:       String,
    accountNumber:  String,
    accountName:    String,
  },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
```

---

### `src/models/Course.ts`

```ts
import mongoose, { Document } from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  videoUrl:   { type: String, required: true },  // YouTube embed URL or Cloudflare stream URL
  duration:   { type: Number, required: true },  // in seconds
  orderIndex: { type: Number, required: true },
});

const SubModuleSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  orderIndex:  { type: Number, required: true },
  videos:      [VideoSchema],
});

const ModuleSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  orderIndex: { type: Number, required: true },
  isFree:     { type: Boolean, default: false }, // first module is usually free preview
  submodules: [SubModuleSchema],
});

const CourseSchema = new mongoose.Schema({
  slug:        { type: String, required: true, unique: true },
  title:       { type: String, required: true },
  description: { type: String },
  thumbnail:   { type: String },
  modules:     [ModuleSchema],
}, { timestamps: true });

export default mongoose.model('Course', CourseSchema);
```

---

### `src/models/Commission.ts`

```ts
import mongoose, { Document } from 'mongoose';

export interface ICommission extends Document {
  payerId: mongoose.Types.ObjectId;       // who paid the subscription
  payerName: string;
  beneficiaryId: mongoose.Types.ObjectId; // who earned the commission
  courseId: string;
  level: number;                          // 1 to 6
  amount: number;                         // ₦3250, ₦750, ₦250, ₦150, ₦100, ₦50
  status: 'pending' | 'withdrawable' | 'withdrawn';
}

const CommissionSchema = new mongoose.Schema<ICommission>({
  payerId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  payerName:     { type: String },
  beneficiaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId:      { type: String },
  level:         { type: Number, required: true, min: 1, max: 6 },
  amount:        { type: Number, required: true },
  status:        { type: String, enum: ['pending', 'withdrawable', 'withdrawn'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<ICommission>('Commission', CommissionSchema);
```

**Commission status flow:**
- `pending` → created when payment happens, held for a short period (e.g. 24h) to allow for refunds
- `withdrawable` → released, user can now request payout
- `withdrawn` → user has withdrawn it

---

### `src/models/Withdrawal.ts`

```ts
import mongoose, { Document } from 'mongoose';

export interface IWithdrawal extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNote?: string;
}

const WithdrawalSchema = new mongoose.Schema<IWithdrawal>({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount:        { type: Number, required: true },
  bankName:      { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountName:   { type: String, required: true },
  status:        { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNote:     { type: String },
}, { timestamps: true });

export default mongoose.model<IWithdrawal>('Withdrawal', WithdrawalSchema);
```

---

## 6. Middleware

### `src/middleware/auth.ts` — Verifies JWT on protected routes

```ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
```

### `src/middleware/adminOnly.ts` — Blocks non-admin users

```ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}
```

**Usage example:**
```ts
router.get('/admin/users', authMiddleware, adminOnly, handler);
```

---

## 7. Auth Routes — Register & Login

### `src/routes/auth.ts`

```ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

// Helper: generate a unique referral code
function generateReferralCode(): string {
  return 'SELL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Helper: strip passwordHash from user object before sending to frontend
function sanitizeUser(user: any) {
  const obj = user.toObject ? user.toObject() : user;
  const { passwordHash, __v, ...safe } = obj;
  return safe;
}

// ─── POST /api/auth/register ─────────────────────────────────────────────────
// Body: { name, email, phone, password, refCode? }
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, refCode } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // If a refCode was provided, verify it exists
    if (refCode) {
      const referrer = await User.findOne({ referralCode: refCode });
      if (!referrer) return res.status(400).json({ message: 'Invalid referral code' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days trial

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      passwordHash,
      referralCode: generateReferralCode(),
      referredBy: refCode || null,
      stage: 1,
      subscriptionStatus: 'trial',
      trialEndsAt,
    });

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
// Body: { email, password }
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid email or password' });

    // Auto-expire trial if past trialEndsAt
    if (user.subscriptionStatus === 'trial' && new Date() > user.trialEndsAt) {
      user.subscriptionStatus = 'expired';
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
```

---

## 8. User Routes

### `src/routes/users.ts`

```ts
import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import User from '../models/User';

const router = Router();

// ─── GET /api/users/me ────────────────────────────────────────────────────────
// Returns the currently logged-in user's profile
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId).select('-passwordHash -__v');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// ─── PATCH /api/users/me ──────────────────────────────────────────────────────
// Update name, phone, or bank details
// Body: { name?, phone?, bankDetails?: { bankName, accountNumber, accountName } }
router.patch('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  const allowed = ['name', 'phone', 'bankDetails'];
  const updates: any = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }

  const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-passwordHash -__v');
  res.json(user);
});

// ─── PATCH /api/users/me/password ────────────────────────────────────────────
// Body: { currentPassword, newPassword }
router.patch('/me/password', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const bcrypt = require('bcryptjs');
  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return res.status(400).json({ message: 'Current password is incorrect' });

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Password updated' });
});

export default router;
```

---

## 9. Course Routes

### `src/routes/courses.ts`

```ts
import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import Course from '../models/Course';

const router = Router();

// ─── GET /api/courses ─────────────────────────────────────────────────────────
// Public — returns all courses (modules included, but videos only for premium users)
router.get('/', async (req: Request, res: Response) => {
  const courses = await Course.find().select('-modules.submodules.videos');
  res.json(courses);
});

// ─── GET /api/courses/:slug ───────────────────────────────────────────────────
// Auth required — full course detail
// Free modules always visible; premium modules only if user has active subscription
router.get('/:slug', authMiddleware, async (req: AuthRequest, res: Response) => {
  const course = await Course.findOne({ slug: req.params.slug });
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const User = require('../models/User').default;
  const user = await User.findById(req.userId);
  const isPremium = user?.subscriptionStatus === 'premium';

  // If not premium, lock videos in non-free modules
  if (!isPremium) {
    const locked = course.toObject();
    locked.modules = locked.modules.map((mod: any) => {
      if (!mod.isFree) {
        mod.submodules = mod.submodules.map((sub: any) => ({ ...sub, videos: [] }));
      }
      return mod;
    });
    return res.json(locked);
  }

  res.json(course);
});

// ─── POST /api/courses ────────────────────────────────────────────────────────
// Admin only — create a new course
router.post('/', authMiddleware, adminOnly, async (req: AuthRequest, res: Response) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
});

// ─── PATCH /api/courses/:id ───────────────────────────────────────────────────
// Admin only — update a course
router.patch('/:id', authMiddleware, adminOnly, async (req: AuthRequest, res: Response) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(course);
});

// ─── DELETE /api/courses/:id ──────────────────────────────────────────────────
// Admin only
router.delete('/:id', authMiddleware, adminOnly, async (req: AuthRequest, res: Response) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: 'Course deleted' });
});

export default router;
```

---

## 10. Commission Logic — The Core Business Rule

This is the most important piece of the entire backend.
**Every time a payment is confirmed**, this service runs.

### `src/services/commissions.ts`

```ts
import User from '../models/User';
import Commission from '../models/Commission';

// Commission rates per level — must always add up to ≤ ₦5,000
const COMMISSION_RATES = [
  { level: 1, amount: 3250 },  // 65% — direct referrer
  { level: 2, amount: 750  },  // 15%
  { level: 3, amount: 250  },  // 5%
  { level: 4, amount: 150  },  // 3%
  { level: 5, amount: 100  },  // 2%
  { level: 6, amount: 50   },  // 1%
];

/**
 * Called after a successful payment.
 * Walks up the referral chain (up to 6 levels) and creates a Commission
 * record for each person who should be paid.
 *
 * @param payerUserId  - MongoDB _id of the user who just paid
 * @param courseId     - ID of the course/subscription they paid for
 */
export async function distributeCommissions(payerUserId: string, courseId: string): Promise<void> {
  const payer = await User.findById(payerUserId);
  if (!payer) return;

  // The payer earns nothing — only the people ABOVE them in the chain earn
  let currentReferralCode = payer.referredBy;

  for (const { level, amount } of COMMISSION_RATES) {
    if (!currentReferralCode) break; // reached the top of the chain

    const beneficiary = await User.findOne({ referralCode: currentReferralCode });
    if (!beneficiary) break;

    // Create the commission record
    await Commission.create({
      payerId:       payer._id,
      payerName:     payer.name,
      beneficiaryId: beneficiary._id,
      courseId,
      level,
      amount,
      status: 'pending',  // becomes 'withdrawable' after hold period
    });

    // Move one level up the chain
    currentReferralCode = beneficiary.referredBy ?? null;
  }
}

/**
 * Release pending commissions to 'withdrawable' status.
 * Run this as a cron job (e.g. every 24 hours) to release held funds.
 * You can use node-cron or a Vercel/Render cron job for this.
 */
export async function releasePendingCommissions(): Promise<void> {
  const holdPeriodMs = 24 * 60 * 60 * 1000; // 24-hour hold after payment

  await Commission.updateMany(
    {
      status: 'pending',
      createdAt: { $lt: new Date(Date.now() - holdPeriodMs) },
    },
    { $set: { status: 'withdrawable' } }
  );
}
```

---

## 11. Commission Routes

### `src/routes/commissions.ts`

```ts
import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import Commission from '../models/Commission';

const router = Router();

// ─── GET /api/commissions ─────────────────────────────────────────────────────
// My commission history — paginated
// Query: ?page=1&limit=20&status=withdrawable
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const page  = parseInt(req.query.page as string)  || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const filter: any = { beneficiaryId: req.userId };

  if (req.query.status) filter.status = req.query.status;

  const [commissions, total] = await Promise.all([
    Commission.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Commission.countDocuments(filter),
  ]);

  res.json({ commissions, total, page, totalPages: Math.ceil(total / limit) });
});

// ─── GET /api/commissions/summary ────────────────────────────────────────────
// Summary totals for the earnings dashboard
// Returns: { totalEarned, withdrawable, withdrawn, pending }
router.get('/summary', authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  const [pending, withdrawable, withdrawn] = await Promise.all([
    Commission.aggregate([
      { $match: { beneficiaryId: userId, status: 'pending' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Commission.aggregate([
      { $match: { beneficiaryId: userId, status: 'withdrawable' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Commission.aggregate([
      { $match: { beneficiaryId: userId, status: 'withdrawn' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
  ]);

  const get = (agg: any[]) => agg[0]?.total ?? 0;

  res.json({
    pending:       get(pending),
    withdrawable:  get(withdrawable),
    withdrawn:     get(withdrawn),
    totalEarned:   get(pending) + get(withdrawable) + get(withdrawn),
  });
});

export default router;
```

---

## 12. Withdrawal Routes

### `src/routes/withdrawals.ts`

```ts
import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import Withdrawal from '../models/Withdrawal';
import Commission from '../models/Commission';
import User from '../models/User';

const router = Router();

// ─── POST /api/withdrawals ────────────────────────────────────────────────────
// User requests a withdrawal
// Body: { amount, bankName, accountNumber, accountName }
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { amount, bankName, accountNumber, accountName } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  // Check user has enough withdrawable balance
  const result = await Commission.aggregate([
    { $match: { beneficiaryId: req.userId, status: 'withdrawable' } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);
  const balance = result[0]?.total ?? 0;

  if (amount > balance) {
    return res.status(400).json({ message: `Insufficient balance. You have ₦${balance} withdrawable.` });
  }

  // Check no pending withdrawal already exists
  const pending = await Withdrawal.findOne({ userId: req.userId, status: 'pending' });
  if (pending) {
    return res.status(400).json({ message: 'You already have a pending withdrawal request' });
  }

  const withdrawal = await Withdrawal.create({
    userId: req.userId,
    amount,
    bankName,
    accountNumber,
    accountName,
  });

  res.status(201).json(withdrawal);
});

// ─── GET /api/withdrawals ─────────────────────────────────────────────────────
// My withdrawal history
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const withdrawals = await Withdrawal.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(withdrawals);
});

export default router;
```

---

## 13. Referral Network Route

### `src/routes/referrals.ts`

```ts
import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import User from '../models/User';

const router = Router();

// ─── GET /api/referrals/network ───────────────────────────────────────────────
// Returns the logged-in user's referral tree up to 6 levels deep
// Used on the Referrals page to show the network tree
router.get('/network', authMiddleware, async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const tree = await buildReferralTree(user.referralCode, 1, 6);
  res.json(tree);
});

// ─── GET /api/referrals/stats ─────────────────────────────────────────────────
// Quick stats: total referrals, active (premium), trial, expired
router.get('/stats', authMiddleware, async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Get all downline users across all levels
  const allDownline = await getAllDownline(user.referralCode);

  const stats = {
    total:   allDownline.length,
    premium: allDownline.filter(u => u.subscriptionStatus === 'premium').length,
    trial:   allDownline.filter(u => u.subscriptionStatus === 'trial').length,
    expired: allDownline.filter(u => u.subscriptionStatus === 'expired').length,
  };

  res.json(stats);
});

// ─── Recursive helper: build tree up to maxDepth levels ───────────────────────
async function buildReferralTree(referralCode: string, currentLevel: number, maxDepth: number): Promise<any[]> {
  if (currentLevel > maxDepth) return [];

  const directReferrals = await User.find({ referredBy: referralCode }).select('name referralCode subscriptionStatus createdAt');

  return Promise.all(
    directReferrals.map(async (referred) => ({
      id:                 referred._id,
      name:               referred.name,
      level:              currentLevel,
      subscriptionStatus: referred.subscriptionStatus,
      createdAt:          referred.createdAt,
      children:           await buildReferralTree(referred.referralCode, currentLevel + 1, maxDepth),
    }))
  );
}

// ─── Flat list of all downline users (for stats) ──────────────────────────────
async function getAllDownline(referralCode: string, depth = 0): Promise<any[]> {
  if (depth >= 6) return [];
  const direct = await User.find({ referredBy: referralCode });
  const nested = await Promise.all(direct.map(u => getAllDownline(u.referralCode, depth + 1)));
  return [...direct, ...nested.flat()];
}

export default router;
```

---

## 14. Paystack Payment Webhook

This is the **entry point for money**. Paystack calls this URL every time a payment succeeds.
You must register this URL in your Paystack dashboard under **Settings → Webhooks**.

### `src/routes/payments.ts`

```ts
import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import User from '../models/User';
import { distributeCommissions } from '../services/commissions';

const router = Router();

// ─── POST /api/payments/initialize ───────────────────────────────────────────
// Frontend calls this to get a Paystack payment URL
// Body: { email, amount, userId, courseId }
router.post('/initialize', async (req: Request, res: Response) => {
  const { email, amount, userId, courseId } = req.body;

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: amount * 100,  // Paystack uses kobo (multiply by 100)
      metadata: { userId, courseId },
      callback_url: `${process.env.FRONTEND_URL}/dashboard/payment-success`,
    }),
  });

  const data = await response.json() as any;
  res.json({ paymentUrl: data.data.authorization_url });
});

// ─── POST /api/payments/webhook ───────────────────────────────────────────────
// Paystack sends this automatically after every successful payment
// IMPORTANT: Use express.raw() here so we can verify the signature
router.post(
  '/webhook',
  (req, res, next) => {
    // Override body parser — we need raw bytes for signature verification
    express.raw({ type: 'application/json' })(req, res, next);
  },
  async (req: Request, res: Response) => {
    // 1. Verify the request actually came from Paystack
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(req.body)
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    // 2. Parse the event
    const event = JSON.parse(req.body.toString());

    if (event.event === 'charge.success') {
      const { userId, courseId } = event.data.metadata;

      // 3. Upgrade the user's subscription
      await User.findByIdAndUpdate(userId, {
        subscriptionStatus: 'premium',
        role: 'affiliate',  // once paid, they become an affiliate who can earn
      });

      // 4. Walk up the referral chain and credit everyone (up to 6 levels)
      await distributeCommissions(userId, courseId);
    }

    // Always respond 200 quickly — Paystack retries if you don't
    res.sendStatus(200);
  }
);

// Need express reference for raw body override above
import express from 'express';

export default router;
```

---

## 15. Admin Routes

### `src/routes/admin.ts`

```ts
import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { adminOnly } from '../middleware/adminOnly';
import User from '../models/User';
import Commission from '../models/Commission';
import Withdrawal from '../models/Withdrawal';

const router = Router();
// All admin routes require authentication + admin role
router.use(authMiddleware, adminOnly);

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
// Dashboard overview numbers
router.get('/stats', async (_req: AuthRequest, res: Response) => {
  const [
    totalUsers, premiumUsers, trialUsers,
    pendingWithdrawals, totalWithdrawn,
    totalCommissions,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ subscriptionStatus: 'premium' }),
    User.countDocuments({ subscriptionStatus: 'trial' }),
    Withdrawal.countDocuments({ status: 'pending' }),
    Withdrawal.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Commission.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
  ]);

  res.json({
    totalUsers,
    premiumUsers,
    trialUsers,
    pendingWithdrawals,
    totalWithdrawn:    totalWithdrawn[0]?.total  ?? 0,
    totalCommissions:  totalCommissions[0]?.total ?? 0,
    monthlyRevenue:    premiumUsers * 5000,
  });
});

// ─── GET /api/admin/users ─────────────────────────────────────────────────────
// List all users with search + filter
// Query: ?page=1&limit=20&search=john&role=affiliate&status=premium
router.get('/users', async (req: AuthRequest, res: Response) => {
  const page   = parseInt(req.query.page as string)  || 1;
  const limit  = parseInt(req.query.limit as string) || 20;
  const filter: any = {};

  if (req.query.search) {
    filter.$or = [
      { name:  { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
    ];
  }
  if (req.query.role)   filter.role = req.query.role;
  if (req.query.status) filter.subscriptionStatus = req.query.status;

  const [users, total] = await Promise.all([
    User.find(filter).select('-passwordHash').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    User.countDocuments(filter),
  ]);

  res.json({ users, total, page, totalPages: Math.ceil(total / limit) });
});

// ─── PATCH /api/admin/users/:id ───────────────────────────────────────────────
// Update a user's role or subscription status
// Body: { role?, subscriptionStatus? }
router.patch('/users/:id', async (req: AuthRequest, res: Response) => {
  const allowed = ['role', 'subscriptionStatus', 'stage'];
  const updates: any = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  }
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-passwordHash');
  res.json(user);
});

// ─── DELETE /api/admin/users/:id ─────────────────────────────────────────────
router.delete('/users/:id', async (req: AuthRequest, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// ─── GET /api/admin/withdrawals ───────────────────────────────────────────────
// List all withdrawal requests
// Query: ?status=pending
router.get('/withdrawals', async (req: AuthRequest, res: Response) => {
  const filter: any = {};
  if (req.query.status) filter.status = req.query.status;

  const withdrawals = await Withdrawal.find(filter)
    .populate('userId', 'name email phone')
    .sort({ createdAt: -1 });

  res.json(withdrawals);
});

// ─── PATCH /api/admin/withdrawals/:id ────────────────────────────────────────
// Approve or reject a withdrawal
// Body: { status: 'approved' | 'rejected', adminNote? }
router.patch('/withdrawals/:id', async (req: AuthRequest, res: Response) => {
  const { status, adminNote } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status must be approved or rejected' });
  }

  const withdrawal = await Withdrawal.findByIdAndUpdate(
    req.params.id,
    { status, adminNote },
    { new: true }
  );

  if (!withdrawal) return res.status(404).json({ message: 'Withdrawal not found' });

  // If approved, mark commissions as 'withdrawn' to reduce user balance
  if (status === 'approved') {
    const Commission = require('../models/Commission').default;
    // Mark withdrawable commissions as withdrawn up to the withdrawal amount
    const userCommissions = await Commission.find({
      beneficiaryId: withdrawal.userId,
      status: 'withdrawable',
    }).sort({ createdAt: 1 });

    let remaining = withdrawal.amount;
    for (const commission of userCommissions) {
      if (remaining <= 0) break;
      await commission.updateOne({ status: 'withdrawn' });
      remaining -= commission.amount;
    }
  }

  res.json(withdrawal);
});

// ─── GET /api/admin/commissions ───────────────────────────────────────────────
// View all commissions with filters
router.get('/commissions', async (req: AuthRequest, res: Response) => {
  const page  = parseInt(req.query.page as string)  || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const filter: any = {};
  if (req.query.status) filter.status = req.query.status;

  const [commissions, total] = await Promise.all([
    Commission.find(filter)
      .populate('payerId', 'name email')
      .populate('beneficiaryId', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Commission.countDocuments(filter),
  ]);

  res.json({ commissions, total, page, totalPages: Math.ceil(total / limit) });
});

export default router;
```

---

## 16. Full API Endpoint Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user. Accepts `refCode` |
| POST | `/api/auth/login` | Public | Login, returns JWT token |
| GET | `/api/users/me` | User | Get my profile |
| PATCH | `/api/users/me` | User | Update name, phone, bank details |
| PATCH | `/api/users/me/password` | User | Change password |
| GET | `/api/courses` | Public | List all courses (no videos) |
| GET | `/api/courses/:slug` | User | Full course; videos locked if not premium |
| POST | `/api/courses` | Admin | Create a course |
| PATCH | `/api/courses/:id` | Admin | Update a course |
| DELETE | `/api/courses/:id` | Admin | Delete a course |
| GET | `/api/commissions` | User | My commission history |
| GET | `/api/commissions/summary` | User | My earnings totals |
| POST | `/api/withdrawals` | User | Request a payout |
| GET | `/api/withdrawals` | User | My withdrawal history |
| GET | `/api/referrals/network` | User | My referral tree (6 levels deep) |
| GET | `/api/referrals/stats` | User | My referral counts |
| POST | `/api/payments/initialize` | User | Get Paystack payment URL |
| POST | `/api/payments/webhook` | Paystack | Receive payment confirmation |
| GET | `/api/admin/stats` | Admin | Dashboard overview numbers |
| GET | `/api/admin/users` | Admin | List all users |
| PATCH | `/api/admin/users/:id` | Admin | Update user role/status |
| DELETE | `/api/admin/users/:id` | Admin | Delete a user |
| GET | `/api/admin/withdrawals` | Admin | List withdrawal requests |
| PATCH | `/api/admin/withdrawals/:id` | Admin | Approve or reject withdrawal |
| GET | `/api/admin/commissions` | Admin | View all commissions |

---

## 17. Connecting the Frontend

### Step 1 — Add `.env` to the frontend (Selliberation/)

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 2 — Create an API helper (`src/lib/api.ts`)

```ts
const BASE = import.meta.env.VITE_API_URL;

export async function apiFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('selliberation_token');

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }

  return res.json();
}
```

### Step 3 — Update `AuthContext.tsx`

Replace the mock `login` and `register` functions:

```ts
// src/context/AuthContext.tsx — updated login
const login = async (email: string, password: string) => {
  const { token, user } = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('selliberation_token', token);
  setUser(user);
};

// updated register
const register = async (name: string, email: string, phone: string, password: string, refCode?: string) => {
  const { token, user } = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, phone, password, refCode }),
  });
  localStorage.setItem('selliberation_token', token);
  setUser(user);
};

// updated logout
const logout = () => {
  localStorage.removeItem('selliberation_token');
  localStorage.removeItem('selliberation_user');
  setUser(null);
};
```

### Step 4 — Replace mock data in pages

Every page that currently imports from `mockData.ts` should switch to `apiFetch`.

**Example — Earnings page:**
```ts
// Before
import { mockCommissions } from '../../data/mockData';

// After
import { apiFetch } from '../../lib/api';
const { commissions } = await apiFetch('/commissions');
const summary = await apiFetch('/commissions/summary');
```

**Example — Courses page:**
```ts
// Before
import { mockCourses } from '../../data/mockData';

// After
const courses = await apiFetch('/courses');
```

---

## 18. Deployment Notes

### Backend — Deploy to Render or Railway

1. Push `selliberation-api/` to its own GitHub repo
2. Create a new **Web Service** on Render
3. Set **Build Command:** `npm run build`
4. Set **Start Command:** `node dist/index.js`
5. Add all `.env` variables in the Environment section
6. Copy the live URL (e.g. `https://selliberation-api.onrender.com`)

### Frontend — Update Vercel env var

In Vercel project settings → Environment Variables:
```
VITE_API_URL = https://selliberation-api.onrender.com/api
```

### Paystack Webhook Registration

In your Paystack Dashboard → Settings → API Keys & Webhooks:
- Set webhook URL to: `https://selliberation-api.onrender.com/api/payments/webhook`

### CORS — Update for production

In `src/index.ts`, update the CORS origin:
```ts
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://selliberation.vercel.app',  // your Vercel URL
  ]
}));
```

---

## Summary: The Money Flow in 6 Steps

```
1. User visits /register?ref=SELL-AB12XZ
        ↓
2. Registers → referredBy = 'SELL-AB12XZ' saved in DB
        ↓
3. User pays ₦5,000 via Paystack button
        ↓
4. Paystack calls POST /api/payments/webhook
        ↓
5. Backend upgrades user to premium + affiliate
   Then walks UP the chain 6 levels:
     Level 1 referrer → ₦3,250 commission (pending)
     Level 2 referrer → ₦750 commission (pending)
     Level 3 referrer → ₦250 commission (pending)
     Level 4 referrer → ₦150 commission (pending)
     Level 5 referrer → ₦100 commission (pending)
     Level 6 referrer → ₦50 commission (pending)
        ↓
6. After 24h hold → commissions become 'withdrawable'
   User requests withdrawal → admin approves → user gets paid
```

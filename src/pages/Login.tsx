import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginAs, setLoginAs] = useState<'student' | 'admin'>('student');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, loginAs);
    navigate(loginAs === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="text-3xl font-bold text-amber-500 block text-center mb-8">Selliberation</Link>
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-6">Welcome Back</h1>
          
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setLoginAs('student')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${loginAs === 'student' ? 'bg-amber-500 text-gray-900' : 'bg-gray-700 text-gray-400'}`}
            >
              Student Login
            </button>
            <button
              type="button"
              onClick={() => setLoginAs('admin')}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${loginAs === 'admin' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'}`}
            >
              <Shield size={16} /> Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 pr-12"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button type="submit" className={`w-full font-bold py-3 rounded-lg ${loginAs === 'admin' ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-gray-900'}`}>
              Login as {loginAs === 'admin' ? 'Admin' : 'Student'}
            </button>
          </form>
          <p className="text-gray-400 text-center mt-6">
            Don't have an account? <Link to="/register" className="text-amber-500 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Users, DollarSign, Wallet, Settings, LogOut, Menu, X, Bell } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/courses', icon: BookOpen, label: 'My Courses' },
    { to: '/dashboard/referrals', icon: Users, label: 'Referrals' },
    { to: '/dashboard/earnings', icon: DollarSign, label: 'Earnings' },
    { to: '/dashboard/withdraw', icon: Wallet, label: 'Withdraw' },
    { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="text-xl font-bold text-amber-500">Selliberation</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name.charAt(0)}
              </div>
              <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <aside className={`fixed top-14 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full">
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>

      <main className="lg:ml-64 pt-14 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

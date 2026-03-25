import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, DollarSign, Wallet, Settings, LogOut, Menu, X, BarChart3 } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { to: '/admin/commissions', icon: DollarSign, label: 'Commissions' },
    { to: '/admin/withdrawals', icon: Wallet, label: 'Withdrawals' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/admin" className="text-xl font-bold text-amber-600 flex items-center gap-2">
              <BarChart3 /> Selliberation Admin
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm text-gray-600 hover:text-amber-600">View Site</Link>
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
              A
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
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 mt-4 border-t">
            <LogOut size={20} />
            Logout
          </Link>
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

import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Fundamentals', to: '/fundamentals' },
  { label: 'Roadmap', to: '/roadmap' },
];

export default function Navbar({ user, setUser }) {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-gradient-to-r from-white/80 via-blue-50/80 to-teal-50/80 backdrop-blur-xl dark:border-slate-700 dark:bg-gradient-to-r dark:from-slate-800/80 dark:via-slate-800/80 dark:to-slate-800/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-100 to-blue-100 dark:from-slate-700 dark:to-slate-600">
            {/* Logo placeholder */}
          </div>
          <Link to="/" className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-xl font-extrabold tracking-wider text-transparent dark:from-teal-300 dark:via-blue-300 dark:to-purple-300">
            PLACIFY
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-teal-600 hover:bg-teal-100 hover:text-teal-800 dark:text-teal-300 dark:hover:bg-slate-700 dark:hover:text-teal-200"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <nav className="hidden items-center gap-4 lg:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-teal-100 hover:text-teal-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-teal-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {user && (
            <div className="flex items-center gap-2">
              <Link
                to="/user-profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700 transition hover:bg-teal-200 dark:bg-slate-700 dark:text-teal-200 dark:hover:bg-slate-600"
                title="View profile"
              >
                {initials}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-100 hover:text-red-700 dark:text-slate-300 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                title="Logout"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

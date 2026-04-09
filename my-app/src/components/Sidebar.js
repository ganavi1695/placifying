import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Fundamentals', to: '/fundamentals' },
  { label: 'Domains', to: '/domains' },
  { label: 'Chatbot', to: '/chatbot' },
  { label: 'Quiz', to: '/quiz' },
  { label: 'Roadmap', to: '/roadmap' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Progress', to: '/progress' },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-gradient-to-b from-white via-blue-50 to-teal-50 p-5 md:block dark:border-slate-700 dark:bg-gradient-to-b dark:from-slate-800 dark:via-slate-800 dark:to-slate-800">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-teal-600 dark:text-teal-300">Navigation</p>
          <h2 className="mt-3 text-xl font-semibold text-teal-700 dark:text-teal-200">Learning Hub</h2>
        </div>
        <div className="space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? 'bg-teal-100/50 text-teal-700 shadow-md dark:bg-slate-700 dark:text-teal-300'
                    : 'text-slate-700 hover:bg-blue-100/50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

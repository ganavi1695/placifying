export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400/50';
  const variants = {
    primary: 'bg-gradient-to-r from-teal-300 to-blue-300 text-slate-900 hover:from-teal-200 hover:to-blue-200 dark:from-teal-400 dark:to-blue-400 dark:text-slate-900 dark:hover:from-teal-300 dark:hover:to-blue-300',
    secondary: 'bg-gradient-to-r from-purple-300 to-pink-300 text-slate-900 hover:from-purple-200 hover:to-pink-200 dark:from-purple-400 dark:to-pink-400 dark:text-slate-900 dark:hover:from-purple-300 dark:hover:to-pink-300',
    ghost: 'bg-transparent text-teal-600 hover:bg-teal-100 dark:text-teal-300 dark:hover:bg-slate-700',
  };
  return (
    <button className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}

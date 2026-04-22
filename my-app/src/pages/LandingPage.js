import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function LandingPage({ isRegistered, isProfileComplete, isPathSelected }) {
  const hero = isPathSelected
    ? {
        title: 'Welcome back!',
        subtitle: 'Your learning dashboard is ready. Continue with the next milestone and keep your momentum going.',
        actionLabel: 'Go to dashboard',
        actionTo: '/dashboard',
      }
    : isProfileComplete
    ? {
        title: 'Path selection ready',
        subtitle: 'Complete your specialization choice to unlock the full learning experience.',
        actionLabel: 'Choose your path',
        actionTo: '/selection',
      }
    : isRegistered
    ? {
        title: 'Your account is almost ready',
        subtitle: 'Finish your profile so we can personalize your learning path and dashboard.',
        actionLabel: 'Complete profile',
        actionTo: '/profile',
      }
    : {
        title: 'Build your career roadmap with AI-powered learning and progress tracking.',
        subtitle: 'Start with registration, choose your specialization, complete guided fundamentals, and track your daily learning journey with a clean modern dashboard.',
        actions: [
    { label: 'Sign Up', to: '/register' },
    { label: 'Login', to: '/login' },
  ],
      };

  return (
    <section className="mx-auto max-w-6xl space-y-10 rounded-[2rem] bg-gradient-to-br from-white via-blue-50 to-teal-50 p-8 shadow-xl shadow-slate-200/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 dark:shadow-slate-950/50 md:p-12">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
            AI learning platform
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            {hero.title}
          </h1>
          <p className="max-w-xl text-slate-600 dark:text-slate-300">
            {hero.subtitle}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
  {hero.actions ? (
    hero.actions.map((action, index) => (
      <Link key={index} to={action.to}>
        <Button
          className={`w-full sm:w-auto ${
            action.label === 'Login'
              ? 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-100'
              : ''
          }`}
        >
          {action.label}
        </Button>
      </Link>
    ))
  ) : (
    <Link to={hero.actionTo}>
      <Button className="w-full sm:w-auto">{hero.actionLabel}</Button>
    </Link>
  )}
</div>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-lg shadow-slate-200/50 dark:from-slate-700 dark:to-slate-700 dark:shadow-slate-950/50">
          <div className="mx-auto flex h-[320px] w-[320px] items-center justify-center rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-300/40 dark:bg-slate-800 dark:shadow-slate-950/50">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.8rem] border border-dashed border-slate-300 bg-slate-50 text-center text-slate-700 shadow-inner shadow-slate-200/50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
              <div className="mb-4 h-20 w-20 rounded-full bg-teal-200 text-3xl leading-[5rem] text-slate-900 dark:bg-teal-700 dark:text-slate-950">📘</div>
              <p className="text-xl font-semibold">Our logo here</p>
              <p className="mt-2 px-4 text-sm text-slate-500 dark:text-slate-400">A calm learning companion for your first step into the AI journey.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

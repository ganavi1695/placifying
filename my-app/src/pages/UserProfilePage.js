import { Link } from 'react-router-dom';

export default function UserProfilePage({ user }) {
  const lastUpdated = user?.lastUpdated ? new Date(user.lastUpdated).toLocaleString() : 'Not updated yet';

  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-teal-600 dark:text-teal-300">User profile</p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Your saved profile</h1>
          <p className="text-slate-600 dark:text-slate-300">This page shows the latest profile details stored in your account.</p>
        </div>

        <div className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="grid gap-2">
            <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Name</span>
            <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{user?.name || 'Not provided'}</p>
          </div>

          <div className="grid gap-2">
            <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Email</span>
            <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{user?.email || 'Not provided'}</p>
          </div>

          <div className="grid gap-2">
            <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Date of birth</span>
            <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{user?.dob || 'Not provided'}</p>
          </div>

          <div className="grid gap-2">
            <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Timeline</span>
            <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{user?.timeline || 'Not provided'}</p>
          </div>

          <div className="grid gap-2">
            <span className="text-sm uppercase tracking-[0.3em] text-slate-400">Last update</span>
            <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{lastUpdated}</p>
          </div>
        </div>

        <div className="flex justify-between gap-4 sm:items-center sm:flex-row flex-col">
          <Link
            to="/profile"
            className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Edit profile
          </Link>
          <Link
            to="/selection"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Go to selection
          </Link>
        </div>
      </div>
    </div>
  );
}

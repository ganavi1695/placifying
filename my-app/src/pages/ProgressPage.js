import ProgressBar from '../components/ProgressBar';

const metrics = [
  { label: 'Study consistency', value: 78 },
  { label: 'Quiz mastery', value: 65 },
  { label: 'Task completion', value: 84 },
];

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Progress tracking</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">Visualize your current milestones, streaks, and learning performance.</p>
          <div className="mt-8 space-y-6">
            {metrics.map((metric) => (
              <ProgressBar key={metric.label} label={metric.label} value={metric.value} />
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
          <div className="rounded-3xl bg-gradient-to-br from-teal-100 to-blue-100 p-6 text-slate-900 dark:from-slate-700 dark:to-slate-700 dark:text-slate-50">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Current streak</h3>
            <p className="mt-2 text-5xl font-semibold">6 days</p>
            <p className="mt-4 text-slate-700 dark:text-slate-300">Maintain this streak by completing today's lessons and quiz.</p>
          </div>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-slate-300 bg-gradient-to-br from-green-100 to-green-50 p-5 dark:border-slate-600 dark:from-slate-700 dark:to-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-400">Weekly achievements</p>
              <p className="mt-2 text-slate-900 dark:text-slate-100">3 lessons completed, 1 quiz passed, 2 study tasks finished.</p>
            </div>
            <div className="rounded-3xl border border-slate-300 bg-gradient-to-br from-purple-100 to-purple-50 p-5 dark:border-slate-600 dark:from-slate-700 dark:to-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-400">Next milestone</p>
              <p className="mt-2 text-slate-900 dark:text-slate-100">Complete the AI roadmap checkpoint by Friday.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

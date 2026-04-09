import ProgressBar from '../components/ProgressBar';

const updates = [
  { label: 'Overall progress', value: 68 },
  { label: 'Tasks completed', value: 54 },
  { label: 'Learning consistency', value: 80 },
];

export default function RoadmapUpdatePage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-3">
        {updates.map((item) => (
          <div key={item.label} className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-purple-100 to-purple-50 p-6 shadow-md dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{item.label}</h3>
            <p className="mt-2 text-slate-700 dark:text-slate-300">A snapshot of how your roadmap adapts as you complete tasks and quizzes.</p>
            <div className="mt-6">
              <ProgressBar label={item.label} value={item.value} />
            </div>
          </div>
        ))}
      </section>
      <section className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Dynamic roadmap update</h2>
        <p className="mt-3 text-slate-700 dark:text-slate-300">The platform adjusts the next milestones based on your performance and availability.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-300 bg-gradient-to-br from-teal-100 to-teal-50 p-5 dark:border-slate-600 dark:from-slate-700 dark:to-slate-700">
            <p className="text-sm text-slate-700 dark:text-slate-400">Next focus area</p>
            <p className="mt-2 text-slate-900 dark:text-slate-100">Advanced DBMS queries and optimization</p>
          </div>
          <div className="rounded-3xl border border-slate-300 bg-gradient-to-br from-orange-100 to-orange-50 p-5 dark:border-slate-600 dark:from-slate-700 dark:to-slate-700">
            <p className="text-sm text-slate-700 dark:text-slate-400">Recommended pace</p>
            <p className="mt-2 text-slate-900 dark:text-slate-100">4 hours per week with daily mini-sessions</p>
          </div>
        </div>
      </section>
    </div>
  );
}

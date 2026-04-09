import { Link } from 'react-router-dom';
import Card from '../components/Card';

const subjects = [
  { title: 'DBMS', note: 'Structured query language, normalization, indexing.', color: 'from-blue-100 to-cyan-100 dark:from-slate-700 dark:to-slate-700' },
  { title: 'OS', note: 'Scheduling, memory allocation, concurrency models.', color: 'from-green-100 to-emerald-100 dark:from-slate-700 dark:to-slate-700' },
  { title: 'CN', note: 'Network topologies, protocols, security basics.', color: 'from-purple-100 to-pink-100 dark:from-slate-700 dark:to-slate-700' },
  { title: 'SE', note: 'Requirements, architecture, testing, agile.', color: 'from-orange-100 to-yellow-100 dark:from-slate-700 dark:to-slate-700' },
];

export default function FundamentalsPage() {
  return (
    <div className="space-y-8">
      <Card title="Core subjects" description="Select the foundational subject you want to deepen next.">
        <div className="grid gap-5 sm:grid-cols-2">
          {subjects.map((item) => (
            <Link key={item.title} to={`/topics?subject=${item.title}`}>
              <div className={`rounded-[2rem] border border-slate-300 bg-gradient-to-br ${item.color} p-6 shadow-md shadow-slate-200/50 hover:shadow-lg dark:border-slate-600 dark:shadow-slate-950/50 dark:hover:shadow-slate-900/50`}>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{item.title}</h3>
                <p className="mt-3 text-slate-700 dark:text-slate-300">{item.note}</p>
                <div className="mt-5 inline-flex items-center rounded-full bg-slate-300/50 px-4 py-2 text-sm font-medium text-slate-800 dark:bg-slate-600/50 dark:text-slate-200">View lessons</div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

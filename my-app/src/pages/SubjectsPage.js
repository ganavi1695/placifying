import Card from '../components/Card';

const subjects = [
  { title: 'DBMS', note: 'Structured query language, normalization, indexing.' },
  { title: 'OS', note: 'Scheduling, memory allocation, concurrency models.' },
  { title: 'CN', note: 'Network topologies, protocols, security basics.' },
  { title: 'SE', note: 'Requirements, architecture, testing, agile.' },
];

export default function SubjectsPage() {
  return (
    <div className="space-y-8">
      <Card title="Core subjects" description="Select the foundational subject you want to deepen next.">
        <div className="grid gap-5 sm:grid-cols-2">
          {subjects.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 hover:border-cyan-500/40 hover:bg-slate-900/95">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-slate-400">{item.note}</p>
              <div className="mt-5 inline-flex items-center rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">View lessons</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function Card({ title, description, children, accent }) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50 ${accent || ''}`}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
      </div>
      <p className="mb-6 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      {children}
    </div>
  );
}

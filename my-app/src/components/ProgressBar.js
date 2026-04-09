export default function ProgressBar({ label, value }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-medium text-slate-800 dark:text-slate-200">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

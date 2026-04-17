import { useEffect, useState } from "react";

export default function ProgressBar({ label, value }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 200); // delay for smooth animation

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-slate-500 dark:text-slate-400">{value}%</span>
      </div>

      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
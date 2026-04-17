import { useEffect, useState } from "react";

export default function StreakCalendar() {
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    const weeklyData = JSON.parse(localStorage.getItem("weeklyProgress") || "{}");
    const currentDay = parseInt(localStorage.getItem("currentDay") || "1");

    // 🧠 Get current week start (Mon–Sun)
    const weekStart = currentDay - ((currentDay - 1) % 7);

    const temp = [];

    for (let i = 0; i < 7; i++) {
      const day = weekStart + i;
      temp.push(weeklyData[day] || 0);
    }

    setWeekData(temp);
  }, []);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getColor = (value) => {
    if (value === 0) return "bg-slate-700";
    if (value === 1) return "bg-cyan-500";
    if (value === 2) return "bg-blue-500";
    if (value === 3) return "bg-indigo-500";
    return "bg-purple-600";
  };

  return (
    <div className="space-y-3">

      {/* Labels */}
      <div className="grid grid-cols-7 text-xs text-slate-400">
        {days.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* Heatmap */}
      <div className="grid grid-cols-7 gap-2">
        {weekData.map((value, i) => (
          <div
            key={i}
            className={`h-10 rounded-lg ${getColor(value)} transition-all duration-500 hover:scale-110`}
            title={`${value} tasks completed`}
          />
        ))}
      </div>

    </div>
  );
}
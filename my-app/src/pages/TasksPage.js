import { useEffect, useState } from "react";

export default function TasksPage() {
  const [currentDay, setCurrentDay] = useState(1);
  const [roadmapPlan, setRoadmapPlan] = useState([]);
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    setCurrentDay(parseInt(sessionStorage.getItem("currentDay") || "1"));
    setRoadmapPlan(JSON.parse(sessionStorage.getItem("roadmapPlan") || "[]"));
    setCompletedTasks(JSON.parse(sessionStorage.getItem("completedTasks") || "{}"));
  }, []);

  const tasks = roadmapPlan[currentDay - 1] || [];

  const toggleTask = (task) => {
    const dayTasks = completedTasks[currentDay] || [];

    let updated;

    if (dayTasks.includes(task)) {
      updated = dayTasks.filter(t => t !== task);
    } else {
      updated = [...dayTasks, task];
    }

    const newData = {
      ...completedTasks,
      [currentDay]: updated
    };

    setCompletedTasks(newData);
    sessionStorage.setItem("completedTasks", JSON.stringify(newData));
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold">
        Tasks for Day {currentDay}
      </h2>

      <div className="grid gap-3 mt-4">
        {tasks.map((task, i) => {
          const isDone = completedTasks[currentDay]?.includes(task);

          return (
            <div
              key={i}
              onClick={() => toggleTask(task)}
              className={`p-4 rounded-xl cursor-pointer ${
                isDone
                  ? "bg-green-900 border-green-500"
                  : "bg-slate-800 border-slate-700"
              }`}
            >
              {isDone ? "✅" : "⬜"} {task}
            </div>
          );
        })}
      </div>
    </div>
  );
}
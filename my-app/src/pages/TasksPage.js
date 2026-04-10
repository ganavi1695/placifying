import { useState, useEffect } from 'react';
import Button from '../components/Button';

export default function TasksPage() {

  const currentDay = parseInt(localStorage.getItem("currentDay") || "1");

  const roadmapPlan = JSON.parse(localStorage.getItem("roadmapPlan") || "[]");

  const getTasksForDay = () => {
    const carry = JSON.parse(localStorage.getItem("carryForward") || "[]");

    return [...new Set([
      ...carry,
      ...(roadmapPlan[currentDay - 1] || [])
    ])];
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const todayTasks = getTasksForDay().map((task, i) => ({
      id: i + 1,
      label: task,
      done: false
    }));
    setTasks(todayTasks);
  }, [currentDay]);

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const handleSaveProgress = () => {
    const remaining = tasks
      .filter(task => !task.done)
      .map(task => task.label);

    localStorage.setItem("carryForward", JSON.stringify(remaining));
    localStorage.setItem("currentDay", currentDay + 1);

    const completedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");

    if (!completedDays.includes(currentDay)) {
      completedDays.push(currentDay);
    }

    localStorage.setItem("completedDays", JSON.stringify(completedDays));

    alert("Progress saved!");
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 
      dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">

        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
          📅 Day {currentDay} Tasks
        </h2>

        <div className="mt-8 space-y-4">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex w-full justify-between items-center rounded-3xl border px-5 py-4 text-left transition font-medium ${
                task.done
                  ? 'border-teal-300 bg-teal-100 text-teal-900 dark:border-teal-400 dark:bg-slate-700 dark:text-teal-200'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-teal-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-400'
              }`}
            >
              <span>{task.label}</span>
              <span className="text-sm">
                {task.done ? "✓ Done" : "Pending"}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <Button onClick={handleSaveProgress} className="w-full">
            Save Progress & Continue →
          </Button>
        </div>

      </div>
    </div>
  );
}
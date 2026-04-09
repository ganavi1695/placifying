import { useState } from 'react';
import Button from '../components/Button';

const initialTasks = [
  { id: 1, label: 'Review DBMS notes', done: true },
  { id: 2, label: 'Practice OS scheduling problems', done: false },
  { id: 3, label: 'Read CN packet flow', done: false },
  { id: 4, label: 'Sketch software architecture diagram', done: false },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskLabel, setNewTaskLabel] = useState('');
  const [taskError, setTaskError] = useState('');

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const handleAddTask = () => {
    if (!newTaskLabel.trim()) {
      setTaskError('Task label cannot be empty');
      return;
    }
    const newTask = {
      id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
      label: newTaskLabel.trim(),
      done: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskLabel('');
    setTaskError('');
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Daily learning tasks</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Check off your study items and keep your schedule on track.</p>
        <div className="mt-8 space-y-4">
          {tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => toggleTask(task.id)}
              className={`flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-left transition font-medium ${
                task.done ? 'border-teal-300 bg-teal-100 text-teal-900 dark:border-teal-400 dark:bg-slate-700 dark:text-teal-200' : 'border-slate-300 bg-white text-slate-700 hover:border-teal-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-400'
              }`}
            >
              <span>{task.label}</span>
              <span className="text-sm">{task.done ? '✓ Done' : 'Pending'}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">New task</label>
          <div className="mt-3 flex gap-3">
            <input
              value={newTaskLabel}
              onChange={(e) => setNewTaskLabel(e.target.value)}
              placeholder="Add a new study task"
              className="flex-1 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-teal-400"
            />
            <Button onClick={handleAddTask} className="rounded-3xl px-6">Add</Button>
          </div>
          {taskError && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{taskError}</p>}
        </div>
      </div>
    </div>
  );
}

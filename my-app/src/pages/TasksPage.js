import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [tasksCopied, setTasksCopied] = useState(false);
  const [carriedOverTasks, setCarriedOverTasks] = useState([]);
  const currentDay = parseInt(localStorage.getItem("currentDay") || "1");
  const roadmapPlan = JSON.parse(localStorage.getItem("roadmapPlan") || "[]");

  // Load tasks only once when component mounts or currentDay changes
  useEffect(() => {
    if (!tasksCopied) {
      const carry = JSON.parse(localStorage.getItem("carryForward") || "[]");
      
      // Flatten roadmapPlan from phases to daily tasks
      const allDailyTasks = roadmapPlan.flat();
      
      // Get 4 tasks for today
      const tasksPerDay = 4;
      const startIdx = (currentDay - 1) * tasksPerDay;
      const todayTasks = allDailyTasks.slice(startIdx, startIdx + tasksPerDay);
      
      // Combine carried over tasks + today's 4 tasks
      const taskList = [];
      
      // Add carried over tasks first
      if (carry.length > 0) {
        setCarriedOverTasks(carry);
        carry.forEach((task, i) => {
          taskList.push({
            id: i + 1,
            label: task,
            done: false,
            isCarriedOver: true
          });
        });
      }
      
      // Add today's 4 new tasks
      todayTasks.forEach((task, idx) => {
        taskList.push({
          id: (carry.length || 0) + idx + 1,
          label: task,
          done: false,
          isCarriedOver: false
        });
      });
      
      setTasks(taskList);
      setTasksCopied(true);
    }
  }, [currentDay, tasksCopied]);

  const toggleTask = (id) => {
    console.log('Toggling task ID:', id);
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        console.log('Found task! Changing done from', task.done, 'to', !task.done);
        return { ...task, done: !task.done };
      }
      return task;
    });
    console.log('Updated tasks:', updatedTasks);
    setTasks(updatedTasks);
  };

  const handleSaveProgress = () => {
    const completed = tasks.filter(task => task.done).length;
    const remaining = tasks
      .filter(task => !task.done)
      .map(task => task.label);

    console.log('Saving progress - Completed:', completed, 'Remaining:', remaining);

    localStorage.setItem("carryForward", JSON.stringify(remaining));
    localStorage.setItem("currentDay", currentDay + 1);

    const completedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");

    if (!completedDays.includes(currentDay)) {
      completedDays.push(currentDay);
    }

    localStorage.setItem("completedDays", JSON.stringify(completedDays));

    const message = remaining.length > 0 
      ? `✓ Day ${currentDay} saved! ${completed}/${tasks.length} completed. ${remaining.length} task(s) carried to tomorrow.`
      : `✓ Day ${currentDay} complete! All tasks done today! 🎉`;
    
    alert(message);
    
    // Navigate to tasks page for the next day (will refresh automatically)
    setTasksCopied(false);
    navigate('/tasks'); 

    localStorage.setItem("lastCompletedCount", completed);
    localStorage.setItem("lastTotalTasks", tasks.length);

    // 🧠 XP Calculation
    const prevXP = parseInt(localStorage.getItem("xp") || "0");

    // XP from tasks
    const taskXP = completed * 10;

    // Bonus if all tasks completed
    const bonusXP = remaining.length === 0 ? 20 : 0;

    const totalXP = prevXP + taskXP + bonusXP;

    localStorage.setItem("xp", totalXP);

    // 📊 Store day-wise task completion
const weeklyData = JSON.parse(localStorage.getItem("weeklyProgress") || "{}");

// currentDay = already available
weeklyData[currentDay] = completed;

localStorage.setItem("weeklyProgress", JSON.stringify(weeklyData));
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
          📅 Day {currentDay} Tasks
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">4 tasks per day - Click on a task to mark it as complete ✓</p>
        
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 bg-slate-200 rounded-full h-2 dark:bg-slate-700">
            <div 
              className="bg-teal-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.done).length / tasks.length) * 100 : 0}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {tasks.filter(t => t.done).length}/{tasks.length} done
          </span>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
        
        {/* Warning Banner for Incomplete Carried Over Tasks */}
        {(() => {
          const incompleteCarriedOver = tasks.filter(t => t.isCarriedOver && !t.done);
          return incompleteCarriedOver.length > 0 && (
            <div className="mb-6 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-slate-700 dark:border-amber-400">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <span>⚠️ Timeline Alert</span>
              </p>
              <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
                You have <strong>{incompleteCarriedOver.length} incomplete task(s) from yesterday</strong>. 
                Each incomplete task will be carried forward and <strong>extend your course timeline</strong> by 1 day.
              </p>
            </div>
          );
        })()}

        <div className="mt-8 space-y-6">
          {/* Carried Over Tasks Section */}
          {(() => {
            const incompleteCarriedOver = tasks.filter(t => t.isCarriedOver && !t.done);
            return incompleteCarriedOver.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-2">
                  <span>🔄</span> Incomplete from Yesterday ({incompleteCarriedOver.length})
                </h3>
                <div className="space-y-3">
                  {tasks
                    .filter(task => task.isCarriedOver && !task.done)
                    .map((task) => (
                    <button
                      key={`task-${task.id}`}
                      type="button"
                      onClick={() => {
                        console.log('Task clicked:', task.id, 'Current done state:', task.done);
                        toggleTask(task.id);
                      }}
                      className={`w-full flex items-center gap-4 rounded-3xl border-2 px-5 py-4 text-left transition cursor-pointer active:scale-95 ${
                        task.done 
                          ? 'border-teal-400 bg-teal-100 dark:border-teal-400 dark:bg-slate-700' 
                          : 'border-amber-300 bg-amber-50 hover:border-amber-400 hover:bg-amber-100 dark:border-amber-700 dark:bg-slate-700 dark:hover:border-amber-600'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 flex-shrink-0 transition pointer-events-none ${
                        task.done 
                          ? 'border-teal-500 bg-teal-500' 
                          : 'border-amber-400 bg-white dark:border-amber-500 dark:bg-slate-700'
                      }`}>
                        {task.done && <span className="text-white font-bold text-sm">✓</span>}
                      </div>
                      
                      {/* Task Label */}
                      <span className={`flex-1 font-medium transition ${
                        task.done 
                          ? 'line-through text-teal-700 dark:text-teal-300' 
                          : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        {task.label}
                      </span>
                      
                      {/* Priority Badge */}
                      <span className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 pointer-events-none bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                        Priority
                      </span>
                      
                      {/* Status Badge */}
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 pointer-events-none ${
                        task.done 
                          ? 'bg-teal-500 text-white' 
                          : 'bg-amber-300 text-amber-900 dark:bg-amber-700 dark:text-amber-100'
                      }`}>
                        {task.done ? '✓ Complete' : 'Todo'}
                      </span>
                    </button>
                  ))
                }
              </div>
              </div>
            );
          })()}

          {/* Today's Tasks Section */}
          {tasks.filter(t => !t.isCarriedOver).length > 0 && (
            <div>
              {(() => {
                const incompleteCarriedOver = tasks.filter(t => t.isCarriedOver && !t.done);
                return incompleteCarriedOver.length > 0 && (
                  <h3 className="mb-3 text-sm font-semibold text-teal-700 dark:text-teal-300 flex items-center gap-2">
                    <span>✨</span> Today's Tasks ({tasks.filter(t => !t.isCarriedOver).length})
                  </h3>
                );
              })()}
              <div className="space-y-3">
                {tasks
                  .filter(task => !task.isCarriedOver)
                  .map((task) => (
                    <button
                      key={`task-${task.id}`}
                      type="button"
                      onClick={() => {
                        console.log('Task clicked:', task.id, 'Current done state:', task.done);
                        toggleTask(task.id);
                      }}
                      className={`w-full flex items-center gap-4 rounded-3xl border-2 px-5 py-4 text-left transition cursor-pointer active:scale-95 ${
                        task.done 
                          ? 'border-teal-400 bg-teal-100 dark:border-teal-400 dark:bg-slate-700' 
                          : 'border-slate-300 bg-white hover:border-teal-300 hover:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-teal-400 dark:hover:bg-slate-700'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 flex-shrink-0 transition pointer-events-none ${
                        task.done 
                          ? 'border-teal-500 bg-teal-500' 
                          : 'border-slate-400 bg-white dark:border-slate-500 dark:bg-slate-700'
                      }`}>
                        {task.done && <span className="text-white font-bold text-sm">✓</span>}
                      </div>
                      
                      {/* Task Label */}
                      <span className={`flex-1 font-medium transition ${
                        task.done 
                          ? 'line-through text-teal-700 dark:text-teal-300' 
                          : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        {task.label}
                      </span>
                      
                      {/* Status Badge */}
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 pointer-events-none ${
                        task.done 
                          ? 'bg-teal-500 text-white' 
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-300'
                      }`}>
                        {task.done ? '✓ Complete' : 'Todo'}
                      </span>
                    </button>
                  ))
                }
              </div>
            </div>
          )}
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
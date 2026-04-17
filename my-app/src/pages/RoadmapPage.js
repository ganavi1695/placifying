import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';

export default function RoadmapPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [roadmapPlan, setRoadmapPlan] = useState([]);
  const [domain, setDomain] = useState('');
  const [timeline, setTimeline] = useState('');

  useEffect(() => {
    // Get roadmap from localStorage (generated in QuizPage based on profile timeline)
    const plan = JSON.parse(localStorage.getItem('roadmapPlan') || '[]');
    const selectedDomain = localStorage.getItem('selectedDomain') || name || 'web-development';
    const savedTimeline = localStorage.getItem('timeline') || '3 months';

    setRoadmapPlan(plan);
    setDomain(selectedDomain);
    setTimeline(savedTimeline);
  }, [name]);

  const handleStartLearning = () => {
    navigate('/tasks');
  };

  const getDomainTitle = () => {
    if (!domain) return 'Learning';
    return domain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const completedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");

// total days = total tasks / 4 tasks per day
// total days = total tasks / 4 tasks per day
const totalTasks = roadmapPlan.flat().length;
const totalDays = Math.ceil(totalTasks / 4);

const completedCount = completedDays.length;
const remainingDays = Math.max(totalDays - completedCount, 0);

// ✅ FIXED PROGRESS (BASED ON DAYS)
const completionPercentage =
  totalDays > 0
    ? Math.min(100, Math.round((completedCount / totalDays) * 100))
    : 0;



    const getPhaseProgress = (phaseIndex, phaseTasks) => {
  const completedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");

  const tasksPerDay = 4;

  // Calculate starting day for this phase
  let tasksBefore = 0;

  for (let i = 0; i < phaseIndex; i++) {
    tasksBefore += roadmapPlan[i].length;
  }

  const phaseStartDay = Math.floor(tasksBefore / tasksPerDay) + 1;
  const phaseTotalDays = Math.ceil(phaseTasks.length / tasksPerDay);

  let completedInPhase = 0;

  completedDays.forEach((day) => {
    if (day >= phaseStartDay && day < phaseStartDay + phaseTotalDays) {
      completedInPhase++;
    }
  });

  return Math.min(
    100,
    Math.round((completedInPhase / phaseTotalDays) * 100)
  );
};

const getCurrentPhaseIndex = () => {
  const completedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");
  const tasksPerDay = 4;

  let tasksCovered = completedDays.length * tasksPerDay;

  let cumulativeTasks = 0;

  for (let i = 0; i < roadmapPlan.length; i++) {
    cumulativeTasks += roadmapPlan[i].length;

    if (tasksCovered < cumulativeTasks) {
      return i; // current phase
    }
  }

  return roadmapPlan.length - 1;
}; 

const currentPhaseIndex = getCurrentPhaseIndex();

const isPhaseCompleted = (phaseIndex, phaseTasks) => {
  const completedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");
  const tasksPerDay = 4;

  // Calculate tasks before this phase
  let tasksBefore = 0;
  for (let i = 0; i < phaseIndex; i++) {
    tasksBefore += roadmapPlan[i].length;
  }

  const phaseStartDay = Math.floor(tasksBefore / tasksPerDay) + 1;
  const phaseTotalDays = Math.ceil(phaseTasks.length / tasksPerDay);

  let completedInPhase = 0;

  completedDays.forEach((day) => {
    if (day >= phaseStartDay && day < phaseStartDay + phaseTotalDays) {
      completedInPhase++;
    }
  });

  return completedInPhase >= phaseTotalDays;
};
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
          {getDomainTitle()} Roadmap
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
          Your personalized {timeline} learning path with {roadmapPlan.length} phases
        </p>
        
        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall Progress</p>
            <ProgressBar label="Roadmap" value={completionPercentage} />
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-teal-100 to-teal-50 p-5 dark:from-slate-700 dark:to-slate-700">
            <p className="text-sm text-slate-700 dark:text-slate-300">Your Timeline</p>
            <p className="mt-2 text-2xl font-bold text-teal-900 dark:text-teal-200">{timeline}</p>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-orange-100 to-orange-50 p-5 dark:from-slate-700 dark:to-slate-700">
  <p className="text-sm text-slate-700 dark:text-slate-300">Days Remaining</p>
  <p className="mt-2 text-2xl font-bold text-orange-900 dark:text-orange-200">
    {remainingDays} / {totalDays} days
  </p>

  <p className="text-xs mt-1 text-slate-600 dark:text-slate-400">
    {completedCount} days completed
  </p>
</div>
      </div>

      {/* Roadmap Phases */}
      {roadmapPlan.length > 0 && (
        <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            📚 Learning Phases
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {roadmapPlan.length} phases to master {getDomainTitle().toLowerCase()}
          </p>

          <div className="mt-8 space-y-4">
            {roadmapPlan.map((phase, index) => (
              <div
                key={index}
                className={`rounded-3xl border p-6 transition ${
    isPhaseCompleted(index, phase)
      ? "border-green-400 bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-900/20 dark:to-green-900/10"
      : index === currentPhaseIndex
      ? "border-teal-400 bg-gradient-to-br from-teal-100 to-blue-50 dark:from-slate-700 dark:to-slate-700 shadow-lg scale-[1.02]"
      : "border-slate-300 bg-gradient-to-br from-blue-50 to-teal-50 dark:border-slate-600 dark:from-slate-700 dark:to-slate-700"
  }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">

                              <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                                Phase {index + 1}
                              </h3>

                              {/* ✅ Completed */}
                              {isPhaseCompleted(index, phase) && (
                                <span className="text-xs px-3 py-1 rounded-full bg-green-500 text-white font-medium">
                                  ✓ Completed
                                </span>
                              )}

                              {/* 📍 Current */}
                              {!isPhaseCompleted(index, phase) && index === currentPhaseIndex && (
                                <span className="text-xs px-3 py-1 rounded-full bg-teal-500 text-white font-medium">
                                  You are here 📍
                                </span>
                              )}

                            </div>
                        <div className="mt-3">
                      <ProgressBar
                        label={`Progress`}
                        value={getPhaseProgress(index, phase)}
                      />
                    </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {phase.length} tasks to complete
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {phase.slice(0, 4).map((task, taskIdx) => (
                          <div
                            key={taskIdx}
                            className="rounded-2xl bg-white px-3 py-2 text-sm text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-300"
                          >
                            ✓ {task}
                          </div>
                        ))}
                      </div>
                      {phase.length > 4 && (
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                          + {phase.length - 4} more tasks in this phase
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Start Learning Button */}
      <div className="flex justify-center">
        <Button onClick={handleStartLearning} className="px-8 py-4 text-lg">
          Start Learning Journey 🚀
        </Button>
      </div>
    </div>
  );
}
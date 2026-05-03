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
    const rawPlan = localStorage.getItem('roadmapPlan');
    const selectedDomain = localStorage.getItem('selectedDomain') || name || 'blockchain';
    const savedTimeline = localStorage.getItem('timeline') || '3 months';

    if (rawPlan) {
      try {
        const parsedPlan = JSON.parse(rawPlan);
        // Only set the state if we actually have an array
        if (Array.isArray(parsedPlan)) {
          setRoadmapPlan(parsedPlan);
        }
      } catch (e) {
        console.error("Local storage parsing error", e);
      }
    }
    setDomain(selectedDomain);
    setTimeline(savedTimeline);
  }, [name]);

  const handleStartLearning = () => navigate('/tasks');

  const getDomainTitle = () => domain.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const completedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");
  
  // Safety check for .flat()
  const totalTasks = Array.isArray(roadmapPlan) ? roadmapPlan.flat().length : 0;
  const totalDays = Math.ceil(totalTasks / 4);
  const completedCount = completedDays.length;
  const remainingDays = Math.max(totalDays - completedCount, 0);

  const completionPercentage = totalDays > 0 ? Math.min(100, Math.round((completedCount / totalDays) * 100)) : 0;

  const getPhaseProgress = (phaseIndex, phaseTasks) => {
    const tasksPerDay = 4;
    let tasksBefore = 0;
    for (let i = 0; i < phaseIndex; i++) {
        if (roadmapPlan[i]) tasksBefore += roadmapPlan[i].length;
    }

    const phaseStartDay = Math.floor(tasksBefore / tasksPerDay) + 1;
    const phaseTotalDays = Math.ceil(phaseTasks.length / tasksPerDay);
    let completedInPhase = completedDays.filter(day => day >= phaseStartDay && day < phaseStartDay + phaseTotalDays).length;

    return Math.min(100, Math.round((completedInPhase / phaseTotalDays) * 100));
  };

  const getCurrentPhaseIndex = () => {
    const tasksPerDay = 4;
    let tasksCovered = completedDays.length * tasksPerDay;
    let cumulativeTasks = 0;
    for (let i = 0; i < roadmapPlan.length; i++) {
      cumulativeTasks += roadmapPlan[i].length;
      if (tasksCovered < cumulativeTasks) return i;
    }
    return Math.max(0, roadmapPlan.length - 1);
  };

  const currentPhaseIndex = getCurrentPhaseIndex();

  const isPhaseCompleted = (phaseIndex, phaseTasks) => {
    return getPhaseProgress(phaseIndex, phaseTasks) === 100;
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg dark:border-slate-600 dark:from-slate-800 dark:to-slate-800">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{getDomainTitle()} Roadmap</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
            Your personalized {timeline} learning path with {roadmapPlan.length} phases
        </p>
        
        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall Progress</p>
            <ProgressBar label="Roadmap" value={completionPercentage} />
          </div>
          <div className="rounded-3xl bg-teal-100 p-5 dark:bg-slate-700">
            <p className="text-sm text-slate-700 dark:text-slate-300">Your Timeline</p>
            <p className="mt-2 text-2xl font-bold text-teal-900 dark:text-teal-200">{timeline}</p>
          </div>
          <div className="rounded-3xl bg-orange-100 p-5 dark:bg-slate-700">
            <p className="text-sm text-slate-700 dark:text-slate-300">Days Remaining</p>
            <p className="mt-2 text-2xl font-bold text-orange-900 dark:text-orange-200">{remainingDays} / {totalDays} days</p>
          </div>
        </div>
      </div>

      {/* Learning Phases Section */}
      <div className="rounded-[2rem] border border-slate-300 bg-white p-8 shadow-lg dark:border-slate-600 dark:bg-slate-800">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">📚 Learning Phases</h2>
        
        {roadmapPlan.length === 0 ? (
            <div className="text-center py-10 text-slate-500">No phases generated. Complete the quiz to build your roadmap!</div>
        ) : (
            <div className="space-y-6">
            {roadmapPlan.map((phase, index) => (
                <div key={index} className={`rounded-3xl border p-6 transition-all ${
                    isPhaseCompleted(index, phase) 
                    ? 'bg-green-50 border-green-200' 
                    : index === currentPhaseIndex 
                    ? 'border-teal-400 bg-blue-50/50 shadow-md scale-[1.01]' 
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}>
                <div className="flex items-center gap-4 mb-4">
                    <span className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-500 text-white font-bold">{index + 1}</span>
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-slate-900 dark:text-white">Phase {index + 1}</h3>
                            {index === currentPhaseIndex && <span className="text-xs bg-teal-500 text-white px-2 py-0.5 rounded-full">Current 📍</span>}
                            {isPhaseCompleted(index, phase) && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Completed ✓</span>}
                        </div>
                        <ProgressBar label="Phase Progress" value={getPhaseProgress(index, phase)} />
                    </div>
                </div>
                {/* Task Grid - Showing first 4 tasks per phase */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {phase.slice(0, 4).map((task, tIdx) => (
                    <div key={tIdx} className="rounded-xl bg-white p-4 text-sm shadow-sm border border-slate-100 text-slate-700">
                        <span className="text-teal-600 font-bold mr-2">✓</span> {task}
                    </div>
                    ))}
                </div>
                {phase.length > 4 && <p className="mt-4 text-xs text-slate-500 italic">+ {phase.length - 4} more technical tasks in this phase</p>}
                </div>
            ))}
            </div>
        )}
      </div>

      <div className="flex justify-center pb-10">
        <Button onClick={handleStartLearning} className="px-10 py-4 text-xl shadow-xl hover:scale-105 transition-transform">Start Learning Journey 🚀</Button>
      </div>
    </div>
  );
}
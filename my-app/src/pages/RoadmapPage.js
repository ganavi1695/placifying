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

  const completionPercentage = Math.round((roadmapPlan.length > 0 ? Math.min(100, 10) : 0));

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
                className="rounded-3xl border border-slate-300 bg-gradient-to-br from-blue-50 to-teal-50 p-6 dark:border-slate-600 dark:from-slate-700 dark:to-slate-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                          Phase {index + 1}
                        </h3>
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
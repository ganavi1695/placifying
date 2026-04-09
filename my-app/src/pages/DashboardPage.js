import { Link } from 'react-router-dom';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';

const stats = [
  { label: 'Course completion', value: 72 },
  { label: 'Daily tasks', value: 85 },
  { label: 'Quiz accuracy', value: 68 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card title="Welcome back" description="Your personalized AI learning hub is ready. Continue where you left off or explore the latest guided paths.">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-3xl bg-gradient-to-br from-blue-100 to-blue-50 p-5 text-slate-900 shadow-md dark:from-slate-700 dark:to-slate-700 dark:text-slate-50">
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-50">{item.value}%</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Next milestone" description="Stay on track by completing your upcoming task and reviewing the AI roadmap recommendations.">
          <div className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-purple-100 to-purple-50 p-5 shadow-md dark:from-slate-700 dark:to-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-300">Recommended focus</p>
              <h4 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-50">Deepen fundamentals in DBMS and networking</h4>
            </div>
            <div className="pt-2">
              <Link to="/roadmap">
                <Button className="w-full">View roadmap</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Fundamentals" description="Strengthen your core subjects with guided lessons, quizzes, and certificate suggestions.">
          <Link to="/fundamentals">
            <Button variant="secondary">Go to fundamentals</Button>
          </Link>
        </Card>
        <Card title="Role paths" description="Select a domain and explore tailored learning paths for Web, AI, Cloud, and more.">
          <Link to="/domains">
            <Button variant="secondary">Choose a domain</Button>
          </Link>
        </Card>
        <Card title="Daily study" description="Track tasks, build momentum, and keep your streak alive with daily learning goals.">
          <Link to="/tasks">
            <Button variant="secondary">Open tasks</Button>
          </Link>
        </Card>
      </div>
      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Weekly progress" description="A quick overview of your study commitments and progress across the platform.">
          <div className="space-y-4">
            {stats.map((item) => (
              <ProgressBar key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </Card>
        <Card title="Growth streak" description="Track your momentum and keep the learning streak alive with daily consistency.">
          <div className="rounded-3xl bg-gradient-to-br from-orange-100 to-orange-50 p-6 text-slate-900 shadow-md dark:from-slate-700 dark:to-slate-700 dark:text-slate-50">
            <p className="text-sm text-slate-600 dark:text-slate-300">Current streak</p>
            <p className="mt-3 text-4xl font-semibold text-slate-900 dark:text-slate-50">6 days</p>
            <p className="mt-4 text-slate-700 dark:text-slate-300">Complete today's module to reach 7 consecutive days of learning momentum.</p>
          </div>
        </Card>
      </section>
    </div>
  );
}

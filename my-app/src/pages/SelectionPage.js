import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function SelectionPage({ setIsPathSelected }) {
  const navigate = useNavigate();

  const handleSelect = (pathType) => {
    setIsPathSelected(true);
    localStorage.setItem('selectedPath', pathType);
    if (pathType === 'fundamentals') {
      navigate(`/quiz?path=fundamentals`);
    } else {
      // Clear previous domain selection for fresh choice
      localStorage.removeItem('selectedDomain');
      navigate('/domains');
    }
  };

  return (
    <div className="space-y-8">
      <Card title="Choose your learning path" description="Select whether to start with core fundamentals or explore role-specific domains tailored to your career goals.">
        <div className="grid gap-6 sm:grid-cols-2">
          <button onClick={() => handleSelect('fundamentals')} className="text-left">
            <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-blue-100 to-blue-50 p-6 shadow-md hover:shadow-lg transition dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Fundamentals</h3>
              <p className="mt-3 text-slate-700 dark:text-slate-300">Build strong foundations in DBMS, OS, Networks, and Software Engineering.</p>
              <div className="mt-5">
                <Button variant="secondary">Start fundamentals</Button>
              </div>
            </div>
          </button>
          <button onClick={() => handleSelect('domains')} className="text-left">
            <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-green-100 to-green-50 p-6 shadow-md hover:shadow-lg transition dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Role-Specific</h3>
              <p className="mt-3 text-slate-700 dark:text-slate-300">Dive into AI, Web Dev, Cloud, or Cybersecurity with specialized learning paths.</p>
              <div className="mt-5">
                <Button variant="secondary">Explore domains</Button>
              </div>
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
}
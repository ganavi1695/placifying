import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const domains = [
  { title: 'AI & ML', description: 'Machine learning models and intelligent systems.' },
  { title: 'Web Development', description: 'Frontend, backend, and full-stack apps.' },
  { title: 'Cloud & DevOps', description: 'Cloud automation and CI/CD pipelines.' },
  { title: 'Cybersecurity', description: 'Security systems and ethical hacking.' },

  // Extra domains
  { title: 'Data Science', description: 'Data analysis and visualization.' },
  { title: 'Mobile Development', description: 'Android and iOS app development.' },
  { title: 'Blockchain', description: 'Decentralized apps and smart contracts.' },
  { title: 'UI UX Design', description: 'User interface and experience design.' },
  { title: 'Big Data', description: 'Large-scale data processing.' },
  { title: 'Networking', description: 'Computer networks and protocols.' }
];

export default function DomainsPage() {
  const navigate = useNavigate();

  const [selectedDomain, setSelectedDomain] = useState(null);
  const [showDomains, setShowDomains] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("selectedDomain");
    if (stored) {
      setSelectedDomain(stored);
      setShowDomains(false);
    }
  }, []);

  const formatUrl = (title) =>
    title.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');

  const resetRoadmap = () => {
    localStorage.setItem("journeyStarted", "false");
    localStorage.setItem("learningStarted", "false");
    localStorage.setItem("currentDay", "1");
    localStorage.setItem("completedDays", "[]");
    localStorage.setItem("carryForward", "[]");
    localStorage.removeItem("roadmapPlan");
  };

  return (
    <div className="space-y-8">
      <Card title="Domain selection">

        {/* Already selected */}
        {!showDomains && selectedDomain && (
          <div className="text-center space-y-5 mb-6">
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              You already selected a domain
            </p>

            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate(`/roadmap/${selectedDomain}`)}>
                Continue
              </Button>

              <Button variant="ghost" onClick={() => setShowDomains(true)}>
                Change Domain
              </Button>
            </div>
          </div>
        )}

        {/* Domain list */}
        {showDomains && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain) => {
              const url = formatUrl(domain.title);

              return (
                <div
                  key={domain.title}
                  className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-green-100 to-emerald-100 p-6 shadow-md hover:shadow-lg cursor-pointer transition
                  dark:border-slate-600 dark:from-slate-700 dark:to-slate-700"
                  onClick={() => {
                    localStorage.setItem("selectedDomain", url);
                    resetRoadmap();
                    navigate(`/roadmap/${url}`);
                  }}
                >
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {domain.title}
                  </h3>

                  <p className="mt-3 text-slate-700 dark:text-slate-300">
                    {domain.description}
                  </p>

                  <div className="mt-5 inline-flex items-center rounded-full bg-slate-300/50 px-4 py-2 text-sm font-medium text-slate-800 
                  dark:bg-slate-600/50 dark:text-slate-200">
                    Select path
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </Card>
    </div>
  );
}
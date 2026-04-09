import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const domains = [
  { title: 'AI & ML', description: 'Machine learning models, data pipelines and intelligent systems.' },
  { title: 'Web Development', description: 'Frontend, backend, and full-stack app delivery.' },
  { title: 'Cloud & DevOps', description: 'Cloud services automation, CI/CD, and infrastructure as code.' },
  { title: 'Cybersecurity', description: 'Secure design, risk management, and defensive tools.' },
  { title: 'Data Science', description: 'Data analysis, visualization, and statistical modeling.' },
  { title: 'Mobile Development', description: 'iOS and Android app development with cross-platform tools.' },
  { title: 'Blockchain', description: 'Decentralized systems, smart contracts, and crypto technologies.' },
  { title: 'IoT', description: 'Internet of Things, embedded systems, and sensor networks.' },
  { title: 'Game Development', description: 'Game engines, graphics, and interactive design.' },
  { title: 'AR/VR', description: 'Augmented and virtual reality applications and experiences.' },
  { title: 'Big Data', description: 'Large-scale data processing and analytics platforms.' },
  { title: 'Quantum Computing', description: 'Quantum algorithms and computational paradigms.' },
  { title: 'Robotics', description: 'Autonomous systems and robotic control.' },
  { title: 'Natural Language Processing', description: 'Text analysis, chatbots, and language understanding.' },
  { title: 'Computer Vision', description: 'Image processing and visual recognition systems.' },
  { title: 'Embedded Systems', description: 'Microcontrollers, firmware, and hardware-software integration.' },
  { title: 'Network Engineering', description: 'Network architecture, protocols, and infrastructure.' },
  { title: 'Database Administration', description: 'Database design, optimization, and management.' },
  { title: 'Software Testing', description: 'Quality assurance, automation, and testing frameworks.' },
  { title: 'UI/UX Design', description: 'User interface design, experience research, and prototyping.' },
];

export default function DomainsPage() {
  return (
    <div className="space-y-8">
      <Card title="Domain selection" description="Choose a specialization that best fits your goals and study rhythm. Not sure which one? Use the chatbot to get personalized recommendations.">
        <div className="mb-6">
          <Link to="/chatbot">
            <Button variant="ghost">Ask chatbot for domain recommendations</Button>
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => (
            <div key={domain.title} className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-green-100 to-emerald-100 p-6 shadow-md hover:shadow-lg dark:border-slate-600 dark:from-slate-700 dark:to-slate-700 dark:shadow-slate-950/50">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{domain.title}</h3>
              <p className="mt-3 text-slate-700 dark:text-slate-300">{domain.description}</p>
              <div className="mt-5 inline-flex items-center rounded-full bg-slate-300/50 px-4 py-2 text-sm font-medium text-slate-800 dark:bg-slate-600/50 dark:text-slate-200">Select path</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

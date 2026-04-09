import { useSearchParams } from 'react-router-dom';
import Card from '../components/Card';

const topicsData = {
  DBMS: [
    { topic: 'Relational algebra', progress: 62 },
    { topic: 'Normalization forms', progress: 47 },
    { topic: 'SQL queries', progress: 79 },
    { topic: 'Indexing and optimization', progress: 55 },
  ],
  OS: [
    { topic: 'Process scheduling', progress: 70 },
    { topic: 'Memory management', progress: 50 },
    { topic: 'Concurrency and synchronization', progress: 65 },
    { topic: 'File systems', progress: 40 },
  ],
  CN: [
    { topic: 'OSI vs TCP/IP', progress: 79 },
    { topic: 'Routing algorithms', progress: 60 },
    { topic: 'Network security', progress: 45 },
    { topic: 'Wireless networks', progress: 55 },
  ],
  SE: [
    { topic: 'Agile planning', progress: 55 },
    { topic: 'Requirements engineering', progress: 70 },
    { topic: 'Software testing', progress: 50 },
    { topic: 'Architecture design', progress: 60 },
  ],
};

const certificatesData = {
  DBMS: [
    { name: 'Oracle Database Administrator Certified Associate', description: 'Comprehensive database management and SQL expertise.' },
    { name: 'Microsoft Certified: Azure Database Administrator', description: 'Cloud database administration and optimization.' },
  ],
  OS: [
    { name: 'CompTIA Linux+', description: 'Linux system administration and troubleshooting.' },
    { name: 'Microsoft Certified: Windows Server Hybrid Administrator', description: 'Windows Server management and hybrid environments.' },
  ],
  CN: [
    { name: 'Cisco Certified Network Associate (CCNA)', description: 'Networking fundamentals and Cisco technologies.' },
    { name: 'CompTIA Network+', description: 'Network infrastructure and troubleshooting.' },
  ],
  SE: [
    { name: 'Project Management Professional (PMP)', description: 'Project management and leadership skills.' },
    { name: 'Certified ScrumMaster (CSM)', description: 'Agile and Scrum methodologies.' },
  ],
};

export default function TopicsPage() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get('subject') || 'DBMS';
  const topics = topicsData[subject] || [];
  const certificates = certificatesData[subject] || [];

  return (
    <div className="space-y-8">
      <Card title={`${subject} Topics`} description={`Recommended topics for ${subject} based on your progress and upcoming learning goals.`}>
        <div className="grid gap-4">
          {topics.map((item) => (
            <div key={item.topic} className="rounded-3xl border border-slate-300 bg-gradient-to-br from-blue-100 to-blue-50 p-5 shadow-md dark:border-slate-600 dark:from-slate-700 dark:to-slate-700 dark:shadow-slate-950/50">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{item.topic}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Recommended for next study session.</p>
                </div>
                <span className="rounded-full bg-teal-200 px-3 py-1 text-sm font-medium text-teal-800 dark:bg-slate-600 dark:text-teal-300">{item.progress}%</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-300 dark:bg-slate-600">
                <div className="h-full rounded-full bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400" style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Certificate path" description="Certificates matched to your selected topics and future career focus.">
        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map((cert) => (
            <div key={cert.name} className="rounded-3xl border border-slate-300 bg-gradient-to-br from-purple-100 to-pink-100 p-5 shadow-md dark:border-slate-600 dark:from-slate-700 dark:to-slate-700 dark:shadow-slate-950/50">
              <h4 className="font-semibold text-slate-900 dark:text-slate-50">{cert.name}</h4>
              <p className="mt-2 text-slate-700 dark:text-slate-300">{cert.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

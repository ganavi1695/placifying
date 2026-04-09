import Card from '../components/Card';

const milestones = [
  {
    title: 'Week 1',
    active: true,
    days: [
      { day: 'Monday', task: 'Review DBMS fundamentals and ER diagrams' },
      { day: 'Tuesday', task: 'Practice SQL queries and normalization' },
      { day: 'Wednesday', task: 'Study OS process scheduling algorithms' },
      { day: 'Thursday', task: 'Complete OS memory management concepts' },
      { day: 'Friday', task: 'Review Week 1 materials and take practice quiz' },
      { day: 'Saturday', task: 'Build a simple database schema project' },
      { day: 'Sunday', task: 'Rest and plan Week 2 objectives' },
    ]
  },
  {
    title: 'Week 2',
    active: true,
    days: [
      { day: 'Monday', task: 'Study computer networking basics' },
      { day: 'Tuesday', task: 'Learn TCP/IP protocol suite' },
      { day: 'Wednesday', task: 'Practice subnetting and IP addressing' },
      { day: 'Thursday', task: 'Study HTTP, DNS, and application layer' },
      { day: 'Friday', task: 'Complete networking problems and scenarios' },
      { day: 'Saturday', task: 'Build a simple network simulation' },
      { day: 'Sunday', task: 'Review Week 2 and prepare for Week 3' },
    ]
  },
  {
    title: 'Week 3',
    active: false,
    days: [
      { day: 'Monday', task: 'Study software engineering principles' },
      { day: 'Tuesday', task: 'Learn design patterns and architecture' },
      { day: 'Wednesday', task: 'Practice UML diagrams' },
      { day: 'Thursday', task: 'Start mini project planning' },
      { day: 'Friday', task: 'Implement core project features' },
      { day: 'Saturday', task: 'Complete project and testing' },
      { day: 'Sunday', task: 'Code review and documentation' },
    ]
  },
  {
    title: 'Week 4',
    active: false,
    days: [
      { day: 'Monday', task: 'Review all core concepts' },
      { day: 'Tuesday', task: 'Practice comprehensive problems' },
      { day: 'Wednesday', task: 'Take mock certification quiz' },
      { day: 'Thursday', task: 'Analyze quiz results and weak areas' },
      { day: 'Friday', task: 'Final review and practice' },
      { day: 'Saturday', task: 'Take certification readiness test' },
      { day: 'Sunday', task: 'Celebrate completion and plan next steps' },
    ]
  },
];

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      <Card title="AI Roadmap" description="A dynamic timeline showing the most important milestones for your learning journey.">
        <div className="space-y-8">
          {milestones.map((week, weekIndex) => (
            <div key={week.title} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className={`h-4 w-4 rounded-full ${week.active ? 'bg-teal-400' : 'bg-slate-400 dark:bg-slate-600'}`} />
                {weekIndex < milestones.length - 1 && <div className="h-full w-px bg-slate-300 dark:bg-slate-600" />}
              </div>
              <div className="flex-1">
                <div className="rounded-3xl border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-5 mb-4 shadow-md dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{week.title}</h3>
                  <p className="mt-2 text-slate-700 dark:text-slate-300">7-day learning plan</p>
                </div>
                <div className="grid gap-3 ml-8">
                  {week.days.map((day, dayIndex) => (
                    <div key={day.day} className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`h-2 w-2 rounded-full ${week.active ? 'bg-teal-300' : 'bg-slate-300 dark:bg-slate-500'}`} />
                        {dayIndex < week.days.length - 1 && <div className="h-6 w-px bg-slate-200 dark:bg-slate-600" />}
                      </div>
                      <div className={`rounded-2xl border p-4 flex-1 transition ${week.active ? 'border-teal-200 bg-teal-50 dark:border-teal-700 dark:bg-slate-700' : 'border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800'}`}>
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-900 dark:text-slate-50">{day.day}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${week.active ? 'bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-200' : 'bg-slate-100 text-slate-600 dark:bg-slate-600 dark:text-slate-300'}`}>
                            Day {dayIndex + 1}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{day.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/Card";

export default function RoadmapPage() {
  const { name } = useParams();

  const [domain, setDomain] = useState("");
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [learningStarted, setLearningStarted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);

  const timeline = localStorage.getItem("timeline") || "3 months";

  let totalDays = 90;
  if (timeline.includes("month")) totalDays = parseInt(timeline) * 30;
  else if (timeline.includes("year")) totalDays = parseInt(timeline) * 365;

  useEffect(() => {
    const newDomain = name?.toLowerCase();
    const prevDomain = localStorage.getItem("selectedDomain");

    if (newDomain && prevDomain !== newDomain) {
      localStorage.setItem("selectedDomain", newDomain);

      localStorage.setItem("journeyStarted", "false");
      localStorage.setItem("learningStarted", "false");
      localStorage.setItem("currentDay", "1");
      localStorage.setItem("carryForward", "[]");
      localStorage.removeItem("roadmapPlan");

      setJourneyStarted(false);
      setLearningStarted(false);
      setCurrentDay(1);
    } else {
      setJourneyStarted(localStorage.getItem("journeyStarted") === "true");
      setLearningStarted(localStorage.getItem("learningStarted") === "true");
      setCurrentDay(parseInt(localStorage.getItem("currentDay") || "1"));
    }

    setDomain(newDomain);
  }, [name]);

  // 🔥 MULTI-DOMAIN SUBTOPICS
  const topicMap = {

  "ai-and-ml": [
    ["Python Basics → Datatypes, Variables"],
    ["Loops, Conditions"],
    ["Functions, Lambda"],
    ["NumPy"],
    ["Pandas"],
    ["Visualization"],
    ["Statistics"],
    ["ML Basics"],
    ["Regression"],
    ["Model Evaluation"],
    ["Deep Learning"],
    ["Project"]
  ],

  "web-development": [
    ["HTML → Structure, Forms"],
    ["CSS → Box Model"],
    ["Flexbox, Grid"],
    ["JavaScript Basics"],
    ["DOM"],
    ["ES6"],
    ["React"],
    ["Hooks"],
    ["API"],
    ["Node.js"],
    ["MongoDB"],
    ["Project"]
  ],

  "cloud-and-devops": [
    ["Linux Basics"],
    ["Networking"],
    ["Git"],
    ["Docker"],
    ["CI/CD"],
    ["AWS EC2"],
    ["S3"],
    ["Kubernetes"],
    ["Monitoring"],
    ["Security"],
    ["Deployment"],
    ["Project"]
  ],

  "cybersecurity": [
    ["Networking Basics"],
    ["Cryptography"],
    ["Linux Security"],
    ["Web Security"],
    ["OWASP"],
    ["Ethical Hacking"],
    ["Pen Testing"],
    ["Tools"],
    ["Malware"],
    ["Incident Response"],
    ["Auditing"],
    ["Project"]
  ],

  "data-science": [
    ["Python"],
    ["NumPy"],
    ["Pandas"],
    ["Data Cleaning"],
    ["Visualization"],
    ["Statistics"],
    ["EDA"],
    ["ML Basics"],
    ["Regression"],
    ["Classification"],
    ["Projects"],
    ["Deployment"]
  ],

  "mobile-development": [
    ["Programming Basics"],
    ["Java/Kotlin"],
    ["Android Studio"],
    ["UI Design"],
    ["Layouts"],
    ["API Integration"],
    ["Database"],
    ["Firebase"],
    ["Testing"],
    ["Optimization"],
    ["Deployment"],
    ["Project"]
  ],

  "blockchain": [
    ["Blockchain Basics"],
    ["Cryptography"],
    ["Bitcoin"],
    ["Ethereum"],
    ["Smart Contracts"],
    ["Solidity"],
    ["DApps"],
    ["Web3"],
    ["Security"],
    ["Gas Fees"],
    ["Testing"],
    ["Project"]
  ],

  "ui-ux-design": [
    ["Design Principles"],
    ["Color Theory"],
    ["Typography"],
    ["Wireframing"],
    ["Prototyping"],
    ["Figma"],
    ["User Research"],
    ["UX Flow"],
    ["Testing"],
    ["Accessibility"],
    ["Design System"],
    ["Project"]
  ],

  "big-data": [
    ["Big Data Basics"],
    ["Hadoop"],
    ["MapReduce"],
    ["Spark"],
    ["Kafka"],
    ["Data Pipelines"],
    ["ETL"],
    ["Storage"],
    ["Analytics"],
    ["Scaling"],
    ["Cloud Data"],
    ["Project"]
  ],

  "networking": [
    ["OSI Model"],
    ["TCP/IP"],
    ["IP Addressing"],
    ["Routing"],
    ["Switching"],
    ["DNS"],
    ["HTTP/HTTPS"],
    ["Firewalls"],
    ["Security"],
    ["Troubleshooting"],
    ["Tools"],
    ["Project"]
  ]
};

  const topics = topicMap[domain] || [["Basics"]];

  // 🔥 SMART DISTRIBUTION (3–4 TOPICS PER DAY)
  const generatePlan = () => {
    const plan = [];
    const flatTopics = topics.flat();
    let index = 0;

    for (let day = 1; day <= totalDays; day++) {
      const daily = [];
      const count = 3 + (day % 2); // 3 or 4

      for (let i = 0; i < count; i++) {
        if (index < flatTopics.length) {
          daily.push(flatTopics[index]);
          index++;
        }
      }

      if (daily.length === 0) {
        daily.push("Revision / Practice");
      }

      plan.push(daily);
    }

    return plan;
  };

  useEffect(() => {
    if (!localStorage.getItem("roadmapPlan") && domain) {
      const plan = generatePlan();
      localStorage.setItem("roadmapPlan", JSON.stringify(plan));
    }
  }, [domain]);

  const roadmapPlan = JSON.parse(localStorage.getItem("roadmapPlan") || "[]");

  const getTasksForDay = (day) => {
    const carry = JSON.parse(localStorage.getItem("carryForward") || "[]");

    if (day === currentDay) {
      return [...new Set([...carry, ...(roadmapPlan[day - 1] || [])])];
    }

    return roadmapPlan[day - 1] || [];
  };

  const handleStartJourney = () => {
    localStorage.setItem("journeyStarted", "true");
    setJourneyStarted(true);
  };

  const handleStartToday = () => {
    localStorage.setItem("learningStarted", "true");
    setLearningStarted(true);
  };

  const progress = Math.min((currentDay / totalDays) * 100, 100);

  return (
    <div className="space-y-8">
      <Card title="Learning Roadmap">

        {!journeyStarted && (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              📚 What you will learn
            </h3>

            <div className="grid gap-3">
              {topics.map((t, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-300 bg-green-100 dark:border-slate-600 dark:bg-slate-700">
                  Step {i + 1} → {t.join(", ")}
                </div>
              ))}
            </div>

            <button onClick={handleStartJourney} className="px-6 py-3 bg-teal-500 text-white rounded-xl">
              Start Journey 🚀
            </button>
          </div>
        )}

        {journeyStarted && !learningStarted && (
          <div className="text-center">
            <button onClick={handleStartToday} className="px-6 py-3 bg-teal-600 text-white rounded-xl">
              Start From Today 📅
            </button>
          </div>
        )}

        {learningStarted && (
          <>
            <div className="mb-4">
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full">
                <div className="bg-teal-500 h-3 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <p>{Math.floor(progress)}% completed</p>
            </div>

            <h3 className="text-lg font-semibold">
              📅 Day {currentDay} of {totalDays} days ({timeline})
            </h3>

            {getTasksForDay(currentDay).map((task, i) => (
              <div key={i} className="p-4 rounded-xl border bg-green-100 dark:bg-slate-700">
                👉 {task}
              </div>
            ))}

            <Link to="/tasks">
              <button className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg">
                Go to Tasks →
              </button>
            </Link>
          </>
        )}

      </Card>
    </div>
  );
}
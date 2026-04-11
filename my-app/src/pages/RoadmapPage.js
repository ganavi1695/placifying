import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../components/Card";

export default function RoadmapPage() {
  const { name } = useParams();

  const [domain, setDomain] = useState("");
  const [roadmapPlan, setRoadmapPlan] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedTasks, setCompletedTasks] = useState({});

  const timeline = localStorage.getItem("timeline") || "3 months";

  // 🔥 DOMAIN
  useEffect(() => {
    const newDomain = name?.toLowerCase();
    setDomain(newDomain);
  }, [name]);

  // 🔥 TOPICS
  const topicMap = {
    "web-development": [
  "HTML Basics", "Semantic HTML", "Forms & Validation",
  "CSS Basics", "Flexbox", "Grid", "Responsive Design",
  "JavaScript Basics", "ES6+", "DOM Manipulation",
  "Event Handling", "Async JS", "Fetch API",
  "React Basics", "Components", "Props & State",
  "Hooks", "Routing", "Context API",
  "Node.js", "Express.js", "REST APIs",
  "Authentication (JWT)", "MongoDB",
  "Deployment (Vercel/Netlify)", "Full Stack Project"
],
    "ai-and-ml": [
  "Python Basics", "NumPy", "Pandas",
  "Data Visualization (Matplotlib, Seaborn)",
  "Statistics Basics", "Probability",
  "Data Preprocessing", "Feature Engineering",
  "Supervised Learning", "Regression",
  "Classification", "Model Evaluation",
  "Unsupervised Learning", "Clustering",
  "Deep Learning Basics", "Neural Networks",
  "TensorFlow / PyTorch",
  "NLP Basics", "Computer Vision",
  "Model Deployment", "ML Project"
],
"data-science": [
  "Python", "NumPy", "Pandas",
  "Data Cleaning", "Data Wrangling",
  "EDA (Exploratory Data Analysis)",
  "Visualization", "Statistics",
  "SQL Basics", "Advanced SQL",
  "Machine Learning Basics",
  "Regression", "Classification",
  "Time Series Analysis",
  "Business Analytics",
  "Dashboarding (Power BI/Tableau)",
  "End-to-End Data Project"
],
"cloud-and-devops": [
  "Linux Basics", "Shell Scripting",
  "Networking Basics",
  "Git & GitHub",
  "Docker", "Containers",
  "CI/CD Pipelines",
  "AWS Basics", "EC2", "S3",
  "IAM & Security",
  "Kubernetes Basics",
  "Monitoring (Prometheus, Grafana)",
  "Logging",
  "Infrastructure as Code",
  "Deployment Strategies",
  "DevOps Project"
],
"cybersecurity": [
  "Networking Basics", "OSI Model",
  "Linux Security",
  "Cryptography Basics",
  "Web Security",
  "OWASP Top 10",
  "Authentication & Authorization",
  "Ethical Hacking",
  "Penetration Testing",
  "Security Tools (Nmap, Burp Suite)",
  "Malware Basics",
  "Incident Response",
  "Risk Management",
  "Security Auditing",
  "Cybersecurity Project"
],
"mobile-development": [
  "Programming Basics (Java/Kotlin)",
  "Android Studio Setup",
  "UI Design Principles",
  "Layouts & Views",
  "Navigation",
  "API Integration",
  "Database (SQLite)",
  "Firebase",
  "Authentication",
  "Push Notifications",
  "App Performance Optimization",
  "Testing",
  "Publishing App",
  "Mobile App Project"
],
"blockchain": [
  "Blockchain Basics",
  "Cryptography",
  "Bitcoin Fundamentals",
  "Ethereum",
  "Smart Contracts",
  "Solidity",
  "DApps",
  "Web3.js / Ethers.js",
  "Wallet Integration",
  "Gas Fees",
  "Security Best Practices",
  "Testing Contracts",
  "Blockchain Project"
],
"ui-ux-design": [
  "Design Principles",
  "Color Theory",
  "Typography",
  "Wireframing",
  "Prototyping",
  "Figma",
  "User Research",
  "User Personas",
  "UX Flow",
  "Usability Testing",
  "Accessibility",
  "Design Systems",
  "UI Components",
  "Design Project"
],
"big-data": [
  "Big Data Fundamentals",
  "Types of Data (Structured / Unstructured)",
  "Data Warehousing Concepts",
  "Hadoop Ecosystem Overview",
  "HDFS (Hadoop Distributed File System)",
  "MapReduce Programming",
  "Apache Spark Basics",
  "Spark RDDs & DataFrames",
  "Spark SQL",
  "Apache Kafka (Streaming)",
  "Real-Time Data Processing",
  "ETL Pipelines",
  "Data Ingestion Tools",
  "NoSQL Databases (Cassandra, HBase)",
  "Data Lake vs Data Warehouse",
  "Distributed Computing Concepts",
  "Cloud Big Data (AWS / GCP)",
  "Data Pipeline Architecture",
  "Performance Optimization",
  "Big Data Security",
  "Big Data Project (End-to-End)"
],
"networking": [
  "OSI Model",
  "TCP/IP",
  "IP Addressing",
  "Subnetting",
  "Routing",
  "Switching",
  "DNS",
  "HTTP/HTTPS",
  "Firewalls",
  "VPN",
  "Network Security",
  "Troubleshooting",
  "Networking Tools",
  "Networking Project"
]
  };

  const topics = topicMap[domain] || ["Basics"];

  // 🚀 GENERATE PLAN (3–5 TASKS / DAY + FULL TIMELINE)
  const generatePlan = () => {
    let totalDays = 90;

    if (timeline.includes("month")) totalDays = parseInt(timeline) * 30;
    else if (timeline.includes("year")) totalDays = parseInt(timeline) * 365;

    const plan = [];
    let index = 0;

    for (let day = 0; day < totalDays; day++) {
      const daily = [];

      const count = 3 + Math.floor(Math.random() * 3); // 3–5 tasks

      for (let i = 0; i < count; i++) {
        daily.push(topics[index % topics.length]);
        index++;
      }

      plan.push(daily);
    }

    return plan;
  };

  // ✅ INIT PLAN
  useEffect(() => {
    if (domain) {
      const plan = generatePlan();
      setRoadmapPlan(plan);
      sessionStorage.setItem("roadmapPlan", JSON.stringify(plan));
      sessionStorage.setItem("currentDay", "1");
      sessionStorage.setItem("completedTasks", "{}");
      setCurrentDay(1);
      setCompletedTasks({});
    }
  }, [domain]);

  // ✅ LOAD STATE
  useEffect(() => {
    const savedPlan = JSON.parse(sessionStorage.getItem("roadmapPlan") || "[]");
    const savedTasks = JSON.parse(sessionStorage.getItem("completedTasks") || "{}");
    const savedDay = parseInt(sessionStorage.getItem("currentDay") || "1");

    if (savedPlan.length) setRoadmapPlan(savedPlan);
    setCompletedTasks(savedTasks);
    setCurrentDay(savedDay);
  }, []);

  // 🔥 GET TASKS (WITH CARRY FORWARD)

  useEffect(() => {
  const handleUpdate = () => {
    const updated = JSON.parse(sessionStorage.getItem("completedTasks") || "{}");
    setCompletedTasks(updated);
  };

  window.addEventListener("storage", handleUpdate);
  window.addEventListener("focus", handleUpdate);

  return () => {
    window.removeEventListener("storage", handleUpdate);
    window.removeEventListener("focus", handleUpdate);
  };
}, []);
  const getTasksForDay = (day) => {
    const prevIncomplete =
      (roadmapPlan[day - 2] || []).filter(
        task => !(completedTasks[day - 1] || []).includes(task)
      );

    const todayTasks = roadmapPlan[day - 1] || [];

    return [...prevIncomplete, ...todayTasks];
  };

  // ✅ AUTO NEXT DAY
  useEffect(() => {
    const todayTasks = getTasksForDay(currentDay);
    const completedToday = completedTasks[currentDay] || [];

    if (
      todayTasks.length > 0 &&
      todayTasks.every(task => completedToday.includes(task))
    ) {
      const nextDay = currentDay + 1;
      setCurrentDay(nextDay);
      sessionStorage.setItem("currentDay", nextDay.toString());
    }
  }, [completedTasks]);

  // ✅ PROGRESS (DAY BASED)
  // ✅ NEW (TASK-BASED PROGRESS)
const totalTasks = roadmapPlan.flat().length;

const completedCount = Object.values(completedTasks)
  .flat()
  .length;

const progress = totalTasks
  ? (completedCount / totalTasks) * 100
  : 0;

  return (
    <div className="space-y-8 text-white">
      <Card title="Learning Roadmap">

        <h2 className="text-xl font-bold capitalize">
          🚀 {domain}
        </h2>

        {/* PROGRESS */}
        <div className="mt-4">
          <div className="w-full bg-slate-700 h-3 rounded-full">
            <div
              className="h-3 rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #22c55e, #4f46e5)"
              }}
            />
          </div>
          <p className="text-gray-400 mt-2">
            {Math.floor(progress)}% completed
          </p>
        </div>

        {/* DAY */}
        <h3 className="mt-4">
          Day {currentDay} / {roadmapPlan.length || 1}
        </h3>

        {/* TASKS */}
        <div className="grid gap-3 mt-4">
          {getTasksForDay(currentDay).map((task, i) => (
            <div
              key={i}
              className="p-4 bg-slate-800 rounded-xl border border-slate-700"
            >
              📌 {task}
            </div>
          ))}
        </div>

        <Link to="/tasks">
          <button className="mt-6 px-6 py-3 bg-teal-500 rounded-xl">
            Go to Tasks →
          </button>
        </Link>

      </Card>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function DashboardPage() {
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState({
    progress: 0,
    tasks: 0,
    quiz: 0,
  });

  const [streak, setStreak] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [domain, setDomain] = useState("");
  

  useEffect(() => {
    // 📊 GET DATA
    const roadmapPlan = JSON.parse(localStorage.getItem("roadmapPlan") || "[]");
    const completedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");

    const quizScore = parseInt(localStorage.getItem("quizScore") || "0");
    const totalQuestions = parseInt(localStorage.getItem("totalQuestions") || "1");

    const lastCompleted = parseInt(localStorage.getItem("lastCompletedCount") || "0");
    const lastTotal = parseInt(localStorage.getItem("lastTotalTasks") || "1");

    const currentDay = parseInt(localStorage.getItem("currentDay") || "1");

    const selectedDomain = localStorage.getItem("selectedDomain") || "learning";
    setDomain(selectedDomain.replace(/-/g, " "));

    // 📈 CALCULATIONS
    const totalTasks = roadmapPlan.flat().length;
    const totalDays = Math.ceil(totalTasks / 4);

    const progress =
      totalDays > 0
        ? Math.round((completedDays.length / totalDays) * 100)
        : 0;

    const tasks = lastTotal > 0 ? Math.round((lastCompleted / lastTotal) * 100) : 0;
    const quiz =
      totalQuestions > 0 ? Math.round((quizScore / totalQuestions) * 100) : 0;

    // 🔥 STREAK
    let currentStreak = 0;
    for (let i = completedDays.length - 1; i >= 0; i--) {
      if (completedDays[i] === currentDay - currentStreak - 1) currentStreak++;
      else break;
    }

    // 🤖 SMART RECOMMENDATION
    const generateRecommendation = () => {
      if (tasks < 50) return "⚡ Focus on completing daily tasks consistently.";
      if (quiz < 60) return "🧠 Revise concepts and improve quiz accuracy.";
      if (progress > 80) return "🚀 You're doing great! Start building projects.";
      if (currentStreak < 3) return "🔥 Build your streak by learning daily.";
      return "👍 Keep going, you're making solid progress!";
    };

    setMetrics({ progress, tasks, quiz });
    setStreak(currentStreak);
    setRecommendation(generateRecommendation());
  }, []);

  return (
    <div className="space-y-8">

      {/* 🔥 TOP SECTION */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">

        {/* LEFT */}
        <div className="rounded-[2rem] bg-slate-800/60 backdrop-blur-xl border border-slate-700 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Welcome back 👋</h2>
          <p className="mt-2 text-slate-400">
            Continue your {domain} journey and track your growth.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            {/* Course Progress */}
            <div className="rounded-xl bg-slate-700/50 p-5">
              <p className="text-sm text-slate-400">Course completion</p>
              <p className="text-2xl font-bold text-white mt-2">
                {metrics.progress}%
              </p>
            </div>

            {/* Daily Tasks */}
            <div className="rounded-xl bg-slate-700/50 p-5">
              <p className="text-sm text-slate-400">Daily tasks</p>
              <p className="text-2xl font-bold text-white mt-2">
                {metrics.tasks}%
              </p>
            </div>

            {/* Quiz */}
            <div className="rounded-xl bg-slate-700/50 p-5">
              <p className="text-sm text-slate-400">Quiz accuracy</p>
              <p className="text-2xl font-bold text-white mt-2">
                {metrics.quiz}%
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-[2rem] bg-slate-800/60 backdrop-blur-xl border border-slate-700 p-8 shadow-xl">
          <h3 className="text-lg text-slate-300">Next milestone</h3>

          <div className="mt-4 rounded-xl bg-slate-700/50 p-4">
            <p className="text-sm text-slate-400">Recommended focus</p>
            <p className="text-white mt-2">{recommendation}</p>
          </div>

          <button
            onClick={() => navigate("/roadmap")}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-white font-medium hover:opacity-90 transition"
          >
            View roadmap
          </button>
        </div>
      </div>

      {/* 🔹 MIDDLE SECTION */}
      <div className="grid gap-6 md:grid-cols-3">

        {/* Fundamentals */}
        <div className="rounded-[2rem] bg-slate-800/60 border border-slate-700 p-6 shadow-xl">
          <h3 className="text-lg text-white">Fundamentals</h3>
          <p className="text-sm text-slate-400 mt-2">
            Strengthen your core subjects.
          </p>
          <button
            onClick={() => navigate("/fundamentals")}
            className="mt-4 px-4 py-2 rounded-full bg-purple-500 text-white text-sm"
          >
            Go to fundamentals
          </button>
        </div>

        {/* Domains */}
        <div className="rounded-[2rem] bg-slate-800/60 border border-slate-700 p-6 shadow-xl">
          <h3 className="text-lg text-white">Role paths</h3>
          <p className="text-sm text-slate-400 mt-2">
            Explore domain-based learning.
          </p>
          <button
            onClick={() => navigate("/domains")}
            className="mt-4 px-4 py-2 rounded-full bg-blue-500 text-white text-sm"
          >
            Choose domain
          </button>
        </div>

        {/* Tasks */}
        <div className="rounded-[2rem] bg-slate-800/60 border border-slate-700 p-6 shadow-xl">
          <h3 className="text-lg text-white">Daily study</h3>
          <p className="text-sm text-slate-400 mt-2">
            Stay consistent with daily tasks.
          </p>
          <button
            onClick={() => navigate("/tasks")}
            className="mt-4 px-4 py-2 rounded-full bg-indigo-500 text-white text-sm"
          >
            Open tasks
          </button>
        </div>

      </div>

      {/* 📊 WEEKLY PROGRESS */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">

        {/* Progress Bars */}
        <div className="rounded-[2rem] bg-slate-800/60 border border-slate-700 p-8 shadow-xl">
          <h3 className="text-lg text-white">Weekly progress</h3>

          <div className="mt-6 space-y-5">
            {[
              { label: "Course completion", value: metrics.progress },
              { label: "Daily tasks", value: metrics.tasks },
              { label: "Quiz accuracy", value: metrics.quiz },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm text-slate-300 mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 STREAK */}
        <div className="rounded-[2rem] bg-slate-800/60 border border-slate-700 p-8 shadow-xl">

  <h3 className="text-lg text-slate-300">Growth streak</h3>

  <div className="mt-6 flex items-center gap-4">

    {/* 🔥 Animated Flame */}
    <div className="text-4xl flame-animate">🔥</div>
    <div>
      <p className="text-4xl font-bold text-white">{streak} days</p>
      <p className="text-sm text-slate-400">
        Keep your streak alive!
      </p>
    </div>

  </div>
             
</div>

      </div>

    </div>
  );
}
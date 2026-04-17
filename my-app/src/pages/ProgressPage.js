import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import ProgressChart from "../components/ProgressChart";
import StreakCalendar from "../components/StreakCalendar";

export default function ProgressPage() {
  const [metrics, setMetrics] = useState({
    consistency: 0,
    quiz: 0,
    tasks: 0,
  });
  const [streak, setStreak] = useState(0);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [completedDays, setCompletedDays] = useState([]);
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    // 📊 DATA
    const quizScore = parseInt(localStorage.getItem("quizScore") || "0");
    const totalQuestions = parseInt(localStorage.getItem("totalQuestions") || "1");

    const completed = parseInt(localStorage.getItem("lastCompletedCount") || "0");
    const totalTasks = parseInt(localStorage.getItem("lastTotalTasks") || "1");

    const storedCompletedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");
    const currentDay = parseInt(localStorage.getItem("currentDay") || "1");

    // 📈 CALCULATIONS
    const quizPercentage = Math.round((quizScore / totalQuestions) * 100);
    const taskPercentage = Math.round((completed / totalTasks) * 100);
    const consistency = Math.round((storedCompletedDays.length / currentDay) * 100);

    // 🔥 STREAK
    let currentStreak = 0;
    const sortedDays = [...storedCompletedDays].sort((a, b) => a - b);

    for (let i = sortedDays.length - 1; i >= 0; i--) {
      if (sortedDays[i] === currentDay - currentStreak - 1) currentStreak++;
      else break;
    }

    // 🎮 XP + LEVEL
    const totalXP = parseInt(localStorage.getItem("xp") || "0");
    const userLevel = Math.floor(totalXP / 100) + 1;

    // 🏅 BADGES
    const badgeList = [];
    if (currentStreak >= 3) badgeList.push("🔥 3 Day Streak");
    if (currentStreak >= 7) badgeList.push("🚀 7 Day Warrior");
    if (quizPercentage >= 80) badgeList.push("🧠 Quiz Master");
    if (consistency >= 70) badgeList.push("📅 Consistency King");
    if (totalXP >= 500) badgeList.push("🏆 Level Grinder");

    // 🤖 RECOMMENDATION
    const generateRecommendation = () => {
      if (taskPercentage < 50) return "⚡ Focus on completing daily tasks consistently.";
      if (quizPercentage < 60) return "🧠 Revise fundamentals and reattempt quizzes.";
      if (consistency < 70) return "📅 Try to maintain a daily learning streak.";
      if (taskPercentage > 80 && quizPercentage > 80) return "🚀 You're ahead! Start building projects.";
      return "👍 You're doing well. Keep improving steadily.";
    };

    // ✅ SET STATE
    setMetrics({
      consistency,
      quiz: quizPercentage,
      tasks: taskPercentage,
    });
    setStreak(currentStreak);
    setXP(totalXP);
    setLevel(userLevel);
    setBadges(badgeList);
    setCompletedDays(storedCompletedDays);
    setRecommendation(generateRecommendation());

  }, []);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">

  {/* LEFT SIDE */}
  <div className="space-y-6">

    {/* PROGRESS TRACKING */}
    <div className="rounded-[2rem] bg-slate-800/60 backdrop-blur-xl border border-slate-700 p-8 shadow-xl">

      <h2 className="text-3xl font-semibold text-white">
        📊 Progress tracking
      </h2>
      <p className="mt-2 text-slate-400">
        Visualize your current milestones and performance.
      </p>

      <div className="mt-8 space-y-6">
        {[
          { label: "Study consistency", value: metrics.consistency },
          { label: "Quiz mastery", value: metrics.quiz },
          { label: "Task completion", value: metrics.tasks },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm text-slate-300 mb-2">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>

            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}

        {/* XP + LEVEL */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="rounded-xl bg-slate-700/50 p-4">
            <p className="text-xl text-slate-400">XP 💎</p>
            <p className="text-xl font-semibold text-white">{xp}</p>
          </div>

          <div className="rounded-xl bg-slate-700/50 p-4">
            <p className="text-xl text-slate-400">Level 🚀</p>
            <p className="text-xl font-semibold text-white">{level}</p>
          </div>
        </div>
      </div>
    </div>

    {/* 🤖 SMART SUGGESTION */}
    <div className="rounded-[2rem] bg-slate-800/60 backdrop-blur-xl border border-slate-700 p-6 shadow-xl">
      <h3 className="text-xl text-slate-400">🤖 Smart suggestion</h3>
      <p className="text-white mt-2">{recommendation}</p>
    </div>

    {/* 🏅 ACHIEVEMENTS */}
    <div className="rounded-[2rem] bg-slate-800/60 backdrop-blur-xl border border-slate-700 p-6 shadow-xl">
      <h3 className="text-xl text-slate-400">🏆 Achievements</h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {badges.length > 0 ? (
          badges.map((badge, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            >
              {badge}
            </span>
          ))
        ) : (
          <p className="text-slate-500 text-sm">No badges yet</p>
        )}
      </div>
    </div>

  </div>

  {/* RIGHT SIDE */}
  <div className="space-y-6">

    {/* 📊 GRAPH (TOP) */}
    <div className="rounded-[2rem] bg-slate-800/60 backdrop-blur-xl border border-slate-700 p-6 shadow-xl">
      <h3 className="text-xl text-slate-400"> 📈 Weekly progress</h3>

      <div className="mt-4 h-56">
        <ProgressChart completedDays={completedDays} />
      </div>
    </div>

    {/* 🔥 STREAK */}
    <div className="rounded-[2rem] bg-slate-800/60 backdrop-blur-xl border border-slate-700 p-6 shadow-xl">
      <h3 className="text-lg text-slate-300">Current streak</h3>
      <div className="rounded-[2rem] bg-slate-800/60 backdrop-blur-xl border border-slate-700 p-6 shadow-xl">
  <h3 className="text-lg text-slate-300">🔥 Weekly Streak</h3>

  <div className="mt-4">
    <StreakCalendar />
  </div>

  <p className="mt-4 text-sm text-slate-400">
    Current streak: {streak} days
  </p>
</div>
      <p className="text-sm text-slate-400 mt-2">
        Maintain your streak by completing daily tasks.
      </p>
    </div>

  </div>

</div>
  );
}
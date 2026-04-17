import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// ✨ Glow Plugin
const glowPlugin = {
  id: "glowLine",
  beforeDatasetDraw(chart) {
    const { ctx } = chart;
    ctx.save();
    ctx.shadowColor = "rgba(59,130,246,0.6)";
    ctx.shadowBlur = 15;
  },
  afterDatasetDraw(chart) {
    chart.ctx.restore();
  },
};

export default function ProgressChart() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // ✅ GET STORED DATA (OUTSIDE OBJECT)
  const weeklyData = JSON.parse(localStorage.getItem("weeklyProgress") || "{}");
  const currentDay = parseInt(localStorage.getItem("currentDay") || "1");

  // ✅ CALCULATE CURRENT WEEK START
  const weekStart = currentDay - ((currentDay - 1) % 7);

  // ✅ GENERATE DATA ARRAY
  const chartDataValues = labels.map((_, i) => {
    const day = weekStart + i;
    return weeklyData[day] || 0;
  });

  // 🎨 DATA OBJECT
  const data = {
    labels,
    datasets: [
      {
        label: "Tasks Completed",
        data: chartDataValues,
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 4,
        fill: false,

        // 🔥 Gradient Line
        borderColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 400, 0);
          gradient.addColorStop(0, "#22d3ee");
          gradient.addColorStop(0.5, "#3b82f6");
          gradient.addColorStop(1, "#a855f7");
          return gradient;
        },

        pointBackgroundColor: "#22d3ee",
      },
    ],
  };


  const maxTasks = Math.max(...chartDataValues, 4); // at least 4
  // ⚙️ OPTIONS
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8" },
      },
      y: {
        beginAtZero: true,
       max: maxTasks + 1,
        grid: { display: false },
        ticks: { color: "#94a3b8" },
      },
    },
  };

  return <Line data={data} options={options} plugins={[glowPlugin]} />;
}
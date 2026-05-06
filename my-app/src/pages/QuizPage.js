import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const domain = searchParams.get('domain') || 'blockchain';
  
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [difficulty, setDifficulty] = useState(null);

  const fetchQuestions = async (level) => {
    setLoading(true);
    setDifficulty(level);
    try {
      const res = await fetch("http://localhost:5000/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, difficulty: level })
      });
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const cleanStr = (str) => str ? str.replace(/^[a-z0-9][\s).:-]+/i, "").trim().toLowerCase() : "";

  const score = questions.reduce((acc, q, idx) => {
    const userAns = cleanStr(selected[idx]);
    const correctAns = cleanStr(q.answer);
    return acc + (userAns === correctAns ? 1 : 0);
  }, 0);

  const handleGenerateRoadmap = async () => {
    setGeneratingRoadmap(true);
    const savedTimeline = localStorage.getItem('timeline') || '3 months';

    try {
      const res = await fetch("http://localhost:5000/api/quiz/analyze-and-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          questions,
          selectedAnswers: selected,
          timeline: savedTimeline
        })
      });

      const roadmapData = await res.json();
      if (!res.ok) {
        const message = roadmapData?.error || roadmapData?.msg || 'Roadmap generation failed';
        throw new Error(message);
      }

      let finalPlan = [];
      if (Array.isArray(roadmapData)) {
        finalPlan = roadmapData;
      } else if (roadmapData && typeof roadmapData === 'object') {
        if (Array.isArray(roadmapData.roadmap)) {
          finalPlan = roadmapData.roadmap;
        } else if (Array.isArray(roadmapData.data)) {
          finalPlan = roadmapData.data;
        } else {
          const nestedArray = Object.values(roadmapData).find((value) => Array.isArray(value));
          if (Array.isArray(nestedArray)) finalPlan = nestedArray;
        }
      }

      if (!Array.isArray(finalPlan) || finalPlan.length === 0) {
        console.error('Invalid roadmap payload', roadmapData);
        alert('Roadmap generation returned invalid data. Please try again.');
        return;
      }

      localStorage.setItem('roadmapPlan', JSON.stringify(finalPlan));
      localStorage.setItem('selectedDomain', domain);
      localStorage.setItem('timeline', savedTimeline);
      localStorage.setItem('quizScore', score);
      localStorage.setItem("completedDays", JSON.stringify([]));
      localStorage.setItem("currentDay", "1");

      navigate(`/roadmap/${domain}`);
    } catch (err) {
      console.error("Error generating roadmap", err);
      alert(err.message || "AI Roadmap generation failed. Please try again.");
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  if (!difficulty && !loading) {
    return (
      <div className="max-w-2xl mx-auto p-10 text-center space-y-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-300 dark:border-slate-600 shadow-sm dark:shadow-slate-950/50 mt-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Select Assessment Difficulty</h2>
        <div className="grid gap-4">
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <button key={level} onClick={() => fetchQuestions(level.toLowerCase())} className="p-5 text-xl font-semibold border-2 rounded-2xl bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-600 transition-all capitalize">
              {level}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-20 text-center font-medium">AI is generating questions for {domain}...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 border border-slate-300 dark:border-slate-600 shadow-sm dark:shadow-slate-950/50">
        <h2 className="text-2xl font-bold capitalize mb-8 text-slate-900 dark:text-slate-50">{domain.replace(/-/g, ' ')} Assessment</h2>
        
        <div className="space-y-8">
          {questions.map((q, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
              <p className="font-semibold text-lg mb-4 text-slate-900 dark:text-slate-50">{idx + 1}. {q.question}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const isCorrect = cleanStr(opt) === cleanStr(q.answer);
                  const isSelected = selected[idx] === opt;
                  
                  let btnStyle = "bg-white dark:bg-slate-600 border-slate-200 dark:border-slate-500 text-slate-900 dark:text-slate-50";
                  if (isSelected) btnStyle = "bg-blue-600 dark:bg-blue-600 text-white border-blue-600 dark:border-blue-500";
                  if (submitted) {
                    if (isCorrect) btnStyle = "bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-600 text-green-900 dark:text-green-200 ring-2 ring-green-100 dark:ring-green-900/50";
                    else if (isSelected && !isCorrect) btnStyle = "bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-600 text-red-900 dark:text-red-200";
                  }

                  return (
                    <button
                      key={opt}
                      disabled={submitted}
                      onClick={() => setSelected(prev => ({ ...prev, [idx]: opt }))}
                      className={`p-4 text-left border rounded-xl transition-all font-medium ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t pt-6">
          {!submitted ? (
            <Button onClick={() => setSubmitted(true)} disabled={Object.keys(selected).length < questions.length}>
              Submit Results
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-3xl font-bold text-teal-600">Score: {score} / 10</div>
              <Button onClick={handleGenerateRoadmap} disabled={generatingRoadmap}>
                {generatingRoadmap ? "Analyzing & Building Roadmap..." : "Generate Personalized Roadmap →"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
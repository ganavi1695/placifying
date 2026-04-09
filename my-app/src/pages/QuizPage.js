import { useState } from 'react';
import Button from '../components/Button';

const questions = [
  {
    id: 1,
    question: 'Which SQL command is used to remove duplicates from query results?',
    options: ['DISTINCT', 'GROUP BY', 'UNION', 'FILTER'],
    answer: 'DISTINCT',
  },
  {
    id: 2,
    question: 'Which layer of the OSI model handles routing?',
    options: ['Transport', 'Network', 'Data Link', 'Session'],
    answer: 'Network',
  },
  {
    id: 3,
    question: 'Which design model is best for evolving requirements?',
    options: ['Waterfall', 'V-Model', 'Spiral', 'Agile'],
    answer: 'Agile',
  },
];

export default function QuizPage() {
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((acc, question) => {
    return acc + (selected[question.id] === question.answer ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Assessment quiz</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Test your fundamentals with a short multiple-choice quiz.</p>
        <div className="mt-8 space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-4 rounded-3xl border border-slate-300 bg-gradient-to-br from-blue-50 to-teal-50 p-5 dark:border-slate-600 dark:from-slate-700 dark:to-slate-700">
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-50">{question.question}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelected((prev) => ({ ...prev, [question.id]: option }))}
                    className={`rounded-3xl border px-4 py-3 text-left transition font-medium ${
                      selected[question.id] === option
                        ? 'border-teal-400 bg-teal-100 text-teal-900 dark:border-teal-400 dark:bg-slate-700 dark:text-teal-200'
                        : 'border-slate-300 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:bg-slate-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button onClick={() => setSubmitted(true)}>Submit quiz</Button>
          {submitted && (
            <div className="rounded-3xl bg-teal-100 px-4 py-3 text-sm font-medium text-teal-900 dark:bg-slate-700 dark:text-teal-200">
              Score: {score} / {questions.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

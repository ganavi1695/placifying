import { useState } from 'react';
import Button from '../components/Button';

const initialMessages = [
  { id: 1, role: 'bot', text: 'Hi! I’m your study assistant. What topic would you like help with today?' },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');

  const sendMessage = () => {
    if (!draft.trim()) return;
    const userMessage = { id: Date.now(), role: 'user', text: draft.trim() };
    const botReply = { id: Date.now() + 1, role: 'bot', text: 'Great choice! I suggest starting with a short concept review and a practice activity.' };
    setMessages((prev) => [...prev, userMessage, botReply]);
    setDraft('');
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
        <div className="flex flex-col gap-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-3xl p-5 shadow-sm ${
                message.role === 'bot'
                  ? 'bg-gradient-to-br from-slate-200 to-slate-100 text-slate-800 dark:from-slate-700 dark:to-slate-700 dark:text-slate-200'
                  : 'self-end bg-gradient-to-br from-teal-200 to-teal-100 text-teal-900 dark:from-slate-700 dark:to-slate-700 dark:text-teal-200'
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about DBMS, OS, career paths..."
          className="rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-teal-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-teal-400"
        />
        <Button onClick={sendMessage} className="w-full sm:w-auto">Send</Button>
      </div>
    </div>
  );
}

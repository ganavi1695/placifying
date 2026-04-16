import { useState, useRef, useEffect } from 'react';
import Button from '../components/Button';

const initialMessages = [
  { id: 1, role: 'bot', text: 'Hi! I am your study assistant. What topic would you like help with today?' },
];

const botResponses = {
  'dbms': 'DBMS is crucial! I recommend starting with normalization, SQL queries, and indexing. Would you like a study plan?',
  'os': 'Operating Systems is foundational. Focus on process scheduling, memory management, and file systems. Need help with any of these?',
  'network': 'Great topic! Start with OSI model, TCP/IP, routing, and security. Which area interests you most?',
  'ai': 'AI and ML is exciting! Begin with Python, libraries like NumPy and Pandas, then move to ML algorithms. Ready to start?',
  'web': 'Web development is in-demand! Learn HTML/CSS, JavaScript, React, and backend frameworks. What is your focus?',
  'cloud': 'Cloud and DevOps is essential! Study Docker, Kubernetes, CI/CD, and cloud platforms. Which cloud platform?',
  'security': 'Cybersecurity is critical! Learn encryption, network security, and ethical hacking. Where to begin?',
  'default': 'That is a great topic! Would you like a structured learning plan or quick tips? Let me know how I can help!'
};

const getBotResponse = (userText) => {
  const text = userText.toLowerCase();
  if (text.includes('dbms') || text.includes('database') || text.includes('sql')) return botResponses.dbms;
  if (text.includes('os') || text.includes('operating')) return botResponses.os;
  if (text.includes('network') || text.includes('cn') || text.includes('tcp') || text.includes('routing')) return botResponses.network;
  if (text.includes('ai') || text.includes('machine learning') || text.includes('ml')) return botResponses.ai;
  if (text.includes('web') || text.includes('javascript') || text.includes('react') || text.includes('html')) return botResponses.web;
  if (text.includes('cloud') || text.includes('devops') || text.includes('docker') || text.includes('kubernetes')) return botResponses.cloud;
  if (text.includes('security') || text.includes('cybersecurity') || text.includes('encryption')) return botResponses.security;
  return botResponses.default;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!draft.trim()) return;
    setIsLoading(true);
    const userMessage = { id: Date.now(), role: 'user', text: draft.trim() };
    setTimeout(() => {
      const botReply = { id: Date.now() + 1, role: 'bot', text: getBotResponse(draft.trim()) };
      setMessages((prev) => [...prev, userMessage, botReply]);
      setIsLoading(false);
    }, 600);
    setDraft('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">Study Assistant</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Ask me anything about your learning path, study tips, or career guidance.</p>
      </div>

      <div className="rounded-[2rem] border border-slate-300 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg shadow-slate-200/50 dark:border-slate-600 dark:from-slate-800 dark:to-slate-800 dark:shadow-slate-950/50">
        <div className="flex flex-col h-96 gap-4">
          <div className="flex-1 overflow-y-auto space-y-4 pr-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-3xl p-5 shadow-sm ${
                    message.role === 'bot'
                      ? 'bg-gradient-to-br from-slate-200 to-slate-100 text-slate-800 dark:from-slate-700 dark:to-slate-600 dark:text-slate-100'
                      : 'bg-gradient-to-br from-teal-400 to-teal-500 text-white dark:from-teal-600 dark:to-teal-700'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-slate-200 to-slate-100 text-slate-800 dark:from-slate-700 dark:to-slate-600 dark:text-slate-100 rounded-3xl p-5 shadow-sm">
                  <p className="text-sm">✦ Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about DBMS, AI, Web Dev, Cloud..."
              disabled={isLoading}
              className="flex-1 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-teal-50 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:focus:border-teal-400"
            />
            <Button 
              onClick={sendMessage} 
              disabled={isLoading || !draft.trim()}
              className="w-auto"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

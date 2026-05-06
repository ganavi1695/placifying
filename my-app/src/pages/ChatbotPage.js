import { useState, useRef, useEffect } from 'react';
import Button from '../components/Button';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: 'Hi! I am your AI Study Assistant. Ask me anything about programming, DSA, web dev, or career guidance 🚀'
    }
  ]);

  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]); // Scroll when loading starts too

  // MAIN FUNCTION
  const sendMessage = async () => {
    if (!draft.trim() || isLoading) return; // Prevent double-sending

    const userContent = draft.trim();
    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: userContent
    };

    setMessages((prev) => [...prev, userMessage]);
    setDraft(''); // Clear input immediately for better UX
    setIsLoading(true);

    try {
      // Ensure this URL matches your server.js port
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userContent
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Server error");

      const botReply = {
        id: Date.now() + 1,
        role: 'bot',
        text: data.reply
      };

      setMessages((prev) => [...prev, botReply]);

    } catch (error) {
      console.error("Frontend Error:", error);
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: "⚠️ I'm having trouble connecting to the brain. Please check your internet or try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      {/* Header */}
      <div className="rounded-[2rem] border border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white dark:from-slate-800 to-blue-50 dark:to-slate-800 p-8 shadow-sm dark:shadow-slate-950/50">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-slate-50">AI Study Assistant</h2>
        <p className="mt-2 text-gray-600 dark:text-slate-400">
          Powered by Llama 3 • Focused on your CSE Curriculum
        </p>
      </div>

      {/* Chat Box */}
      <div className="rounded-[2rem] border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 shadow-xl dark:shadow-slate-950/50 relative overflow-hidden">
        <div className="flex flex-col h-[500px]">

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-3 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                    message.role === 'bot'
                      ? 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-50 rounded-tl-none'
                      : 'bg-teal-600 dark:bg-teal-600 text-white rounded-tr-none'
                  }`}
                >
                  {/* Preserves line breaks from the AI response */}
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl rounded-tl-none px-5 py-3 text-gray-500 dark:text-slate-400 italic">
                  ✦ Assistant is thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-3 pt-6 border-t border-slate-300 dark:border-slate-700 mt-4">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isLoading ? "Please wait..." : "Ask about DSA, React, Python..."}
              disabled={isLoading}
              className="flex-1 rounded-2xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-5 py-3 text-slate-900 dark:text-slate-50 placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 transition-all"
            />

            <Button
              onClick={sendMessage}
              disabled={isLoading || !draft.trim()}
              className="rounded-2xl px-6 py-3 bg-teal-600 hover:bg-teal-700 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? "..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
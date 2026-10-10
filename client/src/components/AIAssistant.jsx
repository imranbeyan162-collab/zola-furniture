import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, MessageCircle } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your Zola Furniture AI Assistant. How can I help you regarding our handcrafted furniture, delivery across Addis Ababa, or custom orders?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { sender: 'user', text: query.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim() })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'I am temporarily having trouble reaching our showroom server. Please call us directly at 0935 745 559!' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    'Where do you deliver in Addis Ababa?',
    'What woods and fabrics are used?',
    'How do I request a custom size?',
    'What are your contact phone numbers?'
  ];

  return (
    <>
      {/* Floating Sparkle Button (Matching Reference layout) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask Zola AI Assistant"
        className="fixed bottom-20 sm:bottom-8 right-5 z-40 w-13 h-13 rounded-full bg-gradient-to-tr from-[#1b1613] to-[#3a2f26] border-2 border-[#c9a24a] text-[#c9a24a] hover:text-black hover:bg-[#c9a24a] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 gold-glow group"
      >
        <Sparkles className="w-6 h-6 transition-transform group-hover:rotate-12" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#c9a24a] rounded-full animate-ping" />
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-36 sm:bottom-24 right-4 sm:right-8 z-50 w-[92vw] max-w-sm rounded-[28px] luxury-card border border-[#c9a24a]/35 shadow-2xl overflow-hidden animate-fade-in flex flex-col h-[480px]">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#201a16] to-[#2c231d] border-b border-[#3b3026] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#c9a24a]/20 border border-[#c9a24a] flex items-center justify-center text-[#c9a24a]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-heading uppercase">
                  Zola AI Assistant
                </h4>
                <span className="text-[10px] text-[#22c55e] flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  Online • Addis Ababa Workshop
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#a69c8f] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#171310]/80">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#c9a24a]/20 text-[#c9a24a] border border-[#c9a24a]/40 flex items-center justify-center shrink-0 text-[10px]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-[#c9a24a] text-black font-medium rounded-br-none'
                      : 'bg-[#29221c] text-[#f5f2ed] border border-[#3f342a] rounded-bl-none shadow-md'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-[#a69c8f]">
                <Bot className="w-3.5 h-3.5 text-[#c9a24a]" />
                <span className="italic">Zola Assistant is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="p-2 border-t border-[#342921] bg-[#1a1512] flex gap-1.5 overflow-x-auto no-scrollbar">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                className="text-[10px] text-[#c9a24a] bg-[#261e18] hover:bg-[#342a22] border border-[#44382e] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-[#342921] bg-[#201915] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about materials, delivery, sizes..."
              className="flex-1 bg-[#16120f] border border-[#3e3228] text-xs text-white rounded-full px-3.5 py-2 placeholder-[#6b5f51] focus:outline-none focus:border-[#c9a24a]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-full gold-btn disabled:opacity-40 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}

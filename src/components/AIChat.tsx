'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Bot, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const quickActions = [
  { label: 'Room Rent', icon: '🏠', query: 'What are the room types and rent details?' },
  { label: 'Facilities', icon: '✨', query: 'What facilities are available at the PG?' },
  { label: 'Food Menu', icon: '🍽', query: 'What is the food menu and meal schedule?' },
  { label: 'Contact', icon: '📞', query: 'What is the contact information and address?' },
  { label: 'Admission', icon: '📝', query: 'How can I apply for admission?' },
  { label: 'Rules', icon: '📋', query: 'What are the house rules and timings?' },
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Namaskara! Welcome to Sri Lakshmi Ladies PG. I can help you with room details, rent, food timings, facilities, admission process, and more. Ask me anything in English or Kannada!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError('');

    const apiMessages = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : 'Something went wrong';
      setError(errMsg);

      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact us at +91 98441 27319.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (query: string) => {
    sendMessage(query);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full shadow-[0_8px_30px_-4px_rgba(185,10,90,0.5)] hover:shadow-[0_12px_40px_-4px_rgba(185,10,90,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close chat' : 'Open AI assistant'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 sm:p-4"
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 px-4 py-3 sm:px-5"
            >
              <Bot size={20} />
              <span className="font-bold text-sm hidden sm:block">AI Assistant</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed z-50
                inset-x-4 bottom-20 top-16
                sm:inset-auto sm:bottom-24 sm:right-5 sm:w-[400px] sm:max-h-[calc(100vh-8rem)]
                bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100
                overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Bot className="text-white" size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Sri Lakshmi AI</h3>
                    <p className="text-[11px] text-white/70">
                      {isLoading ? 'Thinking...' : 'Online | English & Kannada'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4 space-y-3 bg-gray-50/50 min-h-0 overscroll-contain">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] px-3 py-2.5 sm:px-4 text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl rounded-br-md'
                          : 'bg-white text-gray-700 rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User size={12} className="text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot size={12} className="text-white" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="px-3 py-2.5 sm:px-4 sm:py-3 bg-white border-t border-gray-100 flex-shrink-0">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Quick Questions
                  </p>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => handleQuickAction(action.query)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-pink-50 text-pink-700 rounded-full hover:bg-pink-100 hover:text-pink-800 transition-colors border border-pink-100 whitespace-nowrap flex-shrink-0"
                      >
                        <span className="text-xs">{action.icon}</span>
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {error && (
                <div className="px-4 py-2 bg-red-50 border-t border-red-100 flex-shrink-0">
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="px-3 py-3 sm:px-4 bg-white border-t border-gray-100 flex gap-2 flex-shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about rooms, food, fees..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all placeholder:text-gray-400 disabled:opacity-50 min-w-0"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 sm:p-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:hover:shadow-none flex-shrink-0 active:scale-95"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

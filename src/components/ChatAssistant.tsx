'use client';
import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-brand text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center gap-2"
      >
        <MessageSquare size={24} />
        <span className="font-bold md:block hidden pr-2">AI Assistant</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 z-50 overflow-hidden flex flex-col"
          >
            <div className="bg-gradient-brand p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold">Sri Lakshmi AI</h3>
                <p className="text-xs text-white/80">Online | English & Kannada</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="h-[300px] bg-gray-50 p-4 flex flex-col gap-3 overflow-y-auto">
              <div className="bg-white p-3 rounded-2xl rounded-tl-sm w-[85%] text-sm text-gray-700 shadow-sm border border-gray-100">
                Hi! I am the AI assistant for Sri Lakshmi Ladies PG. You can ask me about room availability, rent details, or food timings in English or Kannada!
              </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
              />
              <button className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors shadow-md">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

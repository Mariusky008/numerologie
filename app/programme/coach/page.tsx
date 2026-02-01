'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  User, 
  Brain,
  Sparkles,
  ShieldAlert,
  ChevronLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function CoachChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Bonjour, je suis ton assistant de parcours. Je suis là pour t'aider à clarifier les exercices, reformuler les consignes ou t'encourager dans tes observations quotidiennes. Comment puis-je t'aider aujourd'hui ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUserId(session.user.id);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/programme/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content: userMessage }],
          context: { currentCycle: "Mois 1 - Observer ses automatismes" },
          userId: userId
        })
      });

      const data = await response.json();
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, j'ai rencontré une petite difficulté technique. Peux-tu reformuler ?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.4em]">
            <MessageSquare className="w-4 h-4" />
            COACH ASSISTANT
          </div>
          <h1 className="text-3xl font-serif font-bold italic">Besoin de clarté ?</h1>
        </div>
        
        <div className="p-4 bg-white/50 border border-[#1A1C2E]/5 rounded-3xl flex items-center gap-4 text-[#1A1C2E]/40">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest max-w-[200px] leading-tight">
            Accompagnement pédagogique uniquement (non thérapeutique)
          </span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-[60px] shadow-2xl border border-[#1A1C2E]/5 overflow-hidden flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 no-scrollbar">
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-[#1A1C2E] text-white' : 'bg-[#C9A24D] text-[#1A1C2E]'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
                </div>
                <div className={`p-6 rounded-[30px] text-lg font-light leading-relaxed ${msg.role === 'user' ? 'bg-[#1A1C2E] text-white rounded-tr-none' : 'bg-[#F8F9FA] text-[#1A1C2E] rounded-tl-none'}`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#C9A24D] text-[#1A1C2E] flex items-center justify-center">
                  <Brain className="w-5 h-5 animate-pulse" />
                </div>
                <div className="p-6 bg-[#F8F9FA] rounded-[30px] rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#C9A24D]/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-[#C9A24D]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-[#C9A24D]/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-8 bg-[#F8F9FA] border-t border-[#1A1C2E]/5">
          <div className="relative flex items-center gap-4">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pose ta question ici..."
              className="flex-1 bg-white border border-[#1A1C2E]/10 rounded-full py-6 px-10 text-lg focus:outline-none focus:border-[#C9A24D] transition-colors shadow-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl ${isLoading || !input.trim() ? 'bg-[#1A1C2E]/5 text-[#1A1C2E]/20' : 'bg-[#C9A24D] text-[#1A1C2E] hover:scale-110 active:scale-95'}`}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            <p className="text-[10px] font-bold text-[#1A1C2E]/20 uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldAlert className="w-3 h-3" />
              Réponses basées sur le cadre du programme
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

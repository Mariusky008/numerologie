'use client';

import { useRef, useEffect, useState } from 'react';
import { Send, Mic, User, Sparkles, Loader2, StopCircle, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PsyMirrorResult } from '@/lib/psy-mirror/types';

interface PsyCoachChatProps {
  psyResult: PsyMirrorResult;
}

// --- TTS HELPER ---
let audioQueue: HTMLAudioElement[] = [];
let isPlayingGlobal = false;

const playNextInQueue = () => {
  if (isPlayingGlobal || audioQueue.length === 0) return;
  isPlayingGlobal = true;
  const audio = audioQueue.shift()!;
  audio.play().catch(err => {
    console.error("Playback error:", err);
    isPlayingGlobal = false;
    playNextInQueue();
  });
  audio.onended = () => {
    isPlayingGlobal = false;
    playNextInQueue();
  };
};

const speakText = async (text: string, forceReset = false) => {
  if (forceReset) {
    audioQueue.forEach(a => { a.pause(); a.src = ""; });
    audioQueue = [];
    isPlayingGlobal = false;
    return;
  }
  const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}]/gu, '').replace(/\*/g, '').trim();
  if (!cleanText || cleanText.length < 2) return;
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText })
    });
    if (!response.ok) throw new Error("TTS failed");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioQueue.push(audio);
    playNextInQueue();
  } catch (err) {
    console.error("TTS Error:", err);
  }
};

// --- CUSTOM CHAT HOOK ---
function useCustomChat({ api, body, initialMessages, isMuted }: any) {
  const [messages, setMessages] = useState<any[]>(initialMessages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    speakText("", true);
    setIsSpeaking(false);
  };

  const append = async (message: any) => {
    speakText("", true);
    setIsSpeaking(false);
    setError(null);

    const newMessages = [...messages, message];
    setMessages(newMessages);
    setIsLoading(true);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, ...body }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error(`Erreur API: ${response.statusText}`);

      const reader = response.body?.getReader();
      if (!reader) return;

      const assistantMessage = { id: Date.now().toString(), role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let sentenceBuffer = "";
      if (!isMuted) setIsSpeaking(true);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        sentenceBuffer += text;
        
        const sentenceMatch = sentenceBuffer.match(/([.?!])\s+/);
        if (sentenceMatch && sentenceMatch.index !== undefined && !isMuted) {
           const endIdx = sentenceMatch.index + 1;
           const sentence = sentenceBuffer.substring(0, endIdx);
           sentenceBuffer = sentenceBuffer.substring(endIdx);
           speakText(sentence);
        }

        setMessages(prev => {
          const updated = [...prev];
          const lastMsgIndex = updated.length - 1;
          updated[lastMsgIndex].content += text;
          return updated;
        });
      }
      if (sentenceBuffer.trim() && !isMuted) speakText(sentenceBuffer);
    } catch (err: any) {
      if (err.name !== 'AbortError') setError(err.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
       if (isPlayingGlobal && !isSpeaking) setIsSpeaking(true);
       if (!isPlayingGlobal && isSpeaking && !isLoading) setIsSpeaking(false);
    }, 200);
    return () => clearInterval(interval);
  }, [isSpeaking, isLoading]);

  return { messages, append, isLoading, isSpeaking, error, stop };
}

export default function PsyCoachChat({ psyResult }: PsyCoachChatProps) {
  const [input, setInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, append, isLoading, isSpeaking, error, stop } = useCustomChat({
    api: '/api/psy-chat',
    body: { psyResult },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Bonjour. Je suis l'Oracle du Miroir. J'ai analysé tes choix et tes écarts. Je vois clair dans ton angle mort. Quelle partie de ton reflet souhaites-tu explorer avec moi ?`
      }
    ],
    isMuted
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = { role: 'user', content: input };
    setInput('');
    await append(userMessage);
  };

  const suggestions = [
    "Pourquoi ai-je cet angle mort ?",
    "Comment appliquer mon levier ?",
    "Explique-moi ma dimension 'Décision'",
    "Pourquoi mes actes diffèrent de ma perception ?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="flex flex-col h-[600px] w-full bg-[#08090F] rounded-[40px] shadow-2xl overflow-hidden border border-[#C9A24D]/10 relative">
      <div className="absolute inset-0 bg-[#0F0B15]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(91,75,138,0.2),_transparent_70%)]"></div>
      
      {/* HEADER */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#C9A24D] rounded-full animate-pulse"></div>
          <h3 className="text-[#FDFBF7] font-serif text-lg tracking-widest uppercase font-bold">L'Oracle du Miroir</h3>
        </div>
        <button 
          onClick={() => { setIsMuted(!isMuted); if (!isMuted) speakText("", true); }}
          className="p-2 rounded-full text-white/60 hover:text-[#C9A24D] transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col items-center justify-start relative z-10 px-6 pt-20 pb-24">
        <div className="w-full max-w-2xl flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-6" ref={messagesEndRef}>
            {messages.map((m, i) => (
              <motion.div
                key={m.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl ${
                  m.role === 'user' 
                    ? 'bg-[#C9A24D]/20 border border-[#C9A24D]/30 text-white' 
                    : 'bg-white/5 border border-white/10 text-[#FDFBF7] font-serif italic'
                }`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Loader2 className="w-5 h-5 text-[#C9A24D] animate-spin" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SUGGESTIONS */}
        {!isLoading && (
          <div className="w-full flex flex-wrap justify-center gap-2 mt-4">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => append({ role: 'user', content: s })}
                className="px-4 py-2 bg-white/5 hover:bg-[#C9A24D]/20 border border-white/10 rounded-xl text-xs text-white/70 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-50 bg-gradient-to-t from-[#0F0B15] to-transparent">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Interrogez votre reflet..."
            className="flex-1 bg-[#1F2235]/80 border border-[#C9A24D]/30 rounded-full px-6 py-3 text-white outline-none focus:border-[#C9A24D]"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 bg-[#C9A24D] text-[#1F2235] rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

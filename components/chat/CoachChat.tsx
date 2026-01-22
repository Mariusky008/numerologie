'use client';

import { useRef, useEffect, useState } from 'react';
import { Send, Mic, User, Sparkles, Loader2, StopCircle, Volume2, VolumeX, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoachChatProps {
  userId: string;
  userName: string;
}

// --- TTS HELPER ---
const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    // 1. Clean emojis and markdown artifacts
    const cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}]/gu, '')
      .replace(/\*/g, ''); // Remove bold markers

    // 2. Cancel ongoing speech
    window.speechSynthesis.cancel();

    // 3. Create Utterance
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.05; // Slightly faster for natural feel
    utterance.pitch = 1.0;
    
    // 4. Voice Selection (Prioritize Google or iOS voices)
    const voices = window.speechSynthesis.getVoices();
    // Priority: Google Français -> Thomas (iOS) -> Amelie (iOS) -> Any 'fr'
    const bestVoice = voices.find(v => v.name.includes("Google") && v.lang.includes("fr")) 
                   || voices.find(v => v.name === "Thomas")
                   || voices.find(v => v.name === "Amelie")
                   || voices.find(v => v.lang.includes("fr"));
    
    if (bestVoice) utterance.voice = bestVoice;

    window.speechSynthesis.speak(utterance);
  }
};

// --- CUSTOM CHAT HOOK ---
function useCustomChat({ api, body, initialMessages, onFinish }: any) {
  const [messages, setMessages] = useState<any[]>(initialMessages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track TTS status
  const abortControllerRef = useRef<AbortController | null>(null);

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const append = async (message: any) => {
    // Stop any current speech when user talks
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    const newMessages = [...messages, message];
    setMessages(newMessages);
    setIsLoading(true);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          ...body
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error(response.statusText);

      const reader = response.body?.getReader();
      if (!reader) return;

      const assistantMessage = { id: Date.now().toString(), role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let fullResponse = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        fullResponse += text;
        
        setMessages(prev => {
          const updated = [...prev];
          const lastMsgIndex = updated.length - 1;
          const lastMsg = { ...updated[lastMsgIndex] };
          lastMsg.content = lastMsg.content + text;
          updated[lastMsgIndex] = lastMsg;
          return updated;
        });
      }
      
      setIsLoading(false); // Text is ready
      
      // Speak (Auto)
      if (onFinish) {
        setIsSpeaking(true);
        // Small delay to ensure state update
        setTimeout(() => onFinish(fullResponse), 100);
      }

    } catch (err: any) {
      if (err.name !== 'AbortError') console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return { messages, append, isLoading, isSpeaking, stop };
}

// --- MAIN COMPONENT ---
export default function CoachChat({ userId, userName }: CoachChatProps) {
  const [input, setInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const { messages, append, isLoading, isSpeaking, stop } = useCustomChat({
    api: '/api/chat',
    body: { userId },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Bonjour ${userName}. Je suis l'Oracle. J'ai lu dans tes nombres. Quelle question hante ton esprit ?`
      }
    ],
    onFinish: (text: string) => {
      if (!isMuted) speakText(text);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setInput('');
    await append(userMessage);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // STT
  const startListening = () => {
    // Interruption logic: If speaking, stop it.
    if (isSpeaking || isLoading) {
      stop(); 
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setTimeout(() => {
              append({ role: 'user', content: transcript });
              setInput('');
         }, 500);
      };

      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      alert("Microphone non supporté sur ce navigateur.");
    }
  };

  const lastMessage = messages[messages.length - 1];
  const isOracle = lastMessage?.role === 'assistant';

  return (
    <div className="flex flex-col h-[700px] w-full max-w-md mx-auto bg-[#0F111A] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden border border-[#C9A24D]/20 relative font-sans">
      
      {/* 🌌 COSMIC BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1F2235] via-[#0F111A] to-black z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none z-0"></div>

      {/* 🔝 HEADER */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-30">
        <div className="flex flex-col">
           <h3 className="text-[#C9A24D] font-serif text-2xl tracking-widest drop-shadow-[0_2px_10px_rgba(201,162,77,0.3)]">L'ORACLE</h3>
           <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] mt-1">Lien Spirituel Actif</p>
        </div>
        <button 
          onClick={() => {
            const newMuted = !isMuted;
            setIsMuted(newMuted);
            if (newMuted) window.speechSynthesis.cancel();
          }}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-[#C9A24D]/60 transition-colors backdrop-blur-md border border-white/5"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* 🔮 CENTRAL VISUALIZATION */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-10">
        
        {/* ORB ANIMATION */}
        <div className="relative mb-10 scale-125">
           {/* Outer Rings */}
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#C9A24D]/10 rounded-full ${isLoading ? 'animate-spin-slow' : 'opacity-20'} transition-all duration-1000`}></div>
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-[#C9A24D]/20 rounded-full ${isLoading ? 'animate-reverse-spin' : 'opacity-30'} transition-all duration-1000`}></div>
           
           {/* Pulsing Aura */}
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#C9A24D] blur-[60px] ${isLoading || isSpeaking ? 'opacity-40 animate-pulse' : 'opacity-10'} transition-all duration-1000`}></div>

           {/* The Core */}
           <div className={`w-32 h-32 rounded-full bg-gradient-to-b from-[#2C2F4A] to-black border border-[#C9A24D]/50 shadow-[inset_0_0_30px_rgba(201,162,77,0.3)] flex items-center justify-center relative z-10 transition-transform duration-500 ${isLoading ? 'scale-105' : 'scale-100'}`}>
              
              {/* Inner Light */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-[#C9A24D]/20 to-transparent ${isLoading ? 'animate-spin' : ''}`}></div>
              
              {isLoading ? (
                 <Sparkles className="w-10 h-10 text-[#C9A24D] animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              ) : isSpeaking ? (
                 <Radio className="w-10 h-10 text-[#C9A24D] animate-pulse" />
              ) : (
                 <div className="w-3 h-3 bg-[#C9A24D] rounded-full shadow-[0_0_20px_#C9A24D] animate-pulse"></div>
              )}
           </div>
        </div>

        {/* 📜 SCROLLABLE TEXT AREA */}
        <div className="w-full relative group">
           {/* Fade Masks */}
           <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0F111A] to-transparent z-20 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0F111A] to-transparent z-20 pointer-events-none"></div>

           <div className="max-h-[220px] overflow-y-auto custom-scrollbar px-4 py-4 text-center relative z-10 scroll-smooth" ref={messagesEndRef}>
             <AnimatePresence mode='wait'>
               {messages.length > 0 ? (
                 <motion.div
                   key={messages.length}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="space-y-2"
                 >
                   {isOracle ? (
                     <div className="prose prose-invert prose-p:text-[#EAEAEA] prose-p:font-serif prose-p:text-lg prose-p:leading-relaxed mx-auto">
                        <p className="drop-shadow-md">{lastMessage.content}</p>
                     </div>
                   ) : (
                     <p className="text-white/40 text-sm italic font-light">
                       " {lastMessage.content} "
                     </p>
                   )}
                 </motion.div>
               ) : (
                 <p className="text-white/30 text-sm">Touchez l'orbe ou le micro pour commencer...</p>
               )}
             </AnimatePresence>
           </div>
        </div>

      </div>

      {/* 🎛 CONTROLS */}
      <div className="p-8 pb-10 z-30 flex flex-col items-center gap-6 bg-gradient-to-t from-[#0F111A] via-[#0F111A] to-transparent">
        
        {/* Hidden Input (Fallback) */}
        {!isListening && (
          <form onSubmit={handleSubmit} className="w-full max-w-xs relative opacity-40 hover:opacity-100 transition-opacity duration-300 focus-within:opacity-100">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Écrire ma question..."
              className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-[#C9A24D]/50 text-center placeholder:text-white/20 shadow-inner"
            />
          </form>
        )}

        {/* MAIN ACTION BUTTON */}
        <button
          onClick={startListening}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl relative group ${
            isListening 
              ? 'bg-red-500/20 border-red-500/50 scale-110' 
              : 'bg-white/5 hover:bg-[#C9A24D]/20 hover:border-[#C9A24D]/50 hover:scale-105'
          }`}
        >
          <div className={`absolute inset-0 rounded-full border border-white/5 ${isListening ? 'animate-ping' : ''}`}></div>
          
          {isListening ? (
            <StopCircle className="w-8 h-8 text-red-400" />
          ) : isLoading ? (
             <Loader2 className="w-8 h-8 text-[#C9A24D] animate-spin" />
          ) : (
            <Mic className="w-8 h-8 text-white group-hover:text-[#C9A24D] transition-colors" />
          )}
        </button>

        <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-light">
           {isListening ? "Écoute en cours..." : isLoading ? "Consultation des astres..." : "Touchez pour parler"}
        </p>
      </div>

    </div>
  );
}

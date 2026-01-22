'use client';

import { useRef, useEffect, useState } from 'react';
import { Send, Mic, User, Sparkles, Loader2, StopCircle, Volume2, VolumeX, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoachChatProps {
  userId: string;
  userName: string;
}

// --- TTS HELPER (Streaming Queue) ---
let speechQueue: string[] = [];
let isSpeakingGlobal = false;

const speakText = (text: string, forceReset = false) => {
  if (!('speechSynthesis' in window)) return;

  if (forceReset) {
    window.speechSynthesis.cancel();
    speechQueue = [];
    isSpeakingGlobal = false;
  }

  // 1. Clean emojis and markdown artifacts
  const cleanText = text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}]/gu, '')
    .replace(/\*/g, '')
    .trim();

  if (!cleanText) return;

  speechQueue.push(cleanText);
  processSpeechQueue();
};

const processSpeechQueue = () => {
  if (isSpeakingGlobal || speechQueue.length === 0) return;

  isSpeakingGlobal = true;
  const textToSpeak = speechQueue.shift()!;

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = 'fr-FR';
  utterance.rate = 1.0; // Slightly faster for flow
  utterance.pitch = 1.0;
  
  // Voice Selection
  const voices = window.speechSynthesis.getVoices();
  const bestVoice = voices.find(v => v.name.includes("Google") && v.lang.includes("fr")) 
                 || voices.find(v => v.name === "Amelie") 
                 || voices.find(v => v.lang.includes("fr"));
  if (bestVoice) utterance.voice = bestVoice;

  utterance.onend = () => {
    isSpeakingGlobal = false;
    processSpeechQueue(); // Next phrase
  };

  utterance.onerror = () => {
    isSpeakingGlobal = false;
    processSpeechQueue();
  };

  window.speechSynthesis.speak(utterance);
};

// --- CUSTOM CHAT HOOK ---
function useCustomChat({ api, body, initialMessages, onFinish, isMuted }: any) {
  const [messages, setMessages] = useState<any[]>(initialMessages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track TTS status
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setError(null);
  };

  const append = async (message: any) => {
    // Stop any current speech when user talks
    speakText("", true); // Force reset queue
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
        body: JSON.stringify({
          messages: newMessages,
          ...body
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        if (response.status === 404) throw new Error("Profil introuvable (Mauvais ID)");
        if (response.status === 500) throw new Error("Erreur serveur (Vérifier logs)");
        throw new Error(`Erreur API: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) return;

      const assistantMessage = { id: Date.now().toString(), role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let fullResponse = "";
      let sentenceBuffer = "";
      
      // Start Speaking mode immediately as we expect audio
      if (!isMuted) setIsSpeaking(true);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        fullResponse += text;
        sentenceBuffer += text;
        
        // STREAMING TTS LOGIC
        // Detect sentence endings (. ? ! ) followed by space or end of string
        // We use a regex that looks for punctuation
        const sentenceMatch = sentenceBuffer.match(/([.?!])\s+/);
        if (sentenceMatch && sentenceMatch.index !== undefined && !isMuted) {
           const endIdx = sentenceMatch.index + 1;
           const sentence = sentenceBuffer.substring(0, endIdx);
           sentenceBuffer = sentenceBuffer.substring(endIdx); // Keep the rest (punctuation included in sentence)
           
           speakText(sentence);
        }

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
      
      // Speak remaining buffer if any
      if (sentenceBuffer.trim() && !isMuted) {
         speakText(sentenceBuffer);
      }
      
      // We rely on the queue to handle isSpeaking state now, 
      // but we might want to keep the visual active until queue is empty?
      // For simplicity, let's keep visual active for a bit longer or until user interrupts.

    } catch (err: any) {
      if (err.name !== 'AbortError') {
         console.error("Chat error:", err);
         setError(err.message || "Une erreur est survenue");
         setIsSpeaking(false);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  // We need to sync isSpeaking state with the queue status
  useEffect(() => {
    const interval = setInterval(() => {
       if (isSpeakingGlobal && !isSpeaking) setIsSpeaking(true);
       if (!isSpeakingGlobal && isSpeaking && !isLoading) setIsSpeaking(false);
    }, 200);
    return () => clearInterval(interval);
  }, [isSpeaking, isLoading]);

  return { messages, append, isLoading, isSpeaking, error, stop };
}

// --- MAIN COMPONENT ---
export default function CoachChat({ userId, userName }: CoachChatProps) {
  const [input, setInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const { messages, append, isLoading, isSpeaking, error, stop } = useCustomChat({
    api: '/api/chat',
    body: { userId },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Bonjour ${userName}. Je suis l'Oracle. J'ai lu dans tes nombres. Quelle question hante ton esprit ?`
      }
    ],
    isMuted,
    onFinish: (text: string) => {
      // Legacy onFinish not used for TTS anymore, but useful for other things?
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
  const recognitionRef = useRef<any>(null); // Store recognition instance

  // Suggestions de questions
  const suggestions = [
    "Quel est mon défi actuel ?",
    "Parle-moi de ma vie sentimentale",
    "Quelle est ma mission de vie ?",
    "Que me réserve mon année personnelle ?"
  ];

  const handleSuggestionClick = (question: string) => {
    const userMessage = { role: 'user', content: question };
    append(userMessage);
  };

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // STT
  const startListening = () => {
    // If already listening, stop it manually
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

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
      
      recognitionRef.current = recognition; // Store ref

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setTimeout(() => {
              append({ role: 'user', content: transcript });
              setInput('');
         }, 500);
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };
      
      recognition.start();
    } else {
      alert("Microphone non supporté sur ce navigateur.");
    }
  };

  const lastMessage = messages[messages.length - 1];
  const isOracle = lastMessage?.role === 'assistant';

  return (
    <div className="flex flex-col h-[85vh] md:h-[800px] w-full max-w-5xl mx-auto bg-[#08090F] md:rounded-[40px] shadow-[0_20px_100px_-20px_rgba(201,162,77,0.3)] overflow-hidden border-y md:border border-[#C9A24D]/10 relative font-sans group">
      
      {/* 🌌 COSMIC BACKGROUND LAYERS */}
      <div className="absolute inset-0 bg-[#08090F]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(44,47,74,0.4),_transparent_70%)] opacity-60"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen animate-pulse-slow"></div>
      
      {/* SHOOTING STARS EFFECT (CSS only simulation) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-[ping_3s_infinite]"></div>
         <div className="absolute top-3/4 right-1/4 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_5px_white] animate-[ping_5s_infinite_1s]"></div>
      </div>

      {/* 🔝 HEADER */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-30">
        <div className="flex flex-col">
           <div className="flex items-center gap-2 mb-1">
             <div className="w-1.5 h-1.5 bg-[#C9A24D] rounded-full animate-pulse"></div>
             <h3 className="text-[#EAEAEA] font-serif text-lg tracking-[0.2em] uppercase opacity-80">L'Oracle</h3>
           </div>
           <p className="text-[#C9A24D]/60 text-[9px] uppercase tracking-[0.4em] pl-4 border-l border-[#C9A24D]/30">Connexion Établie</p>
        </div>
        <button 
          onClick={() => {
            const newMuted = !isMuted;
            setIsMuted(newMuted);
            if (newMuted) window.speechSynthesis.cancel();
          }}
          className="p-3 rounded-full text-white/40 hover:text-[#C9A24D] hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-[#C9A24D]/20"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* 🔮 CENTRAL VISUALIZATION */}
      <div className="flex-1 flex flex-col items-center justify-start relative z-10 px-6 pt-20 md:pt-12">
        
        {/* ORB ANIMATION COMPLEX - Slightly smaller & higher */}
        <div className="relative mb-8 scale-90 md:scale-100 transition-transform duration-700">
           
           {/* HEARTBEAT GLOW */}
           <motion.div 
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[80px] mix-blend-screen pointer-events-none"
             animate={{
               scale: [0.8, 1.2, 0.8],
               opacity: isLoading || isSpeaking ? [0.2, 0.5, 0.2] : [0.1, 0.2, 0.1],
               backgroundColor: ["#FCD34D", "#FB923C", "#FCD34D"]
             }}
             transition={{
               duration: isLoading || isSpeaking ? 2 : 4,
               repeat: Infinity,
               ease: "easeInOut"
             }}
           />

           {/* ASTROLABE RINGS */}
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-white/5 rounded-full ${isLoading ? 'animate-[spin_10s_linear_infinite]' : 'opacity-10'} transition-all duration-1000`}></div>
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border border-[#C9A24D]/10 rounded-full border-dashed ${isLoading ? 'animate-[spin_20s_linear_infinite_reverse]' : 'opacity-20'} transition-all duration-1000`}></div>
           
           {/* PULSING GLOW (Inner) */}
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#C9A24D] blur-[80px] mix-blend-screen ${isLoading || isSpeaking ? 'opacity-30 scale-110' : 'opacity-5 scale-90'} transition-all duration-1000 ease-in-out`}></div>

           {/* THE CORE SPHERE */}
           <div className={`w-28 h-28 rounded-full bg-gradient-to-b from-[#1F2235] to-[#000] border border-[#C9A24D]/30 shadow-[inset_0_4px_20px_rgba(201,162,77,0.2),_0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center relative z-10 overflow-hidden`}>
              
              {/* Liquid Light Effect */}
              <div className={`absolute inset-0 bg-gradient-to-tr from-[#C9A24D]/0 via-[#C9A24D]/10 to-[#C9A24D]/0 rotate-45 transform transition-transform duration-[2000ms] ${isLoading ? 'translate-x-full' : '-translate-x-full'}`}></div>
              
              {/* Center Icon */}
              <div className="relative z-20">
                {isLoading ? (
                   <Loader2 className="w-8 h-8 text-[#C9A24D] animate-spin opacity-80" />
                ) : isSpeaking ? (
                   <div className="flex gap-1 items-center h-6">
                      <div className="w-1 h-3 bg-[#C9A24D] rounded-full animate-[pulse_0.5s_ease-in-out_infinite]"></div>
                      <div className="w-1 h-5 bg-[#C9A24D] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.1s]"></div>
                      <div className="w-1 h-4 bg-[#C9A24D] rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.2s]"></div>
                   </div>
                ) : (
                   <Sparkles className="w-8 h-8 text-[#C9A24D]/60 animate-pulse duration-[3000ms]" />
                )}
              </div>
           </div>
        </div>

        {/* 📜 SCROLLABLE TEXT AREA - Centered and clear of overlaps */}
        <div className="w-full relative max-w-3xl mx-auto z-20 px-4 flex-1 flex flex-col justify-start">
           
           <div className="max-h-[30vh] md:max-h-[300px] overflow-y-auto custom-scrollbar px-6 py-6 text-center relative z-10 scroll-smooth bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl" ref={messagesEndRef}>
             <AnimatePresence mode='wait'>
               {error ? (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 text-sm"
                 >
                   ⚠️ {error}
                   <br/>
                   <button onClick={() => window.location.reload()} className="underline mt-2 text-xs">Recharger la page</button>
                 </motion.div>
               ) : messages.length > 0 ? (
                 <motion.div
                   key={messages.length}
                   initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                   animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                   className="space-y-6"
                 >
                   {isOracle ? (
                     <div className="prose prose-invert max-w-none">
                        <p className="text-[#FDFBF7] font-serif text-xl md:text-3xl leading-relaxed drop-shadow-lg tracking-wide font-medium">
                          {lastMessage.content}
                        </p>
                     </div>
                   ) : (
                     <p className="text-white/60 text-base md:text-lg font-light tracking-wide italic bg-white/5 inline-block px-6 py-3 rounded-full border border-white/5">
                       "{lastMessage.content}"
                     </p>
                   )}
                 </motion.div>
               ) : (
                 <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="text-[#C9A24D] text-sm uppercase tracking-[0.2em] font-bold"
                 >
                    L'Oracle vous écoute...
                 </motion.p>
               )}
             </AnimatePresence>
           </div>
        </div>

        {/* 🔮 SUGGESTIONS (Inside Container, Bottom) */}
        <AnimatePresence>
          {!isLoading && !isListening && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="w-full max-w-4xl mx-auto px-6 pb-8 z-20 flex flex-wrap justify-center gap-3 relative"
            >
              {suggestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(q)}
                  className="px-6 py-3 bg-white/5 hover:bg-[#C9A24D]/20 border border-white/10 hover:border-[#C9A24D]/50 rounded-full text-sm md:text-base text-white/80 hover:text-white transition-all backdrop-blur-md shadow-lg"
                >
                  {q}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 🎙️ FLOATING MICROPHONE BUTTON (FIXED TO SCREEN BOTTOM) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
        
        {/* Hidden Input (Fallback - Hover to reveal) */}
        {!isListening && (
          <form onSubmit={handleSubmit} className="w-[200px] absolute -top-12 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-all duration-300">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Écrire..."
              className="w-full bg-black/50 backdrop-blur border-b border-white/20 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A24D] text-center rounded-t-lg"
            />
          </form>
        )}

        <button
          onClick={startListening}
          className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-500 relative group ${
            isListening 
              ? 'bg-red-900/40 scale-110 shadow-[0_0_60px_rgba(220,38,38,0.5)] border border-red-500/30' 
              : 'bg-[#1F2235] hover:bg-[#2C2F4A] hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5'
          }`}
        >
          {/* Glowing Ring */}
          <div className={`absolute inset-0 rounded-full border border-[#C9A24D]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-125`}></div>
          
          {isListening ? (
            <StopCircle className="w-8 h-8 text-red-400" />
          ) : isLoading ? (
             <Loader2 className="w-8 h-8 text-[#C9A24D] animate-spin" />
          ) : (
            <Mic className="w-8 h-8 text-[#EAEAEA] group-hover:text-[#C9A24D] transition-colors" />
          )}
        </button>
      </div>

    </div>
  );
}

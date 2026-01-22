'use client';

import { useRef, useEffect, useState } from 'react';
import { Send, Mic, User, Sparkles, Loader2, StopCircle, Volume2, VolumeX } from 'lucide-react';

interface CoachChatProps {
  userId: string;
  userName: string;
}

// Helper for TTS
const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Try to find a good French voice
    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find(v => v.lang.includes('fr') && v.name.includes('Google')) || voices.find(v => v.lang.includes('fr'));
    if (frVoice) utterance.voice = frVoice;

    window.speechSynthesis.speak(utterance);
  }
};

// Custom hook to replace flaky @ai-sdk/react useChat
function useCustomChat({ api, body, initialMessages, onFinish }: any) {
  const [messages, setMessages] = useState<any[]>(initialMessages || []);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      window.speechSynthesis.cancel();
    }
  };

  const append = async (message: any) => {
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
          // IMPORTANT: Create a copy of the last message to avoid StrictMode double-mutation issues
          const lastMsgIndex = updated.length - 1;
          const lastMsg = { ...updated[lastMsgIndex] };
          
          lastMsg.content = lastMsg.content + text; // Append to copy
          updated[lastMsgIndex] = lastMsg; // Replace in array
          
          return updated;
        });
      }
      
      // Speak the full response when done
      if (onFinish) onFinish(fullResponse);

    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error("Chat error:", err);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return { messages, append, isLoading, stop };
}

export default function CoachChat({ userId, userName }: CoachChatProps) {
  // Manual input management
  const [input, setInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  // Use Custom Chat Hook
  const { messages, append, isLoading, stop } = useCustomChat({
    api: '/api/chat',
    body: { userId },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Bonjour ${userName}, je suis ton Coach Numérologue. J'ai analysé ton thème. Quelle question te préoccupe en ce moment ?`
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
    setInput(''); // Clear input immediately
    
    // Use append (custom hook always has append)
    await append(userMessage);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech to Text Logic (Browser Native)
  const startListening = () => {
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
        
        // Auto submit after voice
         setTimeout(() => {
              append({ role: 'user', content: transcript });
              setInput('');
         }, 800);
      };

      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      alert("La reconnaissance vocale n'est pas supportée par votre navigateur.");
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto bg-[#1a1c2e] rounded-3xl shadow-2xl overflow-hidden border border-[#C9A24D]/30 relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#2C2F4A]/0 via-[#2C2F4A]/0 to-[#1a1c2e] pointer-events-none"></div>

      {/* Header Minimaliste */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20">
        <div className="flex flex-col">
           <h3 className="text-[#C9A24D] font-serif text-xl tracking-wide">L'Oracle</h3>
           <p className="text-white/40 text-[10px] uppercase tracking-widest">Connecté à votre âme</p>
        </div>
        <button 
          onClick={() => {
            const newMuted = !isMuted;
            setIsMuted(newMuted);
            if (newMuted) window.speechSynthesis.cancel();
          }}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/60 transition-colors backdrop-blur-md"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* ZONE CENTRALE : VISUALISATION */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
        
        {/* L'ORBE */}
        <div className="relative mb-12">
           {/* Anneaux Pulsants */}
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#C9A24D]/20 rounded-full ${isLoading ? 'animate-ping' : ''} opacity-20`}></div>
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#C9A24D]/30 rounded-full ${isLoading ? 'animate-pulse' : ''} opacity-30 delay-100`}></div>
           
           {/* Coeur de l'Orbe */}
           <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B4B8A] shadow-[0_0_50px_rgba(201,162,77,0.4)] flex items-center justify-center relative transition-all duration-1000 ${isLoading ? 'scale-110 shadow-[0_0_80px_rgba(201,162,77,0.6)]' : 'scale-100'}`}>
              <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay animate-spin-slow"></div>
              {isLoading ? (
                 <Sparkles className="w-12 h-12 text-white animate-pulse" />
              ) : (
                 <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
              )}
           </div>
        </div>

        {/* Dernier Message (Sous-titres) */}
        <div className="min-h-[100px] w-full text-center space-y-4">
           {messages.length > 0 && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               {messages[messages.length - 1].role === 'assistant' ? (
                 <p className="text-white/90 text-lg md:text-xl font-serif leading-relaxed drop-shadow-md">
                   "{messages[messages.length - 1].content}"
                 </p>
               ) : (
                 <p className="text-white/40 text-sm italic">
                   Vous : {messages[messages.length - 1].content}
                 </p>
               )}
             </div>
           )}
           {messages.length === 0 && (
             <p className="text-white/50 text-sm">Touchez le micro pour parler...</p>
           )}
        </div>

      </div>

      {/* CONTROLS (Bas de page) */}
      <div className="p-6 pb-8 z-20">
        
        {/* Input Text (Discret, pour fallback) */}
        {!isListening && (
          <form onSubmit={handleSubmit} className="mb-4 relative opacity-50 hover:opacity-100 transition-opacity">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Écrire une question..."
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A24D]/50 text-center placeholder:text-white/20"
            />
          </form>
        )}

        {/* Gros Bouton Micro */}
        <div className="flex justify-center items-center gap-6">
           <button
             onClick={startListening}
             disabled={isLoading}
             className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
               isListening 
                 ? 'bg-red-500/80 scale-110 shadow-[0_0_30px_rgba(239,68,68,0.5)]' 
                 : 'bg-white/10 hover:bg-[#C9A24D] hover:scale-105 border border-white/20 backdrop-blur-md'
             } disabled:opacity-50 disabled:cursor-not-allowed`}
           >
             {isListening ? (
               <StopCircle className="w-8 h-8 text-white animate-pulse" />
             ) : (
               <Mic className="w-8 h-8 text-white" />
             )}
           </button>
        </div>
        
        <p className="text-center text-[10px] text-white/20 mt-6 uppercase tracking-widest">
           Oracle IA • Session Privée 30 min
        </p>
      </div>

      {/* Historique Masqué (Debug/Scroll) */}
      <div className="hidden">
        {messages.map((m: any) => m.content)}
        <div ref={messagesEndRef} />
      </div>

    </div>
  );
}

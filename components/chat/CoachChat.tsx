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
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
      
      {/* Header */}
      <div className="bg-[#2C2F4A] p-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C9A24D] flex items-center justify-center border-2 border-white/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-serif font-bold text-lg">Votre Guide Personnel</h3>
            <p className="text-white/60 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              En ligne - Connexion au thème établie
            </p>
          </div>
        </div>
        
        {/* Mute Toggle */}
        <button 
          onClick={() => {
            const newMuted = !isMuted;
            setIsMuted(newMuted);
            if (newMuted) window.speechSynthesis.cancel();
          }}
          className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title={isMuted ? "Activer la voix" : "Couper la voix"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Debug Info (Removed) */}
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAF9F7]">
        {messages.map((m: any) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-stone-200' : 'bg-[#2C2F4A]'}`}>
              {m.role === 'user' ? <User className="w-4 h-4 text-stone-500" /> : <Sparkles className="w-4 h-4 text-[#C9A24D]" />}
            </div>
            
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              m.role === 'user' 
                ? 'bg-white text-stone-800 rounded-tr-none border border-stone-100' 
                : 'bg-[#2C2F4A] text-white/90 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-[#2C2F4A] flex items-center justify-center shrink-0">
               <Loader2 className="w-4 h-4 text-[#C9A24D] animate-spin" />
             </div>
             <div className="text-xs text-stone-400 italic mt-2">
               Le guide analyse vos nombres...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-200">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
          <input
            name="chat-input"
            value={input}
            onChange={handleInputChange}
            placeholder="Posez votre question ici..."
            className="flex-1 p-4 pr-12 rounded-full bg-stone-100 border border-stone-200 focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] transition-all text-stone-700"
            disabled={isLoading}
          />
          
          <button
            type="button"
            onClick={startListening}
            className={`absolute right-16 p-2 rounded-full transition-colors ${isListening ? 'bg-red-50 text-red-500 animate-pulse' : 'text-stone-400 hover:text-[#C9A24D]'}`}
            title="Parler"
          >
            <Mic className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-4 bg-[#C9A24D] text-white rounded-full hover:bg-[#b08d42] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            {isLoading ? <StopCircle onClick={stop} className="w-5 h-5" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
        <p className="text-center text-[10px] text-stone-400 mt-2">
          Mode Coach Numérologique • Basé sur votre thème natal • Limité à 30 minutes
        </p>
      </div>
    </div>
  );
}

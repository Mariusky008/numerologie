'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';
import { Send, Mic, User, Sparkles, Loader2, StopCircle } from 'lucide-react';

interface CoachChatProps {
  userId: string; // The ID of the book request to fetch context
  userName: string;
}

export default function CoachChat({ userId, userName }: CoachChatProps) {
  // Manual input management for compatibility with latest AI SDK
  const [input, setInput] = useState('');

  // AI Chat Hook
  const { messages, append, status, stop, isLoading: sdkLoading } = useChat({
    api: '/api/chat',
    body: { userId },
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Bonjour ${userName}, je suis ton Coach Numérologue. J'ai analysé ton thème. Quelle question te préoccupe en ce moment ?`
      }
    ]
  } as any) as any; 

  // Derived loading state (support both status and legacy isLoading)
  const isLoading = sdkLoading || status === 'streaming' || status === 'submitted';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setInput(''); // Clear input immediately
    
    // Use append if available (legacy/standard), otherwise try sendMessage (new SDK)
    if (append) {
      await append(userMessage);
    } else {
      // Fallback or error handling if SDK is too new/different
      console.error("Chat SDK missing 'append' method");
    }
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
             if (append) {
                 append({ role: 'user', content: transcript });
                 setInput('');
             }
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
      <div className="bg-[#2C2F4A] p-4 flex items-center gap-3 shadow-md z-10">
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

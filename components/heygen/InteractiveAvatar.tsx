'use client';

import { useEffect, useRef, useState } from 'react';
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
  VoiceEmotion,
} from '@heygen/streaming-avatar';
import { Mic, MicOff, MessageSquare, X, Loader2 } from 'lucide-react';

// Default configuration
const AVATAR_ID = 'Angela_in_Black_Skirt_Standing_20220926'; // Same as video
const VOICE_ID = '13500366a7074360aa62939d3752670a'; // Same as video (Denise)

export default function InteractiveAvatar() {
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [debug, setDebug] = useState<string>('Prêt à démarrer');
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [textInput, setTextInput] = useState('');

  const avatar = useRef<StreamingAvatar | null>(null);
  const mediaStream = useRef<HTMLVideoElement>(null);

  // Initialize Session
  async function startSession() {
    setIsLoading(true);
    setDebug('Initialisation...');

    try {
      // 1. Get Access Token from our backend
      const res = await fetch('/api/heygen-token', { method: 'POST' });
      const data = await res.json();
      
      if (!data.token) throw new Error('Impossible de récupérer le token d\'accès');

      // 2. Init SDK
      avatar.current = new StreamingAvatar({
        token: data.token,
      });

      // 3. Setup Event Listeners
      avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
        setDebug('Flux vidéo prêt !');
        if (event.detail && mediaStream.current) {
          mediaStream.current.srcObject = event.detail;
          mediaStream.current.onloadedmetadata = () => {
            mediaStream.current!.play().catch(console.error);
          };
        }
      });

      avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        setDebug('Session terminée.');
        endSession();
      });
      
      avatar.current.on(StreamingEvents.USER_START, () => setIsUserTalking(true));
      avatar.current.on(StreamingEvents.USER_STOP, () => setIsUserTalking(false));

      // 4. Start Avatar Session
      setDebug('Démarrage de l\'avatar...');
      await avatar.current.createStartAvatar({
        quality: AvatarQuality.Medium,
        avatarName: AVATAR_ID,
        // knowledgeId: "YOUR_KNOWLEDGE_BASE_ID", // Optional: Add Knowledge Base ID here if created in HeyGen Labs
        voice: {
          voiceId: VOICE_ID,
          rate: 1.0, // Normal speed for conversation
          emotion: VoiceEmotion.FRIENDLY,
        },
        language: 'fr', // French language
        disableIdleTimeout: true,
      });

      setDebug('Session active. Dites bonjour !');
      setIsLoading(false);

    } catch (error) {
      console.error(error);
      setDebug('Erreur: ' + (error as Error).message);
      setIsLoading(false);
    }
  }

  // End Session
  async function endSession() {
    if (avatar.current) {
      await avatar.current.stopAvatar();
      avatar.current = null;
    }
    setStream(null);
    if (mediaStream.current) {
      mediaStream.current.srcObject = null;
    }
    setDebug('Session fermée');
  }

  // Send Text Message
  async function handleSendMessage() {
    if (!avatar.current || !textInput.trim()) return;
    
    try {
      await avatar.current.speak({
        text: textInput,
        task_type: TaskType.TALK, // LLM processing (needs Knowledge Base ID if not simple repeat)
      });
      setTextInput('');
    } catch (e) {
      console.error(e);
    }
  }

  // Toggle Voice Chat (Microphone)
  async function startVoiceChat() {
    if (!avatar.current) return;
    try {
      await avatar.current.startVoiceChat();
      setDebug('Mode vocal activé. Parlez...');
    } catch (e) {
      console.error(e);
    }
  }

  async function stopVoiceChat() {
    if (!avatar.current) return;
    try {
      await avatar.current.closeVoiceChat();
      setDebug('Mode vocal désactivé.');
    } catch (e) {
      console.error(e);
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 bg-black rounded-xl overflow-hidden shadow-2xl border border-stone-800">
      
      {/* Video Area */}
      <div className="relative w-full aspect-video bg-stone-900 rounded-lg overflow-hidden flex items-center justify-center">
        <video
          ref={mediaStream}
          autoPlay
          playsInline
          className="w-full h-full object-contain"
        />
        
        {!avatar.current && !isLoading && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white">
             <p className="mb-6 text-xl font-serif text-stone-200">Discutez en direct avec votre Guide</p>
             <button 
               onClick={startSession}
               className="px-8 py-4 bg-[#C9A24D] text-[#2C2F4A] rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(201,162,77,0.3)]"
             >
               Démarrer la conversation
             </button>
           </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
            <Loader2 className="w-12 h-12 animate-spin text-[#C9A24D] mb-4" />
            <p className="text-sm font-mono text-[#C9A24D]/80">{debug}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      {avatar.current && (
        <div className="w-full mt-6 space-y-4">
           
           {/* Status Bar */}
           <div className="flex justify-between items-center text-xs font-mono text-stone-500 px-2">
              <span>Status: {debug}</span>
              <button onClick={endSession} className="text-red-500 hover:text-red-400 flex items-center gap-1">
                <X className="w-3 h-3" /> Terminer
              </button>
           </div>

           {/* Input Area */}
           <div className="flex gap-3">
              <input 
                type="text" 
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question ici..."
                className="flex-1 bg-stone-800 border border-stone-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-[#C9A24D]"
              />
              <button 
                onClick={handleSendMessage}
                className="p-3 bg-stone-700 text-white rounded-lg hover:bg-stone-600 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              
              {/* Voice Toggle (To be implemented properly with permission handling) */}
              <button 
                onClick={startVoiceChat}
                className="p-3 bg-[#C9A24D] text-[#2C2F4A] rounded-lg hover:bg-[#b08d42] transition-colors"
                title="Activer le micro"
              >
                <Mic className="w-5 h-5" />
              </button>
           </div>
        </div>
      )}
    </div>
  );
}

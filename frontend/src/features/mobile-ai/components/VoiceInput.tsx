import React, { useState, useEffect } from 'react';

export const VoiceInput: React.FC<{ onResult: (text: string) => void }> = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };
      
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      
      setRecognition(rec);
    }
  }, [onResult]);

  const toggleListen = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  if (!recognition) return null;

  return (
    <button
      onClick={toggleListen}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors \${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-transparent text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
      aria-label="Voice Input"
    >
      🎤
    </button>
  );
};

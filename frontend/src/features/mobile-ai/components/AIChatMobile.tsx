import React, { useState } from 'react';
import { useMobileAI } from '../hooks/useMobileAI';
import { VoiceInput } from './VoiceInput';

export const AIChatMobile: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Hello! I am your AI Study Companion. You can type or speak your questions.' }
  ]);
  const [input, setInput] = useState('');
  const { processVoice } = useMobileAI();

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    // Simulate AI response stream
    const currentInput = input;
    setInput('');
    
    processVoice.mutate({ sessionId: 'chat_sess', text: currentInput }, {
      onSuccess: (data) => {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    });
  };

  const handleVoiceInput = (text: string) => {
     setMessages(prev => [...prev, { role: 'user', content: text }]);
     processVoice.mutate({ sessionId: 'voice_sess', text }, {
      onSuccess: (data) => {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 \${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {processVoice.isPending && (
          <div className="flex justify-start">
             <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-none p-3 px-4 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
             </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full p-1 pl-4 pr-1">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask something..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white"
          />
          <VoiceInput onResult={handleVoiceInput} />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center disabled:opacity-50 transition-opacity"
          >
            ↗
          </button>
        </div>
      </div>
    </div>
  );
};

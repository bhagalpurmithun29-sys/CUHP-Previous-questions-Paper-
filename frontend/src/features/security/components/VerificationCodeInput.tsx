import React, { useState, useRef, useEffect } from 'react';

interface VerificationCodeInputProps {
  onComplete: (code: string) => void;
  isLoading?: boolean;
}

export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({ onComplete, isLoading }) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    if (value.length > 1) {
      // Handle paste
      const pasted = value.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newCode[i] = pasted[i] || '';
      }
      setCode(newCode);
      const nextIndex = Math.min(pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      
      // Auto advance
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    if (newCode.every(v => v !== '')) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      {code.map((value, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={value}
          disabled={isLoading}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          className="w-10 h-12 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all disabled:opacity-50"
        />
      ))}
    </div>
  );
};

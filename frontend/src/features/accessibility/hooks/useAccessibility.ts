import { useState, useEffect } from 'react';

export const useAccessibility = () => {
  const [preferences, setPreferences] = useState({
    highContrast: false,
    textScale: 1, // 1 is normal, 1.2 is large, etc.
    reducedMotion: false,
    screenReaderOptimized: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('a11y_prefs');
    if (saved) {
      setPreferences(JSON.parse(saved));
    } else {
      // Check OS level preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setPreferences(prev => ({ ...prev, reducedMotion: prefersReducedMotion }));
    }
  }, []);

  const updatePreference = (key: string, value: any) => {
    const updated = { ...preferences, [key]: value };
    setPreferences(updated);
    localStorage.setItem('a11y_prefs', JSON.stringify(updated));
    applyToDom(updated);
  };

  const applyToDom = (prefs: any) => {
    const root = document.documentElement;
    if (prefs.highContrast) root.classList.add('high-contrast');
    else root.classList.remove('high-contrast');

    if (prefs.reducedMotion) root.classList.add('reduced-motion');
    else root.classList.remove('reduced-motion');

    root.style.fontSize = `\${prefs.textScale * 100}%`;
  };

  return { preferences, updatePreference };
};

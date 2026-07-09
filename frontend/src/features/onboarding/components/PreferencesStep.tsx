import React from 'react';
import { useForm } from 'react-hook-form';

export const PreferencesStep: React.FC<{ onNext: (data: any) => void; initialData?: any }> = ({ onNext, initialData }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData || { theme: 'system', language: 'en' }
  });

  const onSubmit = (data: any) => {
    onNext({ preferencesData: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Set Your Preferences</h2>
        <p className="text-muted-foreground">Customize how the platform looks and behaves for you.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {['light', 'dark', 'system'].map((theme) => (
              <label key={theme} className="cursor-pointer">
                <input type="radio" value={theme} {...register('theme')} className="sr-only peer" />
                <div className="p-3 text-center rounded-xl border-2 border-border peer-checked:border-primary peer-checked:bg-primary/5 capitalize font-medium text-sm transition-all">
                  {theme}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select 
            {...register('language')}
            className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="en">English (US)</option>
            <option value="hi">Hindi (हिंदी)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-border mt-8 gap-3">
        <button type="button" onClick={() => onNext({ skipped: true })} className="px-6 py-3 bg-muted/50 text-foreground font-semibold rounded-xl hover:bg-muted">
          Skip
        </button>
        <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl">
          Continue
        </button>
      </div>
    </form>
  );
};

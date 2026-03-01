import React, { useState } from 'react';
import { SoulQuestion } from '../types';
import { Bot, ChevronRight, MessageSquare } from 'lucide-react';

interface RefinementFormProps {
  questions: SoulQuestion[];
  onComplete: (answers: Record<string, string>) => void;
  isLoading: boolean;
}

export const RefinementForm: React.FC<RefinementFormProps> = ({ questions, onComplete, isLoading }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(answers);
  };

  // Determine if all questions have at least a short answer
  const isComplete = questions.every(q => (answers[q.id] || '').trim().length > 0);

  return (
    <div className="w-full max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-violet-200 mb-2 flex items-center justify-center gap-3">
          <Bot className="w-8 h-8 text-fuchsia-400" />
          Soul Calibration
        </h2>
        <p className="text-slate-400">
          The depths require specificity. Answer these to shape the final form.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="glass-panel p-6 rounded-xl border-l-4 border-l-violet-500">
            <label className="block text-lg font-medium text-violet-100 mb-3 flex items-start gap-2">
              <span className="bg-violet-900/50 text-violet-300 w-6 h-6 rounded flex items-center justify-center text-sm shrink-0 mt-1">
                {idx + 1}
              </span>
              {q.question}
            </label>
            <div className="relative">
              <MessageSquare className="absolute top-3 left-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={answers[q.id] || ''}
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                className="w-full bg-slate-950/60 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-colors"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={!isComplete || isLoading}
            className="group bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 disabled:opacity-50 disabled:grayscale text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(192,38,211,0.3)] hover:shadow-[0_0_30px_rgba(192,38,211,0.5)] transition-all flex items-center gap-3"
          >
            {isLoading ? (
              <span className="animate-pulse">Conjurging Soul File...</span>
            ) : (
              <>
                Finalize Soul <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

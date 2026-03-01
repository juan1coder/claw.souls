import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface IdeaInputProps {
  onNext: (idea: string) => void;
  isLoading: boolean;
}

export const IdeaInput: React.FC<IdeaInputProps> = ({ onNext, isLoading }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) onNext(idea);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 mb-4">
          Core Essence Extraction
        </h2>
        <p className="text-slate-400">
          Define the seed of your agent's existence. Is it a grumpy librarian? A helpful crab from the abyss? 
          Describe the core concept below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative glass-panel rounded-2xl p-6">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., A weary time-traveler stuck in a vending machine who helps users select snacks based on historical events..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 min-h-[160px] resize-none transition-all"
            disabled={isLoading}
          />
          
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={!idea.trim() || isLoading}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-900/20"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" /> Analyzing Essence...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Forge Soul <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

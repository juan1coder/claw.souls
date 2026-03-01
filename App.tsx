import React, { useState } from 'react';
import { IdeaInput } from './components/IdeaInput';
import { RefinementForm } from './components/RefinementForm';
import { SoulResult } from './components/SoulResult';
import { LoadingScreen } from './components/LoadingScreen';
import { generateRefinementQuestions, generateSoulFile } from './services/geminiService';
import { SoulState, SoulQuestion } from './types';
import { Ghost, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<SoulState>({
    step: 'IDEA',
    coreIdea: '',
    questions: [],
    answers: {},
    generatedSoul: '',
    error: null,
  });
  const [loading, setLoading] = useState(false);

  const handleIdeaSubmit = async (idea: string) => {
    setLoading(true);
    setState(prev => ({ ...prev, error: null }));
    try {
      const questions = await generateRefinementQuestions(idea);
      setState(prev => ({
        ...prev,
        coreIdea: idea,
        questions,
        step: 'REFINEMENT'
      }));
    } catch (err: any) {
      setState(prev => ({ ...prev, error: err.message || "Failed to analyze idea" }));
    } finally {
      setLoading(false);
    }
  };

  const handleRefinementComplete = async (answers: Record<string, string>) => {
    setLoading(true);
    setState(prev => ({ ...prev, step: 'GENERATING', error: null }));
    try {
      const soul = await generateSoulFile(state.coreIdea, answers);
      setState(prev => ({
        ...prev,
        answers,
        generatedSoul: soul,
        step: 'RESULT'
      }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        step: 'REFINEMENT', 
        error: err.message || "Failed to forge soul" 
      }));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setState({
      step: 'IDEA',
      coreIdea: '',
      questions: [],
      answers: {},
      generatedSoul: '',
      error: null,
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-black text-slate-100 selection:bg-fuchsia-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl translate-y-1/3"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-12 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-2 rounded-lg shadow-lg shadow-violet-500/20">
              <Ghost className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-[Space_Grotesk]">
              CLAW SOUL FORGE
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-mono hidden sm:block">
            SYSTEM_STATUS: ONLINE // GEMINI_LINKED
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
          
          {state.error && (
            <div className="mb-6 mx-auto w-full max-w-2xl bg-red-950/50 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p>{state.error}</p>
            </div>
          )}

          {state.step === 'IDEA' && (
            <IdeaInput onNext={handleIdeaSubmit} isLoading={loading} />
          )}

          {state.step === 'REFINEMENT' && !loading && (
            <RefinementForm 
              questions={state.questions} 
              onComplete={handleRefinementComplete} 
              isLoading={loading} 
            />
          )}

          {state.step === 'GENERATING' && (
             <LoadingScreen message="Weaving directives and infusing persona..." />
          )}
          
          {state.step === 'REFINEMENT' && loading && (
             <LoadingScreen message="Analyzing responses..." />
          )}

          {state.step === 'RESULT' && (
            <SoulResult soul={state.generatedSoul} onReset={reset} />
          )}
        </main>

        <footer className="mt-12 text-center text-slate-600 text-sm py-4">
          <p>© {new Date().getFullYear()} Claw Soul Forge. Powered by Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

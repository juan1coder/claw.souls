import React from 'react';
import { Copy, Download, RefreshCw, FileText } from 'lucide-react';

interface SoulResultProps {
  soul: string;
  onReset: () => void;
}

export const SoulResult: React.FC<SoulResultProps> = ({ soul, onReset }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(soul);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([soul], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "claw_soul_directive.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300 flex items-center gap-2">
            <FileText className="text-fuchsia-500" />
            Soul Manifested
          </h2>
          <p className="text-sm text-slate-400">Ready for injection into agent runtime.</p>
        </div>
        <div className="flex gap-2">
           <button
            onClick={onReset}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Create New Soul"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-[400px] glass-panel rounded-xl overflow-hidden flex flex-col border border-fuchsia-500/30 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-700">
           <span className="text-xs font-mono text-fuchsia-400 uppercase tracking-widest">plaintext // utf-8</span>
           <div className="flex gap-2">
             <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-violet-200 rounded-md transition-colors"
             >
               <Copy className="w-4 h-4" />
               {copied ? 'Copied!' : 'Copy'}
             </button>
             <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-violet-700 hover:bg-violet-600 text-white rounded-md transition-colors"
             >
               <Download className="w-4 h-4" />
               Download
             </button>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative bg-slate-950 p-6 overflow-auto">
            <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
                {soul}
            </pre>
        </div>
      </div>
      
      <div className="mt-8 text-center">
         <p className="text-slate-500 text-sm italic font-mono">
             "The shell is temporal, but the directives are eternal."
         </p>
      </div>
    </div>
  );
};

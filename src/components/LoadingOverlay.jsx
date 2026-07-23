import { Atom } from 'lucide-react';

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass-strong p-10 rounded-2xl flex flex-col items-center gap-6 max-w-sm mx-4">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/30" style={{ animation: 'quantum-spin 3s linear infinite' }} />
          <div className="absolute inset-3 rounded-full border-2 border-indigo-500/40 border-dashed" style={{ animation: 'quantum-spin 2s linear infinite reverse' }} />
          <div className="absolute inset-6 rounded-full border border-violet-400/30" style={{ animation: 'quantum-spin 4s linear infinite' }} />

          <div className="absolute w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" style={{ animation: 'orbit 2s linear infinite', top: '50%', left: '50%', marginTop: '-6px', marginLeft: '-6px' }} />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50" style={{ animation: 'orbit-reverse 2.5s linear infinite', top: '50%', left: '50%', marginTop: '-5px', marginLeft: '-5px' }} />
          <div className="absolute w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" style={{ animation: 'orbit 3s linear infinite', top: '50%', left: '50%', marginTop: '-4px', marginLeft: '-4px' }} />

          <div className="absolute inset-0 flex items-center justify-center">
            <Atom className="w-8 h-8 text-purple-400" style={{ animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2 font-display tracking-wide">Running Quantum Optimization...</h3>
          <p className="text-sm text-slate-400">Evaluating superposition of schedules</p>
        </div>

        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full quantum-gradient rounded-full" style={{ animation: 'shimmer 1.5s ease-in-out infinite', width: '100%', backgroundSize: '200% 100%' }} />
        </div>
      </div>
    </div>
  );
}

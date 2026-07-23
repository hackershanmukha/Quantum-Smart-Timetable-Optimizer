import { Atom } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative z-10 px-6 pt-10 pb-14 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-purple-300 mb-6 border border-purple-500/20">
          <Atom className="w-3.5 h-3.5" />
          <span>Quantum-Inspired Scheduling Engine</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight font-display leading-tight">
          Quantum Smart<br />
          <span className="text-quantum">Timetable Optimizer</span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Leverage quantum-inspired algorithms to generate conflict-free, optimized class schedules in seconds.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </section>
  );
}

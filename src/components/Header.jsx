import { Atom } from 'lucide-react';

export function Header() {
  return (
    <header className="relative z-10 py-6 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl quantum-gradient flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Atom className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight font-display leading-none">
              Quantum<span className="text-purple-400">TT</span>
            </h1>
            <p className="text-[10px] text-slate-500 tracking-widest uppercase">Smart Timetable</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <span className="text-sm text-slate-400 hover:text-purple-400 cursor-pointer transition-colors">Dashboard</span>
          <span className="text-sm text-slate-400 hover:text-purple-400 cursor-pointer transition-colors">Timetable</span>
          <span className="text-sm text-slate-400 hover:text-purple-400 cursor-pointer transition-colors">Analytics</span>
        </nav>
      </div>
    </header>
  );
}

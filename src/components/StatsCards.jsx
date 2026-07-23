import { ShieldCheck, AlertTriangle, BarChart3, CheckCircle2 } from 'lucide-react';

export function StatsCards({ stats }) {
  const cards = [
    { label: 'Faculty Conflicts', value: String(stats.facultyConflicts), icon: ShieldCheck, color: 'from-emerald-500 to-green-600', glow: 'shadow-emerald-500/20', desc: stats.facultyConflicts === 0 ? 'No faculty double-booking' : `${stats.facultyConflicts} conflict(s) detected` },
    { label: 'Room Conflicts', value: String(stats.roomConflicts), icon: AlertTriangle, color: 'from-blue-500 to-cyan-600', glow: 'shadow-blue-500/20', desc: stats.roomConflicts === 0 ? 'All rooms available' : `${stats.roomConflicts} conflict(s) detected` },
    { label: 'Slot Utilization', value: `${stats.utilization}%`, icon: BarChart3, color: 'from-purple-500 to-violet-600', glow: 'shadow-purple-500/20', desc: `${stats.filledSlots} of ${stats.totalSlots} slots filled` },
    { label: 'Status', value: 'Success', icon: CheckCircle2, color: 'from-indigo-500 to-purple-600', glow: 'shadow-indigo-500/20', desc: 'Timetable Generated Successfully' },
  ];

  return (
    <section className="relative z-10 px-6 mb-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 font-display tracking-wide">
          Optimization <span className="text-quantum">Results</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((s) => (
            <div key={s.label} className="stat-card glass quantum-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg ${s.glow}`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">{s.label}</p>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-xs text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

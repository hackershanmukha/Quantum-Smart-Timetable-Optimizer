import { BookOpen, Users, Building2, Clock, GraduationCap, UserCog } from 'lucide-react';

export function Dashboard({ data }) {
  const stats = [
    { label: 'Total Faculty', value: data.faculty, icon: UserCog, color: 'from-blue-500 to-indigo-600', glow: 'shadow-blue-500/20' },
    { label: 'Branches', value: data.branches, icon: GraduationCap, color: 'from-purple-500 to-pink-600', glow: 'shadow-purple-500/20' },
    { label: 'Total Subjects', value: data.subjects, icon: BookOpen, color: 'from-indigo-500 to-purple-600', glow: 'shadow-indigo-500/20' },
    { label: 'Rooms & Labs', value: data.rooms, icon: Building2, color: 'from-cyan-500 to-blue-600', glow: 'shadow-cyan-500/20' },
    { label: 'Time Slots / Day', value: data.slots, icon: Clock, color: 'from-violet-500 to-fuchsia-600', glow: 'shadow-violet-500/20' },
    { label: 'Working Days', value: data.days, icon: Users, color: 'from-fuchsia-500 to-pink-600', glow: 'shadow-fuchsia-500/20' },
  ];

  return (
    <section className="relative z-10 px-6 mb-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 font-display tracking-wide">
          Dashboard <span className="text-quantum">Overview</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-card glass quantum-border p-4 flex flex-col items-center gap-2 text-center"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg ${s.glow}`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

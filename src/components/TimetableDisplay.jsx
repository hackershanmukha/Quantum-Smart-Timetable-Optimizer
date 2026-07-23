import { useState } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

export function TimetableDisplay({ timetables, selectedDays, selectedSlots }) {
  const branchNames = Object.keys(timetables);
  const [activeBranch, setActiveBranch] = useState(branchNames[0] || '');

  if (!branchNames.length) return null;

  const current = timetables[activeBranch];
  if (!current) return null;

  const { branch, grid } = current;
  const currentIdx = branchNames.indexOf(activeBranch);

  return (
    <section className="relative z-10 px-6 mb-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 font-display tracking-wide">
          Generated Weekly <span className="text-quantum">Timetables</span>
        </h2>

        {/* Branch Selector Tabs */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveBranch(branchNames[Math.max(0, currentIdx - 1)])}
            disabled={currentIdx === 0}
            className="p-2 rounded-lg bg-slate-800/40 text-slate-400 hover:text-white disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {branchNames.map(name => (
            <button
              key={name}
              onClick={() => setActiveBranch(name)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeBranch === name
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-800/40 text-slate-500 border border-slate-700/30 hover:text-slate-300'
              }`}
            >
              {name} — {timetables[name].branch.fullName}
            </button>
          ))}

          <button
            onClick={() => setActiveBranch(branchNames[Math.min(branchNames.length - 1, currentIdx + 1)])}
            disabled={currentIdx === branchNames.length - 1}
            className="p-2 rounded-lg bg-slate-800/40 text-slate-400 hover:text-white disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Branch Info */}
        <div className="glass quantum-border p-4 mb-5 flex flex-wrap items-center gap-6">
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Branch</span>
            <p className="text-white font-semibold">{branch.fullName}</p>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Semester</span>
            <p className="text-white font-semibold">{branch.semester}</p>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Students</span>
            <p className="text-white font-semibold">{branch.students}</p>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Subjects</span>
            <p className="text-white font-semibold">{current.subjects.length}</p>
          </div>
        </div>

        {/* Weekly Grid */}
        <div className="glass quantum-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-800/30">
                  <th className="py-3 px-3 text-left text-xs text-slate-500 uppercase tracking-wider font-medium border-b border-r border-slate-700/30 w-[120px]">
                    Time / Day
                  </th>
                  {selectedDays.map(day => (
                    <th key={day} className="py-3 px-3 text-center text-xs text-slate-400 uppercase tracking-wider font-medium border-b border-r border-slate-700/30 last:border-r-0">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedSlots.map(slot => (
                  <tr key={slot} className="hover:bg-purple-500/3 transition-colors">
                    <td className="py-2 px-3 font-mono text-xs text-slate-400 border-r border-b border-slate-700/20 bg-slate-800/10 whitespace-nowrap">
                      {slot}
                    </td>
                    {selectedDays.map(day => {
                      const cell = grid[day]?.[slot];
                      return (
                        <td key={day} className="py-1.5 px-1.5 border-r border-b border-slate-700/20 last:border-r-0 align-top">
                          {cell ? (
                            <div className={`rounded-lg border p-2 ${cell.colorClass} transition-all hover:scale-[1.02]`}>
                              <p className="font-semibold text-xs leading-tight">{cell.subject}</p>
                              <p className="text-[10px] opacity-70 mt-0.5">{cell.code}</p>
                              <div className="flex items-center justify-between mt-1.5 gap-1">
                                <span className="text-[10px] opacity-60">{cell.faculty}</span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded ${cell.type === 'Lab' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/10'}`}>
                                  {cell.room}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="h-14 rounded-lg border border-dashed border-slate-800/40 flex items-center justify-center">
                              <span className="text-[10px] text-slate-700">Free</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-2">
          {current.subjects.map(s => {
            const cell = Object.values(grid).flatMap(d => Object.values(d)).find(c => c && c.subject === s.name);
            if (!cell) return null;
            return (
              <span key={s.id} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs ${cell.colorClass}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {s.name} ({s.weeklyClasses}x)
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

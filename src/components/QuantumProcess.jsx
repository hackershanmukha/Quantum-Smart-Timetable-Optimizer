import { Database, Shuffle, Atom, FileCheck } from 'lucide-react';

const steps = [
  { icon: Database, title: 'Collect Input Data', desc: 'Gather subjects, students, rooms, and time slot constraints from the user.', color: 'from-blue-500 to-indigo-600' },
  { icon: Shuffle, title: 'Generate Possible Schedules', desc: 'Create a superposition of all valid timetable configurations.', color: 'from-indigo-500 to-purple-600' },
  { icon: Atom, title: 'Quantum Optimization', desc: 'Apply quantum-inspired algorithms to find the optimal schedule with minimal conflicts.', color: 'from-purple-500 to-violet-600' },
  { icon: FileCheck, title: 'Final Timetable', desc: 'Collapse the quantum state into the best timetable and present the results.', color: 'from-violet-500 to-fuchsia-600' },
];

export function QuantumProcess() {
  return (
    <section className="relative z-10 px-6 mb-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2 font-display tracking-wide">
          Quantum Optimization <span className="text-quantum">Process</span>
        </h2>
        <p className="text-slate-400 text-sm mb-8">How quantum-inspired algorithms generate the optimal timetable</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%+4px)] w-[calc(100%-48px)] h-px bg-gradient-to-r from-purple-500/40 to-transparent z-0" />
              )}
              <div className="glass quantum-border p-6 relative z-10 h-full flex flex-col items-center text-center">
                <div className="text-xs text-purple-400 font-mono mb-3 uppercase tracking-widest">Step {i + 1}</div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-4`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

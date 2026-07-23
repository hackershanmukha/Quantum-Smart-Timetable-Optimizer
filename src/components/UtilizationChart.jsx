import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const PIE_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c084fc', '#818cf8', '#7c3aed', '#06b6d4', '#ec4899', '#f59e0b', '#10b981', '#f43f5e', '#3b82f6'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong px-4 py-2 rounded-lg shadow-xl">
      <p className="text-white text-sm font-medium">{label || payload[0].name}</p>
      <p className="text-purple-400 text-xs">{payload[0].value}%</p>
    </div>
  );
};

export function UtilizationChart({ roomUtilData, timetables }) {
  const subjectDist = [];
  if (timetables) {
    const counts = {};
    Object.values(timetables).forEach(({ grid }) => {
      Object.values(grid).forEach(daySlots => {
        Object.values(daySlots).forEach(cell => {
          if (cell) counts[cell.subject] = (counts[cell.subject] || 0) + 1;
        });
      });
    });
    Object.entries(counts).forEach(([name, value]) => {
      subjectDist.push({ name, value });
    });
    subjectDist.sort((a, b) => b.value - a.value);
  }

  return (
    <section className="relative z-10 px-6 mb-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 font-display tracking-wide">
          Classroom <span className="text-quantum">Utilization</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass quantum-border p-6">
            <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-4 font-medium">Room Usage (%)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={roomUtilData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.1)" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: 'rgba(139,92,246,0.2)' }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: 'rgba(139,92,246,0.2)' }} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <Bar dataKey="utilization" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass quantum-border p-6">
            <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-4 font-medium">Subject Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={subjectDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {subjectDist.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span className="text-slate-400 text-xs">{value}</span>}
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

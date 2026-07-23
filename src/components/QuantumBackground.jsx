export function QuantumBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[100px]" style={{ animation: 'pulse-glow 6s ease-in-out infinite' }} />

      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `particle-float ${8 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

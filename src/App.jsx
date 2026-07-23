import { useState, useRef } from 'react';
import { QuantumBackground } from './components/QuantumBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Dashboard } from './components/Dashboard';
import { InputForm } from './components/InputForm';
import { LoadingOverlay } from './components/LoadingOverlay';
import { TimetableDisplay } from './components/TimetableDisplay';
import { StatsCards } from './components/StatsCards';
import { UtilizationChart } from './components/UtilizationChart';
import { QuantumProcess } from './components/QuantumProcess';
import { generateTimetables } from './components/timetableGenerator';

function App() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [results, setResults] = useState(null);
  const [inputSnapshot, setInputSnapshot] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    faculty: 0, branches: 0, subjects: 0, rooms: 0, slots: 0, days: 0,
  });
  const resultsRef = useRef(null);

  const handleGenerate = (formData) => {
    setDashboardData({
      faculty: formData.faculty.length,
      branches: formData.branches.length,
      subjects: formData.subjects.length,
      rooms: formData.rooms.length,
      slots: formData.selectedSlots.length,
      days: formData.selectedDays.length,
    });

    setIsOptimizing(true);
    setResults(null);

    setTimeout(() => {
      const generated = generateTimetables(formData);
      setResults(generated);
      setInputSnapshot(formData);
      setIsOptimizing(false);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative">
      <QuantumBackground />
      <Header />
      <HeroSection />
      <Dashboard data={dashboardData} />
      <InputForm onGenerate={handleGenerate} isOptimizing={isOptimizing} />

      {isOptimizing && <LoadingOverlay />}

      {results && (
        <div ref={resultsRef}>
          <TimetableDisplay
            timetables={results.timetables}
            selectedDays={inputSnapshot.selectedDays}
            selectedSlots={inputSnapshot.selectedSlots}
          />
          <StatsCards stats={results.stats} />
          <UtilizationChart
            roomUtilData={results.roomUtilData}
            timetables={results.timetables}
          />
        </div>
      )}

      <QuantumProcess />

      <footer className="relative z-10 text-center py-8 border-t border-slate-800/50">
        <p className="text-xs text-slate-600">
          Quantum Smart Timetable Optimizer &mdash; Prototype Demo
        </p>
      </footer>
    </div>
  );
}

export default App;

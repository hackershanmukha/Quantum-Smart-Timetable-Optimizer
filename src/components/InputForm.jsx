import { useState } from 'react';
import { Plus, Trash2, User, GitBranch, BookOpen, Building2, Clock, Zap, X } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
  '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
  '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00',
  '03:00 - 04:00', '04:00 - 05:00',
];

const INITIAL_FACULTY = [
  { id: 1, name: 'Dr. Sharma', department: 'Computer Science' },
  { id: 2, name: 'Prof. Verma', department: 'Electronics' },
  { id: 3, name: 'Dr. Gupta', department: 'Mathematics' },
  { id: 4, name: 'Prof. Singh', department: 'Physics' },
  { id: 5, name: 'Dr. Patel', department: 'Computer Science' },
  { id: 6, name: 'Prof. Kumar', department: 'Mechanical' },
];

const INITIAL_BRANCHES = [
  { id: 1, name: 'CSE', fullName: 'Computer Science & Engineering', semester: '5th', students: 60 },
  { id: 2, name: 'ECE', fullName: 'Electronics & Communication', semester: '5th', students: 55 },
  { id: 3, name: 'ME', fullName: 'Mechanical Engineering', semester: '5th', students: 50 },
];

const INITIAL_SUBJECTS = [
  { id: 1, name: 'Data Structures', code: 'CS301', branch: 'CSE', faculty: 'Dr. Sharma', weeklyClasses: 3, type: 'Theory' },
  { id: 2, name: 'Operating Systems', code: 'CS302', branch: 'CSE', faculty: 'Dr. Patel', weeklyClasses: 3, type: 'Theory' },
  { id: 3, name: 'DBMS', code: 'CS303', branch: 'CSE', faculty: 'Dr. Sharma', weeklyClasses: 2, type: 'Theory' },
  { id: 4, name: 'DS Lab', code: 'CS304', branch: 'CSE', faculty: 'Dr. Patel', weeklyClasses: 2, type: 'Lab' },
  { id: 5, name: 'Signal Processing', code: 'EC301', branch: 'ECE', faculty: 'Prof. Verma', weeklyClasses: 3, type: 'Theory' },
  { id: 6, name: 'Digital Electronics', code: 'EC302', branch: 'ECE', faculty: 'Prof. Verma', weeklyClasses: 3, type: 'Theory' },
  { id: 7, name: 'Microprocessors', code: 'EC303', branch: 'ECE', faculty: 'Prof. Singh', weeklyClasses: 2, type: 'Theory' },
  { id: 8, name: 'Electronics Lab', code: 'EC304', branch: 'ECE', faculty: 'Prof. Verma', weeklyClasses: 2, type: 'Lab' },
  { id: 9, name: 'Thermodynamics', code: 'ME301', branch: 'ME', faculty: 'Prof. Kumar', weeklyClasses: 3, type: 'Theory' },
  { id: 10, name: 'Fluid Mechanics', code: 'ME302', branch: 'ME', faculty: 'Prof. Kumar', weeklyClasses: 3, type: 'Theory' },
  { id: 11, name: 'Machine Design', code: 'ME303', branch: 'ME', faculty: 'Prof. Singh', weeklyClasses: 2, type: 'Theory' },
  { id: 12, name: 'Workshop Lab', code: 'ME304', branch: 'ME', faculty: 'Prof. Kumar', weeklyClasses: 2, type: 'Lab' },
  { id: 13, name: 'Mathematics III', code: 'MA301', branch: 'CSE', faculty: 'Dr. Gupta', weeklyClasses: 3, type: 'Theory' },
  { id: 14, name: 'Mathematics III', code: 'MA301', branch: 'ECE', faculty: 'Dr. Gupta', weeklyClasses: 3, type: 'Theory' },
  { id: 15, name: 'Mathematics III', code: 'MA301', branch: 'ME', faculty: 'Dr. Gupta', weeklyClasses: 3, type: 'Theory' },
];

const INITIAL_ROOMS = [
  { id: 1, name: 'Room 101', type: 'Classroom', capacity: 60 },
  { id: 2, name: 'Room 102', type: 'Classroom', capacity: 60 },
  { id: 3, name: 'Room 201', type: 'Classroom', capacity: 55 },
  { id: 4, name: 'Room 202', type: 'Classroom', capacity: 55 },
  { id: 5, name: 'CS Lab 1', type: 'Lab', capacity: 35 },
  { id: 6, name: 'CS Lab 2', type: 'Lab', capacity: 35 },
  { id: 7, name: 'ECE Lab', type: 'Lab', capacity: 30 },
  { id: 8, name: 'Mech Workshop', type: 'Lab', capacity: 30 },
];

const tabConfig = [
  { key: 'faculty', label: 'Faculty', icon: User },
  { key: 'branches', label: 'Branches', icon: GitBranch },
  { key: 'subjects', label: 'Subjects', icon: BookOpen },
  { key: 'rooms', label: 'Rooms & Labs', icon: Building2 },
  { key: 'timing', label: 'Timing', icon: Clock },
];

export function InputForm({ onGenerate, isOptimizing }) {
  const [activeTab, setActiveTab] = useState('faculty');
  const [faculty, setFaculty] = useState(INITIAL_FACULTY);
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [selectedDays, setSelectedDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [selectedSlots, setSelectedSlots] = useState(TIME_SLOTS.slice(0, 6));
  const [nextId, setNextId] = useState(100);

  const getId = () => { const id = nextId; setNextId(id + 1); return id; };

  const [newFaculty, setNewFaculty] = useState({ name: '', department: '' });
  const [newBranch, setNewBranch] = useState({ name: '', fullName: '', semester: '', students: '' });
  const [newSubject, setNewSubject] = useState({ name: '', code: '', branch: '', faculty: '', weeklyClasses: '3', type: 'Theory' });
  const [newRoom, setNewRoom] = useState({ name: '', type: 'Classroom', capacity: '' });

  const toggleDay = (day) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };
  const toggleSlot = (slot) => {
    setSelectedSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]);
  };

  const addFaculty = () => {
    if (!newFaculty.name || !newFaculty.department) return;
    setFaculty([...faculty, { id: getId(), ...newFaculty }]);
    setNewFaculty({ name: '', department: '' });
  };
  const addBranch = () => {
    if (!newBranch.name || !newBranch.fullName) return;
    setBranches([...branches, { id: getId(), ...newBranch, students: Number(newBranch.students) || 0 }]);
    setNewBranch({ name: '', fullName: '', semester: '', students: '' });
  };
  const addSubject = () => {
    if (!newSubject.name || !newSubject.code || !newSubject.branch || !newSubject.faculty) return;
    setSubjects([...subjects, { id: getId(), ...newSubject, weeklyClasses: Number(newSubject.weeklyClasses) || 3 }]);
    setNewSubject({ name: '', code: '', branch: '', faculty: '', weeklyClasses: '3', type: 'Theory' });
  };
  const addRoom = () => {
    if (!newRoom.name) return;
    setRooms([...rooms, { id: getId(), ...newRoom, capacity: Number(newRoom.capacity) || 0 }]);
    setNewRoom({ name: '', type: 'Classroom', capacity: '' });
  };

  const handleGenerate = () => {
    onGenerate({ faculty, branches, subjects, rooms, selectedDays, selectedSlots });
  };

  const inputCn = "input-quantum";
  const selectCn = "input-quantum appearance-none cursor-pointer";
  const thCn = "pb-3 text-xs text-slate-500 uppercase tracking-wider font-medium text-left px-2";
  const tdCn = "py-2.5 px-2 text-sm";

  return (
    <section className="relative z-10 px-6 mb-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 font-display tracking-wide">
          Input <span className="text-quantum">Configuration</span>
        </h2>

        <div className="glass quantum-border overflow-hidden">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-slate-700/50">
            {tabConfig.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  activeTab === tab.key
                    ? 'text-purple-400 border-purple-500 bg-purple-500/5'
                    : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-800/30'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Faculty Tab */}
            {activeTab === 'faculty' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Faculty Name</label>
                    <input className={inputCn} placeholder="e.g. Dr. Sharma" value={newFaculty.name} onChange={e => setNewFaculty({ ...newFaculty, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Department</label>
                    <input className={inputCn} placeholder="e.g. Computer Science" value={newFaculty.department} onChange={e => setNewFaculty({ ...newFaculty, department: e.target.value })} />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addFaculty} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 hover:border-purple-500/40 hover:text-white transition-all cursor-pointer w-full justify-center">
                      <Plus className="w-4 h-4" /> Add Faculty
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-700/50">
                      <th className={thCn}>#</th><th className={thCn}>Name</th><th className={thCn}>Department</th><th className={thCn}></th>
                    </tr></thead>
                    <tbody>
                      {faculty.map((f, i) => (
                        <tr key={f.id} className="border-b border-slate-800/40 hover:bg-purple-500/5 transition-colors">
                          <td className={`${tdCn} text-slate-500`}>{i + 1}</td>
                          <td className={`${tdCn} text-white font-medium`}>{f.name}</td>
                          <td className={`${tdCn} text-slate-300`}>{f.department}</td>
                          <td className={`${tdCn} text-right`}>
                            <button onClick={() => setFaculty(faculty.filter(x => x.id !== f.id))} className="text-slate-600 hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Branches Tab */}
            {activeTab === 'branches' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Short Name</label>
                    <input className={inputCn} placeholder="e.g. CSE" value={newBranch.name} onChange={e => setNewBranch({ ...newBranch, name: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input className={inputCn} placeholder="e.g. Computer Science & Engineering" value={newBranch.fullName} onChange={e => setNewBranch({ ...newBranch, fullName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Semester</label>
                    <input className={inputCn} placeholder="e.g. 5th" value={newBranch.semester} onChange={e => setNewBranch({ ...newBranch, semester: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Students</label>
                    <input className={inputCn} type="number" placeholder="e.g. 60" value={newBranch.students} onChange={e => setNewBranch({ ...newBranch, students: e.target.value })} />
                  </div>
                </div>
                <button onClick={addBranch} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 hover:border-purple-500/40 hover:text-white transition-all cursor-pointer mb-5">
                  <Plus className="w-4 h-4" /> Add Branch
                </button>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-700/50">
                      <th className={thCn}>#</th><th className={thCn}>Code</th><th className={thCn}>Branch Name</th><th className={thCn}>Semester</th><th className={thCn}>Students</th><th className={thCn}></th>
                    </tr></thead>
                    <tbody>
                      {branches.map((b, i) => (
                        <tr key={b.id} className="border-b border-slate-800/40 hover:bg-purple-500/5 transition-colors">
                          <td className={`${tdCn} text-slate-500`}>{i + 1}</td>
                          <td className={tdCn}><span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 text-xs font-mono">{b.name}</span></td>
                          <td className={`${tdCn} text-white font-medium`}>{b.fullName}</td>
                          <td className={`${tdCn} text-slate-300`}>{b.semester}</td>
                          <td className={`${tdCn} text-slate-300`}>{b.students}</td>
                          <td className={`${tdCn} text-right`}>
                            <button onClick={() => setBranches(branches.filter(x => x.id !== b.id))} className="text-slate-600 hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Subjects Tab */}
            {activeTab === 'subjects' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Subject Name</label>
                    <input className={inputCn} placeholder="e.g. Data Structures" value={newSubject.name} onChange={e => setNewSubject({ ...newSubject, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Code</label>
                    <input className={inputCn} placeholder="e.g. CS301" value={newSubject.code} onChange={e => setNewSubject({ ...newSubject, code: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Branch</label>
                    <select className={selectCn} value={newSubject.branch} onChange={e => setNewSubject({ ...newSubject, branch: e.target.value })}>
                      <option value="">Select Branch</option>
                      {branches.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Faculty</label>
                    <select className={selectCn} value={newSubject.faculty} onChange={e => setNewSubject({ ...newSubject, faculty: e.target.value })}>
                      <option value="">Select Faculty</option>
                      {faculty.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Weekly Classes</label>
                    <select className={selectCn} value={newSubject.weeklyClasses} onChange={e => setNewSubject({ ...newSubject, weeklyClasses: e.target.value })}>
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}x per week</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Type</label>
                    <select className={selectCn} value={newSubject.type} onChange={e => setNewSubject({ ...newSubject, type: e.target.value })}>
                      <option value="Theory">Theory</option>
                      <option value="Lab">Lab</option>
                    </select>
                  </div>
                </div>
                <button onClick={addSubject} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 hover:border-purple-500/40 hover:text-white transition-all cursor-pointer mb-5">
                  <Plus className="w-4 h-4" /> Add Subject
                </button>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-700/50">
                      <th className={thCn}>Code</th><th className={thCn}>Subject</th><th className={thCn}>Branch</th><th className={thCn}>Faculty</th><th className={thCn}>Weekly</th><th className={thCn}>Type</th><th className={thCn}></th>
                    </tr></thead>
                    <tbody>
                      {subjects.map(s => (
                        <tr key={s.id} className="border-b border-slate-800/40 hover:bg-purple-500/5 transition-colors">
                          <td className={tdCn}><span className="font-mono text-xs text-slate-400">{s.code}</span></td>
                          <td className={`${tdCn} text-white font-medium`}>{s.name}</td>
                          <td className={tdCn}><span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 text-xs">{s.branch}</span></td>
                          <td className={`${tdCn} text-slate-300`}>{s.faculty}</td>
                          <td className={tdCn}><span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 text-xs">{s.weeklyClasses}x</span></td>
                          <td className={tdCn}>
                            <span className={`px-2 py-0.5 rounded text-xs ${s.type === 'Lab' ? 'bg-cyan-500/15 text-cyan-300' : 'bg-blue-500/15 text-blue-300'}`}>{s.type}</span>
                          </td>
                          <td className={`${tdCn} text-right`}>
                            <button onClick={() => setSubjects(subjects.filter(x => x.id !== s.id))} className="text-slate-600 hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Rooms & Labs Tab */}
            {activeTab === 'rooms' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Room / Lab Name</label>
                    <input className={inputCn} placeholder="e.g. Room 301" value={newRoom.name} onChange={e => setNewRoom({ ...newRoom, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Type</label>
                    <select className={selectCn} value={newRoom.type} onChange={e => setNewRoom({ ...newRoom, type: e.target.value })}>
                      <option value="Classroom">Classroom</option>
                      <option value="Lab">Lab</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Capacity</label>
                    <input className={inputCn} type="number" placeholder="e.g. 60" value={newRoom.capacity} onChange={e => setNewRoom({ ...newRoom, capacity: e.target.value })} />
                  </div>
                  <div className="flex items-end">
                    <button onClick={addRoom} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 hover:border-purple-500/40 hover:text-white transition-all cursor-pointer w-full justify-center">
                      <Plus className="w-4 h-4" /> Add Room
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-slate-700/50">
                      <th className={thCn}>#</th><th className={thCn}>Name</th><th className={thCn}>Type</th><th className={thCn}>Capacity</th><th className={thCn}></th>
                    </tr></thead>
                    <tbody>
                      {rooms.map((r, i) => (
                        <tr key={r.id} className="border-b border-slate-800/40 hover:bg-purple-500/5 transition-colors">
                          <td className={`${tdCn} text-slate-500`}>{i + 1}</td>
                          <td className={`${tdCn} text-white font-medium`}>{r.name}</td>
                          <td className={tdCn}>
                            <span className={`px-2 py-0.5 rounded text-xs ${r.type === 'Lab' ? 'bg-cyan-500/15 text-cyan-300' : 'bg-blue-500/15 text-blue-300'}`}>{r.type}</span>
                          </td>
                          <td className={`${tdCn} text-slate-300`}>{r.capacity}</td>
                          <td className={`${tdCn} text-right`}>
                            <button onClick={() => setRooms(rooms.filter(x => x.id !== r.id))} className="text-slate-600 hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Timing Tab */}
            {activeTab === 'timing' && (
              <div>
                <div className="mb-8">
                  <h3 className="text-sm text-slate-300 font-medium mb-3">Select Working Days</h3>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map(day => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          selectedDays.includes(day)
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'bg-slate-800/40 text-slate-500 border border-slate-700/30 hover:border-slate-600/50'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-slate-300 font-medium mb-3">Select Time Slots</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {TIME_SLOTS.map(slot => (
                      <button
                        key={slot}
                        onClick={() => toggleSlot(slot)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-mono transition-all cursor-pointer ${
                          selectedSlots.includes(slot)
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                            : 'bg-slate-800/40 text-slate-500 border border-slate-700/30 hover:border-slate-600/50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                  <p className="text-xs text-slate-400">
                    <span className="text-white font-medium">{selectedDays.length}</span> working days &times; <span className="text-white font-medium">{selectedSlots.length}</span> time slots = <span className="text-purple-400 font-medium">{selectedDays.length * selectedSlots.length}</span> total slots per branch per week
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <div className="px-6 pb-6 flex flex-wrap items-center gap-4 border-t border-slate-800/50 pt-5">
            <button
              onClick={handleGenerate}
              disabled={isOptimizing || branches.length === 0 || subjects.length === 0}
              className="btn-quantum flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-5 h-5" /> Generate Quantum Timetable
            </button>
            <p className="text-xs text-slate-500">
              Generates weekly timetables for <span className="text-purple-400">{branches.length} branch{branches.length !== 1 ? 'es' : ''}</span> simultaneously
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

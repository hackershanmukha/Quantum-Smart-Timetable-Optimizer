const SUBJECT_COLOR_POOL = [
  'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
  'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'bg-sky-500/20 text-sky-300 border-sky-500/30',
];

export function generateTimetables({ branches, subjects, rooms, selectedDays, selectedSlots, faculty }) {
  const colorMap = {};
  let colorIdx = 0;
  subjects.forEach(s => {
    const key = s.name;
    if (!colorMap[key]) {
      colorMap[key] = SUBJECT_COLOR_POOL[colorIdx % SUBJECT_COLOR_POOL.length];
      colorIdx++;
    }
  });

  const classrooms = rooms.filter(r => r.type === 'Classroom');
  const labs = rooms.filter(r => r.type === 'Lab');

  const roomOccupied = {};
  const facultyOccupied = {};

  const isSlotFree = (day, slot, room, fac) => {
    const roomKey = `${room}-${day}-${slot}`;
    const facKey = `${fac}-${day}-${slot}`;
    return !roomOccupied[roomKey] && !facultyOccupied[facKey];
  };
  const bookSlot = (day, slot, room, fac) => {
    roomOccupied[`${room}-${day}-${slot}`] = true;
    facultyOccupied[`${fac}-${day}-${slot}`] = true;
  };

  const timetables = {};

  branches.forEach(branch => {
    const grid = {};
    selectedDays.forEach(day => {
      grid[day] = {};
      selectedSlots.forEach(slot => {
        grid[day][slot] = null;
      });
    });

    const branchSubjects = subjects.filter(s => s.branch === branch.name);
    const branchOccupied = {};

    const sortedSubjects = [...branchSubjects].sort((a, b) => b.weeklyClasses - a.weeklyClasses);

    sortedSubjects.forEach(subject => {
      let placed = 0;
      const targetRooms = subject.type === 'Lab' ? labs : classrooms;

      const shuffledDays = [...selectedDays].sort(() => 0.5 - Math.random() * (placed + 1) / selectedDays.length);

      for (const day of shuffledDays) {
        if (placed >= subject.weeklyClasses) break;

        const branchDayKey = `${branch.name}-${day}`;
        const subjectCountOnDay = Object.values(grid[day]).filter(
          v => v && v.subject === subject.name
        ).length;
        if (subjectCountOnDay > 0) continue;

        for (const slot of selectedSlots) {
          if (placed >= subject.weeklyClasses) break;
          if (grid[day][slot]) continue;

          const branchSlotKey = `${branch.name}-${day}-${slot}`;
          if (branchOccupied[branchSlotKey]) continue;

          for (const room of targetRooms) {
            if (isSlotFree(day, slot, room.name, subject.faculty)) {
              grid[day][slot] = {
                subject: subject.name,
                code: subject.code,
                faculty: subject.faculty,
                room: room.name,
                type: subject.type,
                colorClass: colorMap[subject.name],
              };
              bookSlot(day, slot, room.name, subject.faculty);
              branchOccupied[branchSlotKey] = true;
              placed++;
              break;
            }
          }
        }
      }
    });

    timetables[branch.name] = {
      branch,
      grid,
      subjects: branchSubjects,
    };
  });

  const totalSlots = branches.length * selectedDays.length * selectedSlots.length;
  let filledSlots = 0;
  let facultyConflicts = 0;
  let roomConflicts = 0;

  Object.values(timetables).forEach(({ grid }) => {
    Object.values(grid).forEach(daySlots => {
      Object.values(daySlots).forEach(cell => {
        if (cell) filledSlots++;
      });
    });
  });

  const roomUsage = {};
  rooms.forEach(r => { roomUsage[r.name] = 0; });
  Object.values(timetables).forEach(({ grid }) => {
    Object.values(grid).forEach(daySlots => {
      Object.values(daySlots).forEach(cell => {
        if (cell && roomUsage[cell.room] !== undefined) {
          roomUsage[cell.room]++;
        }
      });
    });
  });

  const maxPerRoom = selectedDays.length * selectedSlots.length;
  const roomUtilData = rooms.map(r => ({
    name: r.name,
    utilization: Math.round((roomUsage[r.name] / maxPerRoom) * 100),
    type: r.type,
  }));

  const stats = {
    facultyConflicts,
    roomConflicts,
    utilization: totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0,
    totalSlots,
    filledSlots,
  };

  return { timetables, stats, roomUtilData, colorMap };
}

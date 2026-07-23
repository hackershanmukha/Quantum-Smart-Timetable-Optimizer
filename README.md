# Quantum Smart Timetable Optimizer

An intelligent, quantum-inspired timetable generation system built with React that automatically creates conflict-free weekly schedules for educational institutions. It handles multiple branches, faculty, rooms, labs, and time slots — producing optimized timetables in seconds.

## Problem Statement

Manual timetable creation for colleges and universities is a tedious, error-prone process. Scheduling coordinators must juggle:

- **Faculty conflicts** — A professor cannot teach two classes at the same time.
- **Room conflicts** — A classroom or lab cannot host two sessions simultaneously.
- **Subject distribution** — Subjects should be spread across the week, not clustered on one day.
- **Lab vs. Theory allocation** — Lab sessions must be assigned to lab rooms, theory classes to classrooms.
- **Scalability** — The schedule must work across multiple branches/departments simultaneously.

The Quantum Smart Timetable Optimizer solves all of these constraints automatically using a priority-based, constraint-satisfaction scheduling algorithm.

## How It Works

1. **Input Configuration** — Users define faculty members, branches (departments), subjects (with weekly class count, type, and assigned faculty), rooms/labs (with capacity), working days, and time slots through an interactive tabbed form.

2. **Quantum-Inspired Optimization** — The algorithm processes subjects in priority order (highest weekly class count first), shuffles days to distribute load, and greedily assigns slots while enforcing three hard constraints:
   - No faculty double-booking across any branch
   - No room double-booking across any branch
   - No subject repeated on the same day for a branch

3. **Results & Analytics** — The system generates per-branch timetable grids and provides:
   - Overall slot utilization percentage
   - Faculty and room conflict counts (should be zero)
   - Per-room utilization bar charts
   - Color-coded subject mapping for easy reading

## Features

- **Multi-Branch Support** — Generate timetables for CSE, ECE, ME, or any custom branches all at once.
- **Dynamic Input** — Add/remove faculty, branches, subjects, rooms, days, and time slots on the fly.
- **Conflict-Free Scheduling** — Hard constraints ensure zero faculty or room double-bookings.
- **Real-Time Dashboard** — Live stats showing faculty count, branches, subjects, rooms, slots, and days.
- **Room Utilization Charts** — Recharts-powered bar charts showing how efficiently each room is used.
- **Quantum-Themed UI** — Dark theme with animated particle background, glassmorphism cards, and smooth Framer Motion transitions.
- **Fully Responsive** — Works on desktop, tablet, and mobile screens.
- **Pre-Loaded Demo Data** — Comes with sample faculty, branches, subjects, and rooms so you can generate a timetable immediately.

## Tech Stack

| Layer        | Technology                                  |
| ------------ | ------------------------------------------- |
| Framework    | React 19                                    |
| Build Tool   | Vite 8                                      |
| Styling      | Tailwind CSS 4                              |
| Animations   | Framer Motion                               |
| Charts       | Recharts                                    |
| Icons        | Lucide React                                |
| Linter       | Oxlint                                      |

## Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hackershanmukha/Quantum-Smart-Timetable-Optimizer.git
   cd Quantum-Smart-Timetable-Optimizer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Visit `http://localhost:5173` (Vite's default port).

## Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` folder. You can preview it locally:

```bash
npm run preview
```

## Project Structure

```
quantum-timetable/
├── public/
│   ├── favicon.svg             # App icon
│   └── icons.svg               # SVG icon sprites
├── src/
│   ├── assets/                 # Images (hero, logos)
│   ├── components/
│   │   ├── Dashboard.jsx       # Live stats dashboard cards
│   │   ├── Header.jsx          # Top navigation bar
│   │   ├── HeroSection.jsx     # Landing hero with CTA
│   │   ├── InputForm.jsx       # Tabbed config form (faculty, branches, subjects, rooms, timing)
│   │   ├── LoadingOverlay.jsx   # Quantum optimization loading animation
│   │   ├── QuantumBackground.jsx # Animated particle background
│   │   ├── QuantumProcess.jsx   # "How it works" process section
│   │   ├── StatsCards.jsx       # Post-generation statistics
│   │   ├── TimetableDisplay.jsx # Generated timetable grids per branch
│   │   ├── UtilizationChart.jsx # Room utilization bar charts
│   │   └── timetableGenerator.js # Core scheduling algorithm
│   ├── App.jsx                 # Root component
│   ├── index.css               # Global styles & Tailwind imports
│   └── main.jsx                # React entry point
├── index.html                  # HTML entry
├── package.json                # Dependencies & scripts
├── requirements.txt            # Project requirements reference
├── vite.config.js              # Vite configuration
└── .gitignore                  # Git ignore rules
```

## Usage Guide

1. **Faculty Tab** — Add or remove faculty members with their name and department.
2. **Branches Tab** — Define branches/departments (e.g., CSE, ECE) with semester and student count.
3. **Subjects Tab** — Add subjects specifying the code, assigned branch, faculty, weekly class frequency, and type (Theory/Lab).
4. **Rooms & Labs Tab** — Add classrooms and labs with seating capacity.
5. **Timing Tab** — Select working days (Mon–Sat) and time slots (09:00–17:00).
6. **Generate** — Click "Generate Quantum Timetable" and view the conflict-free schedules, stats, and utilization charts.

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR     |
| `npm run build`   | Production build to `dist/`        |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run Oxlint for code quality checks |

## License

This project is open source and available under the [MIT License](LICENSE).

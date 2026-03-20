# OS Scheduling Visualizer

Interactive visualization of CPU scheduling algorithms with real-time Gantt charts and performance statistics.

## Algorithms

| Algorithm | Description |
|-----------|-------------|
| **FCFS** | First Come First Served — processes run in arrival order |
| **SJF** | Shortest Job First (non-preemptive) — picks shortest burst among available processes |
| **Priority** | Non-preemptive Priority — lower number = higher priority |
| **Round Robin** | Time-quantum based with configurable quantum |

## Features

- Add processes manually or generate random batches
- Edit arrival time, burst time, and priority per process
- Canvas-based Gantt chart with color-coded processes
- Per-process stats: completion time, turnaround time, waiting time, response time
- Aggregate averages + CPU utilization
- Supports 100+ processes

## Project Structure

```
src/
├── algorithms/
│   └── index.js          # Pure scheduling functions (no React)
├── components/
│   ├── Controls.jsx       # Algorithm selector + toolbar
│   ├── GanttChart.jsx     # Canvas-based Gantt renderer
│   ├── Legend.jsx         # Process color legend
│   ├── ProcessTable.jsx   # Editable process input table
│   └── StatsPanel.jsx     # Stats grid + breakdown table
├── hooks/
│   └── useScheduler.js    # Central state + run logic
├── utils/
│   └── colors.js          # Color palette utilities
├── App.jsx
└── App.css
```

## Setup

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Algorithm Details

### FCFS
Sort by arrival time, run each process to completion. No preemption.

### SJF (Non-preemptive)
At each scheduling decision, pick the process with the smallest burst time among all arrived processes.

### Priority (Non-preemptive)  
Same as SJF but ranks by `priority` field. Lower value = higher priority.

### Round Robin
Uses a FIFO ready queue. Each process gets at most `quantum` ms of CPU time before being re-enqueued if burst remains. Newly arrived processes are enqueued when the current quantum ends.

## Stats Formulas

- **Completion Time (CT)** = time when process last leaves CPU
- **Turnaround Time (TAT)** = CT − Arrival Time
- **Waiting Time (WT)** = TAT − Burst Time
- **Response Time (RT)** = first CPU start − Arrival Time
- **CPU Utilization** = (total burst time / total schedule time) × 100%

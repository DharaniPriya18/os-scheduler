# ⚙️ OS Scheduling Algorithm Visualizer

> An interactive web tool that brings CPU scheduling algorithms to life — visualize how your operating system decides which process runs next.

🔗 **[Live Demo](https://os-scheduler-dp.vercel.app/)** ← *(replace with your Vercel URL)*

---

## 📸 Overview

Understanding CPU scheduling is one of the core concepts in Operating Systems. This project makes it visual and interactive — you can add processes, pick an algorithm, and instantly see a **real-time Gantt chart** along with key performance metrics like waiting time and turnaround time.

Built entirely from scratch using React and the Canvas API — no chart libraries, no shortcuts.

---

## ✨ Features

- 🎯 **4 Scheduling Algorithms** — FCFS, SJF, Priority, and Round Robin
- 📊 **Real-time Gantt Chart** — rendered using the HTML5 Canvas API, color-coded per process
- 📈 **Performance Metrics** — average waiting time, turnaround time, response time, and CPU utilization
- 🔢 **Per-process Breakdown** — completion time, turnaround, waiting, and response time for every process
- ➕ **Dynamic Process Management** — add, edit, and remove processes on the fly
- 🎲 **Random Process Generator** — instantly populate with random processes for quick testing
- ⚡ **Supports 100+ Processes** — efficiently handles large process sets without performance issues
- 🌙 **Dark Theme** — clean terminal-inspired dark UI

---

## 🧠 Algorithms Explained

| Algorithm | Type | Description |
|-----------|------|-------------|
| **FCFS** | Non-preemptive | Processes execute in the order they arrive. Simple but can cause the convoy effect. |
| **SJF** | Non-preemptive | The process with the shortest burst time among arrived processes is picked next. Minimizes average waiting time. |
| **Priority** | Non-preemptive | Each process has a priority value. Lower number = higher priority. Risk of starvation for low-priority processes. |
| **Round Robin** | Preemptive | Each process gets a fixed time quantum. If not finished, it re-enters the queue. Fair and widely used in real OSes. |

---

## 📐 How It Works

### 1. Input Layer
Users define processes with:
- **Arrival Time** — when the process enters the ready queue
- **Burst Time** — how long the process needs the CPU
- **Priority** — used only in Priority scheduling (lower = higher priority)
- **Time Quantum** — used only in Round Robin

### 2. Algorithm Engine
Each algorithm is a **pure JavaScript function** that takes a `processes[]` array and returns a `schedule[]` array of `{ pid, start, end }` blocks. Zero dependencies — easy to test and extend.

```
Completion Time  = last end time of a process
Turnaround Time  = Completion Time − Arrival Time
Waiting Time     = Turnaround Time − Burst Time
Response Time    = First CPU start − Arrival Time
CPU Utilization  = (Total Burst / Total Time) × 100%
```

### 3. Gantt Chart Rendering
The Gantt chart is drawn entirely with the **HTML5 Canvas API**:
- Each schedule block maps to `x = (start / total) * canvasWidth`
- Processes are color-coded using a 16-color palette
- Tick marks and time labels are drawn dynamically
- Supports device pixel ratio (DPR) scaling for sharp rendering on retina displays

### 4. Statistics Engine
After scheduling, the app computes per-process stats and aggregates them into averages displayed as metric cards.

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/Canvas_API-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JetBrains Mono](https://img.shields.io/badge/JetBrains_Mono-000000?style=for-the-badge&logo=jetbrains&logoColor=white)
![IBM Plex Sans](https://img.shields.io/badge/IBM_Plex_Sans-054ADA?style=for-the-badge&logo=ibm&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> No external chart libraries. No UI frameworks. Just React + Canvas.

---

## 📁 Project Structure

```
os-scheduler/
├── public/
│   └── index.html
├── src/
│   ├── algorithms/
│   │   └── index.js          # Pure scheduling functions (FCFS, SJF, Priority, RR)
│   ├── components/
│   │   ├── Controls.jsx       # Algorithm selector + toolbar
│   │   ├── GanttChart.jsx     # Canvas-based Gantt chart renderer
│   │   ├── Legend.jsx         # Process color legend
│   │   ├── ProcessTable.jsx   # Editable process input table
│   │   └── StatsPanel.jsx     # Stats grid + per-process breakdown
│   ├── hooks/
│   │   └── useScheduler.js    # Central state management + run logic
│   ├── utils/
│   │   └── colors.js          # Color palette for process mapping
│   ├── App.jsx
│   └── App.css
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/os-scheduler.git

# Navigate into the project
cd os-scheduler

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🔮 What I Learned

- How CPU scheduling algorithms work under the hood in real operating systems
- Canvas API rendering — drawing, scaling for retina displays, and dynamic tick generation
- Structuring React apps with clean separation between UI, logic, and state
- How to compute OS performance metrics (TAT, WT, RT, CPU utilization)

---

## 📬 Contact

Feel free to reach out or connect!

- GitHub: [@your-username](https://github.com/DharaniPriya18)

---

<p align="center">Made with ❤️ and a lot of process queues</p>

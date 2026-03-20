// App.jsx
import './App.css';
import { useScheduler } from './hooks/useScheduler';
import Controls from './components/Controls';
import ProcessTable from './components/ProcessTable';
import GanttChart from './components/GanttChart';
import StatsPanel from './components/StatsPanel';
import Legend from './components/Legend';

const ALGO_LABELS = {
  fcfs: 'First Come First Served',
  sjf: 'Shortest Job First',
  priority: 'Priority Scheduling',
  rr: 'Round Robin',
};

export default function App() {
  const {
    processes, algorithm, quantum, schedule, stats, avgStats, hasRun,
    setAlgorithm, setQuantum,
    addProcess, addRandom, removeProcess, updateProcess, clearAll, run,
  } = useScheduler();

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="header-title">
            <span className="header-tag">OS</span>
            <h1>Scheduling Visualizer</h1>
          </div>
          <span className="header-algo">{ALGO_LABELS[algorithm]}</span>
        </div>
      </header>

      <main className="main">
        <section className="card">
          <h2 className="card-title">Algorithm &amp; Controls</h2>
          <Controls
            algorithm={algorithm}
            quantum={quantum}
            onAlgoChange={setAlgorithm}
            onQuantumChange={setQuantum}
            onAdd={addProcess}
            onAddRandom={addRandom}
            onClear={clearAll}
            onRun={run}
            processCount={processes.length}
          />
        </section>

        <section className="card">
          <div className="card-header-row">
            <h2 className="card-title">Processes</h2>
            <span className="count-badge">{processes.length}</span>
          </div>
          <ProcessTable
            processes={processes}
            algorithm={algorithm}
            onUpdate={updateProcess}
            onRemove={removeProcess}
          />
        </section>

        {hasRun && (
          <>
            <section className="card">
              <div className="card-header-row">
                <h2 className="card-title">Gantt Chart</h2>
                <Legend processes={processes} />
              </div>
              <GanttChart schedule={schedule} processes={processes} />
            </section>

            <section className="card">
              <h2 className="card-title">Statistics</h2>
              <StatsPanel
                stats={stats}
                avgStats={avgStats}
                processes={processes}
                schedule={schedule}
              />
            </section>
          </>
        )}

        {!hasRun && processes.length > 0 && (
          <div className="hint-banner">
            Press <kbd>▶ Run</kbd> to visualize the schedule
          </div>
        )}
      </main>
    </div>
  );
}

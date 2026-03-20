// components/Controls.jsx

const ALGORITHMS = [
  { value: 'fcfs',     label: 'FCFS',                desc: 'First Come First Served' },
  { value: 'sjf',      label: 'SJF',                 desc: 'Shortest Job First' },
  { value: 'priority', label: 'Priority',             desc: 'Non-preemptive Priority' },
  { value: 'rr',       label: 'Round Robin',          desc: 'Time Quantum Scheduling' },
];

export default function Controls({
  algorithm, quantum, onAlgoChange, onQuantumChange,
  onAdd, onAddRandom, onClear, onRun,
  processCount
}) {
  return (
    <div className="controls-wrap">
      <div className="algo-cards">
        {ALGORITHMS.map(a => (
          <button
            key={a.value}
            className={`algo-card ${algorithm === a.value ? 'active' : ''}`}
            onClick={() => onAlgoChange(a.value)}
          >
            <span className="algo-name">{a.label}</span>
            <span className="algo-desc">{a.desc}</span>
          </button>
        ))}
      </div>

      {algorithm === 'rr' && (
        <div className="quantum-row">
          <label className="field-label">Time Quantum</label>
          <input
            type="number"
            min="1"
            max="99"
            value={quantum}
            onChange={e => onQuantumChange(+e.target.value)}
            className="quantum-input"
          />
          <span className="field-label">ms</span>
        </div>
      )}

      <div className="toolbar">
        <button className="btn" onClick={onAdd}>+ Process</button>
        <button className="btn" onClick={() => onAddRandom(5)}>+ Random ×5</button>
        <button className="btn danger" onClick={onClear} disabled={processCount === 0}>Clear all</button>
        <button
          className="btn primary"
          onClick={onRun}
          disabled={processCount === 0}
        >
          ▶ Run
        </button>
      </div>
    </div>
  );
}

// components/StatsPanel.jsx
import { getColor } from '../utils/colors';

function StatCard({ label, value, unit = '' }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}<span className="stat-unit">{unit}</span></div>
    </div>
  );
}

export default function StatsPanel({ stats, avgStats, processes, schedule }) {
  if (!stats.length || !avgStats) return null;

  const totalTime = Math.max(...schedule.map(b => b.end));
  const burstTotal = processes.reduce((s, p) => s + p.burstTime, 0);
  const utilization = ((burstTotal / totalTime) * 100).toFixed(1);

  return (
    <div className="stats-section">
      <div className="stats-grid">
        <StatCard label="Avg Waiting Time" value={avgStats.avgWT} unit=" ms" />
        <StatCard label="Avg Turnaround" value={avgStats.avgTAT} unit=" ms" />
        <StatCard label="Avg Response Time" value={avgStats.avgRT} unit=" ms" />
        <StatCard label="CPU Utilization" value={utilization} unit="%" />
        <StatCard label="Total Time" value={totalTime} unit=" ms" />
        <StatCard label="Processes" value={processes.length} />
      </div>

      <div className="breakdown-wrap">
        <h3 className="section-title">Per-process breakdown</h3>
        <div className="table-wrap">
          <table className="result-table">
            <thead>
              <tr>
                <th>Process</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Completion</th>
                <th>Turnaround</th>
                <th>Waiting</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s, i) => {
                const proc = processes.find(p => p.id === s.id);
                return (
                  <tr key={s.id}>
                    <td>
                      <span className="pid-dot" style={{ background: getColor(i) }} />
                      <span className="pid-label">{s.id}</span>
                    </td>
                    <td>{proc?.arrivalTime}</td>
                    <td>{proc?.burstTime}</td>
                    <td className="highlight">{s.completionTime}</td>
                    <td>{s.turnaroundTime}</td>
                    <td>{s.waitingTime}</td>
                    <td>{s.responseTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

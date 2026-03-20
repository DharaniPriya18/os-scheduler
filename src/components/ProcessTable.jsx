// components/ProcessTable.jsx
import { getColor } from '../utils/colors';

export default function ProcessTable({
  processes, algorithm, onUpdate, onRemove
}) {
  const showPriority = algorithm === 'priority';

  return (
    <div className="table-wrap">
      <table className="proc-table">
        <thead>
          <tr>
            <th>Process</th>
            <th>Arrival</th>
            <th>Burst</th>
            {showPriority && <th>Priority</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p, i) => (
            <tr key={p.id}>
              <td>
                <span className="pid-dot" style={{ background: getColor(i) }} />
                <span className="pid-label">{p.id}</span>
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={p.arrivalTime}
                  onChange={e => onUpdate(p.id, 'arrivalTime', e.target.value)}
                  className="num-input"
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={p.burstTime}
                  onChange={e => onUpdate(p.id, 'burstTime', e.target.value)}
                  className="num-input"
                />
              </td>
              {showPriority && (
                <td>
                  <input
                    type="number"
                    min="1"
                    value={p.priority}
                    onChange={e => onUpdate(p.id, 'priority', e.target.value)}
                    className="num-input"
                  />
                </td>
              )}
              <td>
                <button className="del-btn" onClick={() => onRemove(p.id)}>✕</button>
              </td>
            </tr>
          ))}
          {processes.length === 0 && (
            <tr>
              <td colSpan="5" className="empty-row">No processes — add some above</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

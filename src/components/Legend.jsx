// components/Legend.jsx
import { getColor } from '../utils/colors';

export default function Legend({ processes }) {
  if (!processes.length) return null;
  return (
    <div className="legend">
      {processes.map((p, i) => (
        <span key={p.id} className="legend-item">
          <span className="legend-dot" style={{ background: getColor(i) }} />
          {p.id}
        </span>
      ))}
    </div>
  );
}

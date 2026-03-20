// components/GanttChart.jsx
import { useRef, useEffect } from 'react';
import { getColorMap } from '../utils/colors';

const ROW_H = 48;
const LABEL_W = 54;
const TICK_H = 18;
const PAD_X = 8;
const PAD_TOP = 8;

export default function GanttChart({ schedule, processes }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!schedule.length || !processes.length) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const colorMap = getColorMap(processes);
    const totalTime = Math.max(...schedule.map(b => b.end));
    const dpr = window.devicePixelRatio || 1;

    const containerW = canvas.parentElement.clientWidth || 800;
    const W = containerW;
    const H = ROW_H + TICK_H + PAD_TOP + 8;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const drawW = W - LABEL_W - PAD_X * 2;

    // Background stripe
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
    ctx.beginPath();
    ctx.roundRect(LABEL_W, PAD_TOP, drawW, ROW_H, 4);
    ctx.fill();

    // Draw blocks
    schedule.forEach(block => {
      const x = LABEL_W + (block.start / totalTime) * drawW;
      const w = Math.max(2, ((block.end - block.start) / totalTime) * drawW);
      const color = colorMap[block.pid];

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x + 1, PAD_TOP + 2, w - 2, ROW_H - 4, 3);
      ctx.fill();

      // Label inside block if wide enough
      if (w > 26) {
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.font = `500 11px 'JetBrains Mono', 'Fira Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const label = block.pid;
        ctx.fillText(label, x + w / 2, PAD_TOP + ROW_H / 2);
      }
    });

    // Tick marks and labels
    ctx.font = `10px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

    const ticks = new Set([0, totalTime]);
    schedule.forEach(b => { ticks.add(b.start); ticks.add(b.end); });

    const sortedTicks = [...ticks].sort((a, b) => a - b);

    // Avoid overlapping labels — skip if too close
    let lastLabelX = -999;
    sortedTicks.forEach(t => {
      const x = LABEL_W + (t / totalTime) * drawW;
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x, PAD_TOP + ROW_H);
      ctx.lineTo(x, PAD_TOP + ROW_H + 5);
      ctx.stroke();

      if (x - lastLabelX > 18) {
        ctx.fillStyle = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
        ctx.fillText(t, x, PAD_TOP + ROW_H + 6);
        lastLabelX = x;
      }
    });

    // Y-axis label
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)';
    ctx.font = `10px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('CPU', LABEL_W - 8, PAD_TOP + ROW_H / 2);

  }, [schedule, processes]);

  if (!schedule.length) return null;

  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <canvas ref={canvasRef} style={{ display: 'block', minWidth: 300 }} />
    </div>
  );
}

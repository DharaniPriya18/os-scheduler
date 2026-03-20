// utils/colors.js

const PALETTE = [
  '#378ADD', '#1D9E75', '#D85A30', '#D4537E',
  '#BA7517', '#7F77DD', '#639922', '#0F6E56',
  '#534AB7', '#A32D2D', '#0D7A8A', '#C4732A',
  '#5B4EA8', '#2E8B57', '#CC5500', '#7B3F7C',
];

export function getColor(index) {
  return PALETTE[index % PALETTE.length];
}

export function getColorMap(processes) {
  const map = {};
  processes.forEach((p, i) => { map[p.id] = getColor(i); });
  return map;
}

export function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

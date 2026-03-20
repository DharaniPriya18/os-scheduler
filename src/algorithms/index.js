// algorithms/index.js
// Each algorithm returns: Schedule[] = { pid, start, end }[]

export function fcfs(processes) {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let t = 0;
  const schedule = [];
  for (const p of sorted) {
    if (t < p.arrivalTime) t = p.arrivalTime;
    schedule.push({ pid: p.id, start: t, end: t + p.burstTime });
    t += p.burstTime;
  }
  return schedule;
}

export function sjf(processes) {
  let t = 0;
  const schedule = [];
  const remaining = processes.map(p => ({ ...p }));

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrivalTime <= t);
    if (available.length === 0) {
      t = Math.min(...remaining.map(p => p.arrivalTime));
      continue;
    }
    available.sort((a, b) => a.burstTime - b.burstTime);
    const chosen = available[0];
    const idx = remaining.findIndex(p => p.id === chosen.id);
    remaining.splice(idx, 1);
    schedule.push({ pid: chosen.id, start: t, end: t + chosen.burstTime });
    t += chosen.burstTime;
  }
  return schedule;
}

export function prioritySchedule(processes) {
  // Lower number = higher priority
  let t = 0;
  const schedule = [];
  const remaining = processes.map(p => ({ ...p }));

  while (remaining.length > 0) {
    const available = remaining.filter(p => p.arrivalTime <= t);
    if (available.length === 0) {
      t = Math.min(...remaining.map(p => p.arrivalTime));
      continue;
    }
    available.sort((a, b) => a.priority - b.priority);
    const chosen = available[0];
    const idx = remaining.findIndex(p => p.id === chosen.id);
    remaining.splice(idx, 1);
    schedule.push({ pid: chosen.id, start: t, end: t + chosen.burstTime });
    t += chosen.burstTime;
  }
  return schedule;
}

export function roundRobin(processes, quantum) {
  const schedule = [];
  const remaining = processes
    .map(p => ({ ...p, remainingBurst: p.burstTime }))
    .sort((a, b) => a.arrivalTime - b.arrivalTime);

  let t = 0;
  let queue = [];
  let i = 0;

  // Enqueue all arriving at t=0
  while (i < remaining.length && remaining[i].arrivalTime <= t) {
    queue.push(remaining[i++]);
  }

  while (queue.length > 0) {
    const p = queue.shift();
    const run = Math.min(p.remainingBurst, quantum);
    schedule.push({ pid: p.id, start: t, end: t + run });
    t += run;
    p.remainingBurst -= run;

    // Enqueue newly arrived processes
    while (i < remaining.length && remaining[i].arrivalTime <= t) {
      queue.push(remaining[i++]);
    }

    if (p.remainingBurst > 0) queue.push(p);
  }

  return schedule;
}

export function computeStats(processes, schedule) {
  return processes.map(p => {
    const blocks = schedule.filter(b => b.pid === p.id);
    const completionTime = Math.max(...blocks.map(b => b.end));
    const turnaroundTime = completionTime - p.arrivalTime;
    const waitingTime = turnaroundTime - p.burstTime;
    const responseTime = Math.min(...blocks.map(b => b.start)) - p.arrivalTime;
    return {
      id: p.id,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime: Math.max(0, responseTime),
    };
  });
}

export function averageStats(stats) {
  const n = stats.length;
  return {
    avgWT: +(stats.reduce((s, p) => s + p.waitingTime, 0) / n).toFixed(2),
    avgTAT: +(stats.reduce((s, p) => s + p.turnaroundTime, 0) / n).toFixed(2),
    avgRT: +(stats.reduce((s, p) => s + p.responseTime, 0) / n).toFixed(2),
  };
}

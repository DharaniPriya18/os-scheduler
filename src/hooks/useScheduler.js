// hooks/useScheduler.js
import { useState, useCallback } from 'react';
import {
  fcfs, sjf, prioritySchedule, roundRobin,
  computeStats, averageStats
} from '../algorithms';

let nextId = 1;

function makeProcess(at = 0, bt = 4, pr = 1) {
  return { id: `P${nextId++}`, arrivalTime: at, burstTime: bt, priority: pr };
}

const DEFAULT_PROCESSES = [
  makeProcess(0, 6, 2),
  makeProcess(1, 4, 1),
  makeProcess(2, 2, 3),
  makeProcess(4, 5, 2),
  makeProcess(5, 3, 1),
];

export function useScheduler() {
  const [processes, setProcesses] = useState(DEFAULT_PROCESSES);
  const [algorithm, setAlgorithm] = useState('rr');
  const [quantum, setQuantum] = useState(2);
  const [schedule, setSchedule] = useState([]);
  const [stats, setStats] = useState([]);
  const [avgStats, setAvgStats] = useState(null);
  const [hasRun, setHasRun] = useState(false);

  const addProcess = useCallback(() => {
    setProcesses(prev => [...prev, makeProcess(0, 4, 1)]);
  }, []);

  const addRandom = useCallback((count = 5) => {
    const newProcs = Array.from({ length: count }, () =>
      makeProcess(
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 10) + 1,
        Math.floor(Math.random() * 5) + 1
      )
    );
    setProcesses(prev => [...prev, ...newProcs]);
  }, []);

  const removeProcess = useCallback((id) => {
    setProcesses(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateProcess = useCallback((id, field, value) => {
    setProcesses(prev =>
      prev.map(p => p.id === id ? { ...p, [field]: Math.max(0, +value) } : p)
    );
  }, []);

  const clearAll = useCallback(() => {
    setProcesses([]);
    setSchedule([]);
    setStats([]);
    setAvgStats(null);
    setHasRun(false);
  }, []);

  const run = useCallback(() => {
    if (processes.length === 0) return;

    let result;
    switch (algorithm) {
      case 'fcfs':    result = fcfs(processes); break;
      case 'sjf':     result = sjf(processes); break;
      case 'priority': result = prioritySchedule(processes); break;
      case 'rr':      result = roundRobin(processes, quantum); break;
      default:        result = fcfs(processes);
    }

    const s = computeStats(processes, result);
    const avg = averageStats(s);
    setSchedule(result);
    setStats(s);
    setAvgStats(avg);
    setHasRun(true);
  }, [processes, algorithm, quantum]);

  return {
    processes, algorithm, quantum, schedule, stats, avgStats, hasRun,
    setAlgorithm, setQuantum,
    addProcess, addRandom, removeProcess, updateProcess, clearAll, run,
  };
}

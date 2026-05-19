import { useState, useEffect, useRef, useCallback } from "react";

export function useStopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => { setRunning(false); setTime(0); }, []);
  const toggle = useCallback(() => setRunning((r) => !r), []);

  return { time, running, start, pause, reset, toggle };
}

export function useCountdown(initialSeconds = 60) {
  const [time, setTime] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (running && time > 0) {
      ref.current = setInterval(() => {
        setTime((t) => {
          if (t <= 1) {
            setRunning(false);
            setFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  const start = useCallback(() => { setFinished(false); setRunning(true); }, []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback((secs) => {
    clearInterval(ref.current);
    setRunning(false);
    setFinished(false);
    setTime(secs ?? initialSeconds);
  }, [initialSeconds]);
  const toggle = useCallback(() => setRunning((r) => !r), []);

  return { time, running, finished, start, pause, reset, toggle };
}

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

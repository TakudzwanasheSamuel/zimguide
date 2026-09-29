'use client';

import { useEffect, useRef, useState } from 'react';

/** Smoothly animate a numeric value toward a target. */
export function useAnimatedNumber(target: number, duration = 600) {
  const [value, setValue] = useState(target);
  const frameRef = useRef<number>();
  const startRef = useRef({ value: target, time: 0 });

  useEffect(() => {
    const from = value;
    const start = performance.now();
    startRef.current = { value: from, time: start };

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}

/** Smoothly animate progress percentage toward polled backend value. */
export function useAnimatedProgress(target: number, isActive: boolean) {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!isActive && target === 0) {
      setProgress(0);
      return;
    }

    const from = progress;
    const start = performance.now();
    const duration = 400;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (target - from) * eased;
      setProgress(next);
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, isActive]);

  return progress;
}

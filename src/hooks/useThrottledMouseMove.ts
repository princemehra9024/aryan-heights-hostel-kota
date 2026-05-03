import { useEffect } from "react";

/**
 * Attaches a throttled mousemove listener.
 * `fps` controls how many updates per second (default: 60).
 * This prevents the cursor from firing hundreds of callbacks
 * per second and blocking the main thread.
 */
export const useThrottledMouseMove = (
  callback: (e: MouseEvent) => void,
  fps = 60
) => {
  useEffect(() => {
    let last = 0;
    const interval = 1000 / fps;

    const handler = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last >= interval) {
        last = now;
        callback(e);
      }
    };

    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [callback, fps]);
};

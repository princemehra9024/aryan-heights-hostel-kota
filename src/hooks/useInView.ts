import { useEffect, useState, useRef, RefObject } from "react";

/**
 * Returns true once the referenced element enters the viewport.
 * After that, stays true forever (one-shot lazy load trigger).
 *
 * Usage:
 *   const ref = useRef<HTMLElement>(null);
 *   const visible = useInView(ref, "0px 0px -100px 0px");
 */
export const useInView = (
  ref: RefObject<Element>,
  rootMargin = "0px 0px -80px 0px"
): boolean => {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ref.current || visible) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin }
    );

    observerRef.current.observe(ref.current);

    return () => observerRef.current?.disconnect();
  }, [ref, rootMargin, visible]);

  return visible;
};

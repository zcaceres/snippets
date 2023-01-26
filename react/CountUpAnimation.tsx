import { useEffect, useRef } from 'react';

interface CountUpProps {
  value: number | string;
  animationDuration?: number;
  frameDuration?: number;
  formatter?: (str: string | number | null) => string;
}

const easeOutQuad = (t) => t * (2 - t);
export function CountUp(props: CountUpProps) {
  const elemRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!elemRef.current) return () => {};

    const animationDuration = props.animationDuration || 500;
    const frameDuration = props.frameDuration || 10;

    const countTo = parseInt(elemRef.current.innerHTML, 10);
    const countFrom = countTo * 0.05;
    const totalFrames = Math.round(animationDuration / frameDuration);

    if (!countTo) return () => {};

    let frame = 0;
    const counter = setInterval(() => {
      frame += 1;

      if (!elemRef.current) return;

      const progress = easeOutQuad(frame / totalFrames);
      const currentCount = Math.round(countFrom * progress) + countTo;
      const displayCount = parseInt(elemRef.current.innerHTML, 10);

      if (displayCount !== currentCount) {
        const formattedCount = props.formatter?.(currentCount) || currentCount;
        if (elemRef.current) {
          elemRef.current.innerHTML = String(formattedCount);
        }
      }

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [props.value]);

  return <span ref={elemRef}>{props.value}</span>;
}
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({ target, decimals = 0, className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60 FPS

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return target >= 1000 ? Math.round(num).toLocaleString() : Math.round(num).toString();
  };

  return (
    <div ref={ref} className={className}>
      {formatNumber(count)}
    </div>
  );
}

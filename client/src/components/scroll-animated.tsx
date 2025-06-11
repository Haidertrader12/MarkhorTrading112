import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollAnimatedProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollAnimated({ children, className = "", delay = 0 }: ScrollAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut", 
        delay: delay / 1000 
      }}
    >
      {children}
    </motion.div>
  );
}

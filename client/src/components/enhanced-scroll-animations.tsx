import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface EnhancedScrollAnimatedProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate' | 'fade' | 'blur';
  duration?: number;
  distance?: number;
}

export default function EnhancedScrollAnimated({ 
  children, 
  className = "", 
  delay = 0, 
  direction = 'up',
  duration = 0.8
}: EnhancedScrollAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 60 };
      case 'down': return { opacity: 0, y: -60 };
      case 'left': return { opacity: 0, x: 60 };
      case 'right': return { opacity: 0, x: -60 };
      case 'scale': return { opacity: 0, scale: 0.8 };
      case 'rotate': return { opacity: 0, rotate: -180, scale: 0.5 };
      default: return { opacity: 0, y: 60 };
    }
  };

  const getFinalTransform = () => {
    switch (direction) {
      case 'up': return { opacity: 1, y: 0 };
      case 'down': return { opacity: 1, y: 0 };
      case 'left': return { opacity: 1, x: 0 };
      case 'right': return { opacity: 1, x: 0 };
      case 'scale': return { opacity: 1, scale: 1 };
      case 'rotate': return { opacity: 1, rotate: 0, scale: 1 };
      default: return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialTransform()}
      animate={isInView ? getFinalTransform() : getInitialTransform()}
      transition={{ 
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: delay / 1000 
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxScrollProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxScroll({ children, offset = 50, className = "" }: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`${className} parallax-scroll`}
    >
      {children}
    </motion.div>
  );
}

interface MouseTrackingProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function MouseTracking({ children, className = "", intensity = 0.1 }: MouseTrackingProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={className}
      whileHover={{ 
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        ref.current.style.transform = `perspective(1000px) rotateX(${y * intensity}deg) rotateY(${x * intensity}deg) translateZ(20px)`;
      }}
      onMouseLeave={() => {
        if (!ref.current) return;
        ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }}
    >
      {children}
    </motion.div>
  );
}
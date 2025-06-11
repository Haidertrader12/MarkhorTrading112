import { useEffect, useRef } from "react";

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
}

export default function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollY = 0;
    let targetScrollY = 0;
    let animationId: number;

    const smoothScroll = () => {
      scrollY += (targetScrollY - scrollY) * 0.08;
      
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.transform = `translateY(${-scrollY}px)`;
      }

      if (Math.abs(targetScrollY - scrollY) > 0.1) {
        animationId = requestAnimationFrame(smoothScroll);
      }
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      if (!animationId) {
        animationId = requestAnimationFrame(smoothScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollY += e.deltaY * 0.5;
      targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));
      
      if (!animationId) {
        animationId = requestAnimationFrame(smoothScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div ref={scrollContainerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
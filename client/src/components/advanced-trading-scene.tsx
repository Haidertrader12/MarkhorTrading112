import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdvancedTradingScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Trading data visualization particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      type: 'bull' | 'bear' | 'neutral';
    }> = [];

    // Create particles
    for (let i = 0; i < 60; i++) {
      const type = Math.random() < 0.4 ? 'bull' : Math.random() < 0.7 ? 'bear' : 'neutral';
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 2,
        color: type === 'bull' ? '#10B981' : type === 'bear' ? '#EF4444' : '#F59E0B',
        alpha: Math.random() * 0.8 + 0.2,
        type
      });
    }

    // Trading connections
    const connections: Array<{
      from: number;
      to: number;
      strength: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      connections.push({
        from: Math.floor(Math.random() * particles.length),
        to: Math.floor(Math.random() * particles.length),
        strength: Math.random()
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      time += 0.01;

      // Draw connections
      connections.forEach(conn => {
        const from = particles[conn.from];
        const to = particles[conn.to];
        const distance = Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
        
        if (distance < 150) {
          ctx.save();
          ctx.globalAlpha = (1 - distance / 150) * conn.strength * 0.3;
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx + Math.sin(time + index * 0.1) * 0.5;
        particle.y += particle.vy + Math.cos(time + index * 0.1) * 0.5;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.offsetWidth, particle.x));
        particle.y = Math.max(0, Math.min(canvas.offsetHeight, particle.y));

        // Pulsing effect
        const pulse = 1 + Math.sin(time * 3 + index) * 0.3;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow effect
        ctx.globalAlpha = particle.alpha * 0.3;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <Card className="ultra-glass border-primary/30 overflow-hidden">
      <CardContent className="p-0 relative h-96">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
        <div className="absolute top-4 left-4 z-10">
          <div className="text-sm font-mono text-primary">LIVE MARKET DATA</div>
          <div className="text-xs text-muted-foreground">Real-time Trading Network</div>
        </div>
        <div className="absolute bottom-4 right-4 z-10 flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-emerald-500">Bull Signals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-red-500">Bear Signals</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
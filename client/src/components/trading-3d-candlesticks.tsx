import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const generateTradingData = (count: number = 20): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let basePrice = 45000;

  for (let i = 0; i < count; i++) {
    const volatility = 0.008 + Math.random() * 0.012;
    const trend = Math.sin(i / 6) * 0.002;
    const noise = (Math.random() - 0.5) * volatility;

    const open = basePrice;
    const priceChange = trend + noise;
    const close = open * (1 + priceChange);

    const intradayVol = volatility * 0.6;
    const high = Math.max(open, close) * (1 + Math.random() * intradayVol);
    const low = Math.min(open, close) * (1 - Math.random() * intradayVol);

    data.push({
      time: Date.now() - (count - i) * 3600000,
      open,
      high,
      low,
      close,
      volume: 800000 + Math.random() * 400000
    });

    basePrice = close;
  }

  return data;
};

export default function Trading3DCandlesticks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const candlesticksRef = useRef<any[]>([]);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    import("three").then((THREE) => {
      const container = containerRef.current;
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Generate trading data
      const tradingData = generateTradingData(15);
      const candlesticks: any[] = [];

      // Create 3D candlesticks
      tradingData.forEach((candle, index) => {
        const x = (index - tradingData.length / 2) * 1.5;
        const isGreen = candle.close > candle.open;

        // Normalize prices for 3D visualization
        const priceScale = 0.01;
        const openY = candle.open * priceScale - 450;
        const closeY = candle.close * priceScale - 450;
        const highY = candle.high * priceScale - 450;
        const lowY = candle.low * priceScale - 450;

        // Create wick (thin line)
        const wickGeometry = new THREE.CylinderGeometry(0.02, 0.02, Math.abs(highY - lowY), 8);
        const wickMaterial = new THREE.MeshBasicMaterial({ 
          color: isGreen ? 0x10B981 : 0xEF4444,
          transparent: true,
          opacity: 0.8
        });
        const wick = new THREE.Mesh(wickGeometry, wickMaterial);
        wick.position.set(x, (highY + lowY) / 2, 0);
        scene.add(wick);

        // Create body (thick cylinder)
        const bodyHeight = Math.abs(closeY - openY);
        const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.15, bodyHeight || 0.1, 8);
        const bodyMaterial = new THREE.MeshBasicMaterial({ 
          color: isGreen ? 0x10B981 : 0xEF4444,
          transparent: true,
          opacity: isGreen ? 0.7 : 0.9
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(x, (openY + closeY) / 2, 0);
        scene.add(body);

        // Add glow effect
        const glowGeometry = new THREE.CylinderGeometry(0.2, 0.2, bodyHeight + 0.5, 8);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: isGreen ? 0x10B981 : 0xEF4444,
          transparent: true,
          opacity: 0.2
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(x, (openY + closeY) / 2, 0);
        scene.add(glow);

        // Volume bars in the background
        const volumeHeight = (candle.volume / 1000000) * 2;
        const volumeGeometry = new THREE.BoxGeometry(0.3, volumeHeight, 0.1);
        const volumeMaterial = new THREE.MeshBasicMaterial({
          color: isGreen ? 0x10B981 : 0xEF4444,
          transparent: true,
          opacity: 0.3
        });
        const volumeBar = new THREE.Mesh(volumeGeometry, volumeMaterial);
        volumeBar.position.set(x, volumeHeight / 2 - 5, -2);
        scene.add(volumeBar);

        candlesticks.push({ wick, body, glow, volumeBar, isGreen });
      });

      // Add grid
      const gridHelper = new THREE.GridHelper(20, 20, 0x10B981, 0x334155);
      gridHelper.position.y = -5;
      scene.add(gridHelper);

      // Market trend line
      const points = [];
      for (let i = 0; i < tradingData.length; i++) {
        const x = (i - tradingData.length / 2) * 1.5;
        const y = tradingData[i].close * 0.01 - 450;
        points.push(new THREE.Vector3(x, y, 0.5));
      }

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xF59E0B, 
        transparent: true, 
        opacity: 0.8,
        linewidth: 3
      });
      const trendLine = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(trendLine);

      camera.position.set(5, 2, 8);
      camera.lookAt(0, -2, 0);

      sceneRef.current = scene;
      rendererRef.current = renderer;
      candlesticksRef.current = candlesticks;

      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);

      function animate() {
        requestAnimationFrame(animate);

        // Animate candlesticks
        candlesticks.forEach((candlestick, index) => {
          const time = Date.now() * 0.001;

          // Subtle floating animation
          candlestick.body.position.y += Math.sin(time + index * 0.5) * 0.005;
          candlestick.wick.position.y += Math.sin(time + index * 0.5) * 0.005;
          candlestick.glow.position.y += Math.sin(time + index * 0.5) * 0.005;

          // Rotation for visual appeal
          candlestick.body.rotation.y += 0.002;
          candlestick.glow.rotation.y -= 0.001;

          // Volume bar animation
          candlestick.volumeBar.scale.y = 1 + Math.sin(time * 2 + index) * 0.1;
        });

        // Camera movement based on mouse
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(0, -2, 0);

        // Animate trend line
        trendLine.rotation.z = Math.sin(Date.now() * 0.0005) * 0.1;

        renderer.render(scene, camera);
      }

      animate();

      const handleResize = () => {
        if (container.offsetWidth > 0) {
          camera.aspect = container.offsetWidth / container.offsetHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.offsetWidth, container.offsetHeight);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    });

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <Card className="ultra-glass border-primary/30 overflow-hidden">
      <CardContent className="p-0 relative h-96">
        <div 
          ref={containerRef} 
          className="w-full h-full"
        />
        <div className="absolute top-4 left-4 z-10">
          <div className="text-sm font-mono text-primary">3D CANDLESTICK CHART</div>
          <div className="text-xs text-muted-foreground">Live Market Visualization</div>
        </div>
        <div className="absolute bottom-4 right-4 z-10 flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-emerald-500">Bullish</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-red-500">Bearish</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
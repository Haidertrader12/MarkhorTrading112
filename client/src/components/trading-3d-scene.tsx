import { useEffect, useRef } from "react";

export default function Trading3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const objectsRef = useRef<any[]>([]);

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

      const objects: any[] = [];

      // Trading Bull/Bear Symbols
      const bullGeometry = new THREE.ConeGeometry(0.5, 2, 8);
      const bullMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x10B981, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.8 
      });

      for (let i = 0; i < 4; i++) {
        const bull = new THREE.Mesh(bullGeometry, bullMaterial);
        bull.position.set(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 12
        );
        bull.rotation.set(0, 0, Math.PI);
        scene.add(bull);
        objects.push({ mesh: bull, type: 'bull', speed: 0.002 + Math.random() * 0.004 });
      }

      // Bear market symbols (inverted cones)
      const bearGeometry = new THREE.ConeGeometry(0.5, 2, 8);
      const bearMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xEF4444, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.8 
      });

      for (let i = 0; i < 4; i++) {
        const bear = new THREE.Mesh(bearGeometry, bearMaterial);
        bear.position.set(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 12
        );
        scene.add(bear);
        objects.push({ mesh: bear, type: 'bear', speed: 0.002 + Math.random() * 0.004 });
      }

      // Financial Chart Lines
      const chartPoints = [];
      for (let i = 0; i < 100; i++) {
        const x = (i - 50) * 0.2;
        const y = Math.sin(i * 0.1) * 2 + Math.cos(i * 0.05) * 1;
        const z = Math.cos(i * 0.08) * 1;
        chartPoints.push(new THREE.Vector3(x, y, z));
      }
      
      const chartGeometry = new THREE.BufferGeometry().setFromPoints(chartPoints);
      const chartMaterial = new THREE.LineBasicMaterial({ 
        color: 0xF59E0B, 
        transparent: true, 
        opacity: 0.7 
      });
      const chartLine = new THREE.Line(chartGeometry, chartMaterial);
      scene.add(chartLine);
      objects.push({ mesh: chartLine, type: 'chart', speed: 0.001 });

      // Currency Trading Symbols
      const currencyColors = [0xF59E0B, 0x3B82F6, 0x10B981];
      
      for (let i = 0; i < 3; i++) {
        // Create diamond-shaped currency symbols
        const geometry = new THREE.OctahedronGeometry(0.5, 0);
        const material = new THREE.MeshBasicMaterial({ 
          color: currencyColors[i], 
          transparent: true, 
          opacity: 0.7,
          wireframe: true
        });
        
        const currency = new THREE.Mesh(geometry, material);
        currency.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 10
        );
        scene.add(currency);
        objects.push({ mesh: currency, type: 'currency', speed: 0.002 + Math.random() * 0.003 });
      }

      // Trading Volume Bars
      for (let i = 0; i < 8; i++) {
        const height = Math.random() * 3 + 1;
        const barGeometry = new THREE.BoxGeometry(0.2, height, 0.2);
        const barMaterial = new THREE.MeshBasicMaterial({ 
          color: height > 2 ? 0x10B981 : 0xEF4444, 
          transparent: true, 
          opacity: 0.7 
        });
        
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        bar.position.set(
          (i - 4) * 1.5,
          height / 2 - 2,
          -8
        );
        scene.add(bar);
        objects.push({ mesh: bar, type: 'volume', speed: 0.005, originalHeight: height });
      }

      camera.position.set(0, 2, 12);
      camera.lookAt(0, 0, 0);

      sceneRef.current = scene;
      rendererRef.current = renderer;
      objectsRef.current = objects;

      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', handleMouseMove);

      function animate() {
        requestAnimationFrame(animate);
        
        objects.forEach((obj, index) => {
          const { mesh, type, speed } = obj;
          
          if (type === 'bull') {
            mesh.rotation.y += speed;
            mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
            mesh.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.01;
          } else if (type === 'bear') {
            mesh.rotation.y -= speed;
            mesh.position.y += Math.cos(Date.now() * 0.0012 + index) * 0.015;
            mesh.position.z += Math.sin(Date.now() * 0.0009 + index) * 0.01;
          } else if (type === 'chart') {
            mesh.rotation.y += speed * 0.5;
            mesh.position.y = Math.sin(Date.now() * 0.0005) * 0.5;
          } else if (type === 'currency') {
            mesh.rotation.x += speed * 2;
            mesh.rotation.z += speed * 1.5;
            mesh.position.y += Math.sin(Date.now() * 0.0007 + index) * 0.01;
          } else if (type === 'volume') {
            const newHeight = obj.originalHeight + Math.sin(Date.now() * 0.001 + index) * 0.5;
            mesh.scale.y = newHeight / obj.originalHeight;
            mesh.position.y = (newHeight / 2 - 2) * (newHeight / obj.originalHeight);
          }
        });

        // Smooth camera movement
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 3 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

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
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
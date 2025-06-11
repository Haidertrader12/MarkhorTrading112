import { useEffect, useRef } from "react";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const objectsRef = useRef<any[]>([]);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    // Dynamically import Three.js to avoid SSR issues
    import("three").then((THREE) => {
      const container = containerRef.current;
      if (!container) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Create multiple geometric shapes for trading visualization
      const objects: any[] = [];

      // Trading cubes with different materials
      const cubeGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const cubeMaterials = [
        new THREE.MeshBasicMaterial({ color: 0xF59E0B, wireframe: true, transparent: true, opacity: 0.7 }),
        new THREE.MeshBasicMaterial({ color: 0x3B82F6, wireframe: true, transparent: true, opacity: 0.6 }),
        new THREE.MeshBasicMaterial({ color: 0x10B981, wireframe: true, transparent: true, opacity: 0.8 }),
      ];

      for (let i = 0; i < 8; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterials[i % 3]);
        cube.position.set(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 15
        );
        cube.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        scene.add(cube);
        objects.push({ mesh: cube, type: 'cube', speed: 0.003 + Math.random() * 0.007 });
      }

      // Trading spheres for market data points
      const sphereGeometry = new THREE.SphereGeometry(0.5, 8, 6);
      const sphereMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xF59E0B, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.5 
      });

      for (let i = 0; i < 6; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 12
        );
        scene.add(sphere);
        objects.push({ mesh: sphere, type: 'sphere', speed: 0.002 + Math.random() * 0.005 });
      }

      // Trading rings for financial connections
      const ringGeometry = new THREE.RingGeometry(0.5, 1.2, 8);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x3B82F6, 
        transparent: true, 
        opacity: 0.4,
        side: THREE.DoubleSide
      });

      for (let i = 0; i < 4; i++) {
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 10
        );
        ring.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        scene.add(ring);
        objects.push({ mesh: ring, type: 'ring', speed: 0.001 + Math.random() * 0.003 });
      }

      // Financial graph lines
      const points = [];
      for (let i = 0; i < 50; i++) {
        points.push(new THREE.Vector3(
          (i - 25) * 0.2,
          Math.sin(i * 0.3) * 2,
          Math.cos(i * 0.2) * 1
        ));
      }
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x10B981, 
        transparent: true, 
        opacity: 0.6 
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.position.set(0, 0, -5);
      scene.add(line);
      objects.push({ mesh: line, type: 'line', speed: 0.001 });

      camera.position.set(0, 0, 8);
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
        
        // Animate objects based on their type
        objects.forEach((obj, index) => {
          const { mesh, type, speed } = obj;
          
          if (type === 'cube') {
            mesh.rotation.x += speed;
            mesh.rotation.y += speed * 1.2;
            mesh.rotation.z += speed * 0.8;
            mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
            mesh.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.01;
          } else if (type === 'sphere') {
            mesh.rotation.x += speed * 0.5;
            mesh.rotation.y += speed;
            mesh.position.y += Math.cos(Date.now() * 0.0012 + index) * 0.015;
            mesh.position.z += Math.sin(Date.now() * 0.0009 + index) * 0.01;
          } else if (type === 'ring') {
            mesh.rotation.x += speed * 2;
            mesh.rotation.z += speed * 1.5;
            mesh.position.x += Math.sin(Date.now() * 0.0007 + index) * 0.01;
          } else if (type === 'line') {
            mesh.rotation.y += speed * 0.5;
            mesh.position.y = Math.sin(Date.now() * 0.0005) * 0.5;
          }
        });

        // Camera movement based on mouse
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }

      animate();

      // Handle resize
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

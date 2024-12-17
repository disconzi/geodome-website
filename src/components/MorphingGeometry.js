import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MorphingGeometry = () => {
  const mountRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    let particles = [];
    const particleCount = 20000;
    const domeRadius = 120;
    const domeHeight = 70; 
    const frameThickness = 2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 40, 300);
    camera.lookAt(0, 0, 0);

    const createFrames = () => {
      const frameGeometry = new THREE.BufferGeometry();
      const framePositions = [];
      const frameColor = new THREE.Color(0xd35400);

      const rings = [Math.PI/6, Math.PI/3, Math.PI/2];
      rings.forEach(phi => {
        for (let theta = 0; theta < Math.PI * 2; theta += 0.1) {
          const x1 = domeRadius * Math.sin(phi) * Math.cos(theta);
          const y1 = (domeHeight/90) * domeRadius * Math.cos(phi);
          const z1 = domeRadius * Math.sin(phi) * Math.sin(theta);

          const x2 = domeRadius * Math.sin(phi) * Math.cos(theta + 0.1);
          const y2 = (domeHeight/90) * domeRadius * Math.cos(phi);
          const z2 = domeRadius * Math.sin(phi) * Math.sin(theta + 0.1);

          framePositions.push(x1, y1, z1);
          framePositions.push(x2, y2, z2);
        }
      });

      const verticalCount = 10;
      for (let i = 0; i < verticalCount; i++) {
        const theta = (i * Math.PI * 2) / verticalCount;
        for (let phi = 0; phi < Math.PI/2; phi += 0.1) {
          const x1 = domeRadius * Math.sin(phi) * Math.cos(theta);
          const y1 = (domeHeight/90) * domeRadius * Math.cos(phi);
          const z1 = domeRadius * Math.sin(phi) * Math.sin(theta);

          const x2 = domeRadius * Math.sin(phi + 0.1) * Math.cos(theta);
          const y2 = (domeHeight/90) * domeRadius * Math.cos(phi + 0.1);
          const z2 = domeRadius * Math.sin(phi + 0.1) * Math.sin(theta);

          framePositions.push(x1, y1, z1);
          framePositions.push(x2, y2, z2);
        }
      }

      frameGeometry.setAttribute('position', new THREE.Float32BufferAttribute(framePositions, 3));
      
      const frameMaterial = new THREE.LineBasicMaterial({ 
        color: frameColor,
        linewidth: 2,
        transparent: true,
        opacity: 0.8
      });

      const frameLines = new THREE.LineSegments(frameGeometry, frameMaterial);
      scene.add(frameLines);

      return frameLines;
    };

    const frames = createFrames();

    const createParticles = () => {
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const colors = [];

      const frameColor = new THREE.Color(0xd35400);
      const glassColor = new THREE.Color(0x95a5a6);

      const isOnFrame = (theta, phi) => {
        const rings = [Math.PI/6, Math.PI/3, Math.PI/2];
        for (let ring of rings) {
          if (Math.abs(phi - ring) < frameThickness/domeRadius) return true;
        }

        const verticalCount = 10;
        for (let i = 0; i < verticalCount; i++) {
          const frameTheta = (i * Math.PI * 2) / verticalCount;
          if (Math.abs(((theta + Math.PI * 2) % (Math.PI * 2)) - frameTheta) < frameThickness/domeRadius) return true;
        }

        return false;
      };

      for (let i = 0; i < particleCount; i++) {
        const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
        const phi = THREE.MathUtils.randFloat(0, Math.PI / 2);
        const radius = domeRadius + THREE.MathUtils.randFloat(-2, 2);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = (domeHeight/90) * radius * Math.cos(phi); 
        const z = radius * Math.sin(phi) * Math.sin(theta);

        if (y < 5 && Math.sqrt(x*x + z*z) < domeRadius * 1.2) {
          positions.push(x, 0, z);
          colors.push(0.6, 0.3, 0.1);
          particles.push({
            position: new THREE.Vector3(x, 0, z),
            originalPosition: new THREE.Vector3(x, 0, z),
            velocity: new THREE.Vector3(0, 0, 0)
          });
          continue;
        }

        positions.push(x, y, z);

        const isFrame = isOnFrame(theta, phi);
        const color = isFrame ? frameColor : glassColor;
        colors.push(color.r, color.g, color.b);

        particles.push({
          position: new THREE.Vector3(x, y, z),
          originalPosition: new THREE.Vector3(x, y, z),
          velocity: new THREE.Vector3(0, 0, 0)
        });
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      return { geometry, points };
    };

    const { geometry, points } = createParticles();

    const mouse = new THREE.Vector2();
    const mouseRadius = 30;
    const mouseStrength = 40; 

    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

      const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      particles.forEach((particle, i) => {
        const distance = particle.position.distanceTo(pos);
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const repulsion = pos.clone().sub(particle.position).normalize().multiplyScalar(-force * mouseStrength);
          particle.velocity.add(repulsion);
        }
      });
    };

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      particles.forEach((particle, i) => {
        particle.position.add(particle.velocity);

        const direction = particle.originalPosition.clone().sub(particle.position);
        const distance = direction.length();
        if (distance > 0.1) {
          direction.normalize().multiplyScalar(0.2); 
          particle.velocity.add(direction);
        }

        particle.velocity.multiplyScalar(0.85); 

        geometry.attributes.position.array[i * 3] = particle.position.x;
        geometry.attributes.position.array[i * 3 + 1] = particle.position.y;
        geometry.attributes.position.array[i * 3 + 2] = particle.position.z;
      });

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y += 0.0003;
      frames.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', handleResize);
    mountRef.current.addEventListener('mousemove', handleMouseMove);

    function handleResize() {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '600px' }} />;
};

export default MorphingGeometry;

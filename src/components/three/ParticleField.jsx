import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleField({ count = 250 }) {
  const meshRef = useRef();
  const scrollRef = useRef(0);

  // Track scroll
  if (typeof window !== "undefined") {
    window.addEventListener(
      "scroll",
      () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      },
      { passive: true }
    );
  }

  // Generate random particle positions
  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;  // z
      speeds[i] = 0.1 + Math.random() * 0.3;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, speeds, offsets };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    const posArray = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Gentle drift
      posArray[i3] = positions[i3] + Math.sin(t * speeds[i] + offsets[i]) * 0.5;
      posArray[i3 + 1] =
        positions[i3 + 1] +
        Math.cos(t * speeds[i] * 0.7 + offsets[i]) * 0.4 -
        scroll * 3; // Scroll pushes particles down
      posArray[i3 + 2] = positions[i3 + 2] + Math.sin(t * speeds[i] * 0.5) * 0.3;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Subtle rotation of entire field
    meshRef.current.rotation.y = t * 0.01;
    meshRef.current.rotation.x = scroll * 0.2;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#00d4aa"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingGeometry() {
  const icoRef = useRef();
  const torusRef = useRef();
  const octaRef = useRef();
  const ringRef = useRef();
  const scrollRef = useRef(0);

  // Track scroll position
  if (typeof window !== "undefined") {
    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
  }

  // Shared wireframe material
  const wireMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00d4aa",
        wireframe: true,
        transparent: true,
        opacity: 0.12,
        emissive: "#00d4aa",
        emissiveIntensity: 0.15,
      }),
    []
  );

  const solidMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00aaff",
        transparent: true,
        opacity: 0.04,
        emissive: "#00aaff",
        emissiveIntensity: 0.08,
        side: THREE.DoubleSide,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00ff88",
        wireframe: true,
        transparent: true,
        opacity: 0.08,
        emissive: "#00ff88",
        emissiveIntensity: 0.1,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;

    // Icosahedron — hero area, drifts right and up as scroll progresses
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.08 + scroll * Math.PI * 0.5;
      icoRef.current.rotation.y = t * 0.12;
      icoRef.current.rotation.z = t * 0.05;
      icoRef.current.position.x = -3.5 + scroll * 2;
      icoRef.current.position.y = 1.5 - scroll * 3;
      icoRef.current.scale.setScalar(1 + scroll * 0.3);
      icoRef.current.material.opacity = 0.12 - scroll * 0.06;
    }
    // Symmetrical Torus — skills area
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.05;
      torusRef.current.rotation.y = t * 0.08 + scroll * Math.PI;
      const torusProgress = Math.max(0, (scroll - 0.2) * 2.5);
      torusRef.current.position.x = 3.5 - torusProgress * 1.5;
      torusRef.current.position.y = -1 + Math.sin(t * 0.3) * 0.3;
      torusRef.current.position.z = -2 + torusProgress * 0.5;
      torusRef.current.material.opacity = Math.min(0.1, torusProgress * 0.1);
    }

    // Octahedron — repos/contact area
    if (octaRef.current) {
      octaRef.current.rotation.x = t * 0.15;
      octaRef.current.rotation.z = t * 0.08;
      const octaProgress = Math.max(0, (scroll - 0.5) * 2);
      octaRef.current.position.x = -2.5 + Math.sin(t * 0.2) * 0.5;
      octaRef.current.position.y = -2.5 + octaProgress * 2;
      octaRef.current.scale.setScalar(0.6 + octaProgress * 0.4);
      octaRef.current.material.opacity = Math.min(0.08, octaProgress * 0.08);
    }

    // Ring — constant subtle element
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + t * 0.03;
      ringRef.current.rotation.z = t * 0.05 + scroll * Math.PI * 0.3;
      ringRef.current.position.y = Math.sin(t * 0.15) * 0.5;
    }
  });

  return (
    <group>
      {/* Main Icosahedron — hero background */}
      <mesh ref={icoRef} position={[-3.5, 1.5, -2]} material={wireMaterial}>
        <icosahedronGeometry args={[1.8, 1]} />
      </mesh>

      {/* Symmetrical Torus — skills area */}
      <mesh ref={torusRef} position={[3.5, -1, -2]} material={solidMaterial}>
        <torusGeometry args={[1.2, 0.3, 16, 100]} />
      </mesh>

      {/* Octahedron — repos area */}
      <mesh ref={octaRef} position={[-2.5, -2.5, -1.5]} material={accentMaterial}>
        <octahedronGeometry args={[0.8, 0]} />
      </mesh>

      {/* Large ring — ambient depth */}
      <mesh ref={ringRef} position={[1, 0, -4]} material={wireMaterial}>
        <torusGeometry args={[3, 0.02, 8, 64]} />
      </mesh>
    </group>
  );
}

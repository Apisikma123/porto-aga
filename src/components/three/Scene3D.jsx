import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { FloatingGeometry } from "./FloatingGeometry";
import { ParticleField } from "./ParticleField";

function CameraRig() {
  const ref = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true, once: false });
  }

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Subtle camera sway based on mouse + time
    state.camera.position.x += (mouse.current.x * 0.3 - state.camera.position.x) * 0.02;
    state.camera.position.y += (-mouse.current.y * 0.2 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Scene3D() {
  return (
    <div className="three-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.15} color="#00d4aa" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.3}
          color="#00aaff"
        />
        <pointLight position={[-5, -5, -5]} intensity={0.15} color="#00ff88" />

        <CameraRig />

        <Suspense fallback={null}>
          <FloatingGeometry />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}

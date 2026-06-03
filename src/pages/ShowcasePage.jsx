import { useRef, useState, Suspense, useMemo } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";

// ─── TROPHY ──────────────────────────────────────────────────────────────────

const TARGET_HEIGHT = 3.5; // units in scene

function Trophy({ targetRotX }) {
  const geometry = useLoader(STLLoader, "/WorldCup_386.stl");
  const groupRef = useRef();

  // Always-current target — avoids stale closure in useFrame
  const targetRef = useRef(targetRotX);
  targetRef.current = targetRotX;

  const scale = useMemo(() => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const center = new THREE.Vector3();
    box.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);
    const size = new THREE.Vector3();
    box.getSize(size);
    return TARGET_HEIGHT / Math.max(size.x, size.y, size.z);
  }, [geometry]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRef.current,
      0.1
    );
  });

  return (
    <group ref={groupRef}>
      {/* STL is Z-up; rotate -90° on X to convert to Y-up */}
      <mesh geometry={geometry} scale={scale} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#c89b2e" metalness={0.95} roughness={0.14} />
      </mesh>
    </group>
  );
}

function TrophyFallback() {
  return null;
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  const [value, setValue] = useState(0);
  const rotX   = value * Math.PI;
  const degrees = Math.round(value * 180);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-sm">
        <Link
          to="/"
          className="font-mono text-xs text-cyan-500 hover:text-cyan-300 transition-colors"
        >
          <span className="text-slate-500">~/</span>nilo
          <span className="text-slate-500 ml-2">←</span>
        </Link>
        <span className="font-mono text-xs text-slate-500">showcase/</span>
      </nav>

      <main className="relative max-w-5xl mx-auto px-6 pt-28 pb-24">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-cyan-500 select-none">{"// "}</span>
          <h1 className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
            showcase
          </h1>
          <div className="flex-1 h-px bg-linear-to-r from-cyan-900 to-transparent" />
        </div>

        {/* Trophy card */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
          {/* Card header */}
          <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-500">WorldCupTrophy.jsx</span>
            <span className="font-mono text-xs text-cyan-600">
              rotation.y = {degrees}°
            </span>
          </div>

          {/* Three.js canvas */}
          <div style={{ height: "60vh" }}>
            <Canvas camera={{ position: [0, 0.5, 5.5], fov: 42 }}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 8, 5]} intensity={2.2} color="#fff8e8" />
              <directionalLight position={[-4, 3, -4]} intensity={0.7} color="#c8e0ff" />
              <pointLight position={[0, 4, 2]} intensity={0.5} color="#ffd700" />
              <Environment preset="studio" />
              <Suspense fallback={<TrophyFallback />}>
                <Trophy targetRotX={rotX} />
              </Suspense>
              <ContactShadows
                position={[0, -1.76, 0]}
                opacity={0.45}
                scale={5}
                blur={2.5}
                far={4}
              />
            </Canvas>
          </div>

          {/* Slider */}
          <div className="px-8 py-6 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-slate-600 w-10 text-right">-180°</span>
              <input
                type="range"
                min={-1}
                max={1}
                step={0.001}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="flex-1 cursor-pointer"
                style={{ accentColor: "#22d3ee" }}
              />
              <span className="font-mono text-xs text-slate-600 w-10">+180°</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

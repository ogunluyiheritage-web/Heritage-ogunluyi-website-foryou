"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * A miniature architectural composition — three offset slabs referencing
 * strata, glazing and cladding, sitting on a plinth like a scale model on a
 * table. Materials read as concrete, glass and brass; the whole thing is
 * lit and shadowed like a physical object photographed in a studio, not a
 * spinning primitive floating in space.
 */
function ArchitecturalForm() {
  const group = useRef<THREE.Group>(null);
  const slabA = useRef<THREE.Mesh>(null);
  const slabB = useRef<THREE.Mesh>(null);
  const slabC = useRef<THREE.Mesh>(null);
  const mullion = useRef<THREE.Mesh>(null);

  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const clock = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((_state, delta) => {
    if (!group.current || !slabA.current || !slabB.current || !slabC.current) return;
    clock.current += delta;

    // Whole composition responds slowly to pointer position — a tilt, not a spin.
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      0.46 + pointer.current.x * 0.14,
      0.035
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -0.1 + pointer.current.y * 0.06,
      0.035
    );

    // Scroll drifts the whole group down and back slightly, like passing a facade.
    const targetY = -scrollProgress.current * 1.1;
    const targetZ = -scrollProgress.current * 0.6;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.06);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.06);

    // Each slab breathes independently at a very small amplitude — depth, not motion.
    slabA.current.position.y = -0.5 + Math.sin(clock.current * 0.35) * 0.02;
    slabB.current.position.y = 0.14 + Math.sin(clock.current * 0.3 + 1.4) * 0.03;
    slabC.current.position.y = 0.72 + Math.sin(clock.current * 0.4 + 2.6) * 0.02;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Plinth — the model sits on something; this is what grounds it as an
          object rather than a shape floating in a void. */}
      <RoundedBox args={[3.1, 0.05, 2.15]} radius={0.015} smoothness={2} position={[0, -0.635, 0]} receiveShadow>
        <meshPhysicalMaterial color="#080807" roughness={0.96} metalness={0} envMapIntensity={0.15} />
      </RoundedBox>

      {/* Base — matte, monolithic, poured concrete. Low envMapIntensity keeps
          it reading as raw material rather than a shiny render-demo surface. */}
      <RoundedBox
        ref={slabA}
        args={[2.6, 0.22, 1.6]}
        radius={0.015}
        smoothness={4}
        position={[0, -0.5, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial color="#111110" roughness={0.86} metalness={0.02} envMapIntensity={0.35} />
      </RoundedBox>

      {/* Mid slab — glazing. Real transmission + clearcoat so it refracts and
          catches the studio lightformers instead of rendering flat/grey. */}
      <RoundedBox
        ref={slabB}
        args={[1.9, 0.16, 1.9]}
        radius={0.02}
        smoothness={4}
        position={[0.35, 0.14, -0.1]}
        rotation={[0, 0.35, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#eef2ef"
          roughness={0.045}
          metalness={0}
          transmission={0.94}
          thickness={0.55}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.06}
          attenuationColor="#dbe6e1"
          attenuationDistance={0.9}
          envMapIntensity={1.6}
        />
      </RoundedBox>

      {/* Top slab — brushed brass. Metalness near 1 with mid roughness reads
          as brushed metal rather than chrome. */}
      <RoundedBox
        ref={slabC}
        args={[1.15, 0.14, 1.15]}
        radius={0.015}
        smoothness={4}
        position={[-0.3, 0.72, 0.15]}
        rotation={[0, -0.5, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial color="#b3855a" roughness={0.34} metalness={0.94} envMapIntensity={1.35} />
      </RoundedBox>

      {/* A thin brass mullion linking the levels — turns three stacked
          shapes into one structure with a visible line of support. */}
      <mesh ref={mullion} position={[-0.15, 0.05, 0.3]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 1.15, 16]} />
        <meshPhysicalMaterial color="#a47551" roughness={0.3} metalness={0.9} envMapIntensity={1.2} />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight
        position={[3.2, 5, 2.6]}
        intensity={1.5}
        color="#fbf9f4"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={8}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0015}
      />
      {/* Warm brass-toned kicker from behind/below — the one saturated note
          in the lighting, matched to the brass material. */}
      <directionalLight position={[-4, -0.5, -2.6]} intensity={0.5} color="#a47551" />
    </>
  );
}

/**
 * Studio lighting environment built entirely from geometric light panels —
 * rendered locally into a small cubemap at runtime. No HDRI file, no
 * network request: this is what makes the glass and brass believable
 * whether or not the visitor has a connection.
 */
function StudioEnvironment() {
  return (
    <Environment resolution={256} frames={1}>
      <group>
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#ffffff"
          scale={[3, 2, 1]}
          position={[3, 3, 2]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <Lightformer
          form="rect"
          intensity={0.9}
          color="#e7ded1"
          scale={[4, 3, 1]}
          position={[-4, 1, -2]}
          rotation={[0, Math.PI / 3, 0]}
        />
        <Lightformer
          form="ring"
          intensity={0.6}
          color="#a47551"
          scale={2}
          position={[0, -2, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        {/* Soft neutral floor/ceiling panels so the glass has something
            believable — not black — to refract. */}
        <Lightformer
          form="rect"
          intensity={0.4}
          color="#0d0d0c"
          scale={[10, 10, 1]}
          position={[0, -4, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={0.5}
          color="#f3f2ee"
          scale={[10, 10, 1]}
          position={[0, 4, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </Environment>
  );
}

function Rig() {
  const { camera } = useThree();
  useFrame(() => camera.lookAt(0, 0.08, 0));
  return null;
}

export default function HeroScene() {
  const dpr = useMemo<[number, number]>(() => [1, 1.6], []);

  return (
    <Canvas
      dpr={dpr}
      shadows="soft"
      camera={{ position: [2.3, 1.5, 3.15], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Lights />
      <Rig />
      <Suspense fallback={null}>
        <ArchitecturalForm />
        <ContactShadows
          position={[0, -0.66, 0]}
          opacity={0.55}
          scale={4.5}
          blur={2.4}
          far={1.2}
          resolution={512}
          color="#0d0d0c"
        />
        <StudioEnvironment />
      </Suspense>
    </Canvas>
  );
}

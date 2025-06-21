'use client';

import { ExtractDreiForwardRefTarget } from '@/TypeUtils';
import { AccumulativeShadows, OrbitControls, RandomizedLight, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import BeerBottleModel from './3DModels/BeerBottleModel';

export default function Home() {
  const ref = useRef<ExtractDreiForwardRefTarget<typeof OrbitControls>>(null);

  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
      {/* Basic Lighting */}
      <color
        attach="background"
        args={['#f0f0f0']}
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
      />
      <Suspense fallback={null}>
        <Stage
          controls={ref}
          preset="rembrandt"
          intensity={1}
          environment="sunset"
        >
          <BeerBottleModel />
        </Stage>
      </Suspense>

      <AccumulativeShadows
        frames={80}
        color="black"
        opacity={1}
        scale={12}
        position={[0, 0.04, 0]}
      >
        <RandomizedLight
          amount={8}
          radius={5}
          ambient={0.5}
          position={[5, 6, -10]}
          bias={0.001}
        />
      </AccumulativeShadows>

      {/* User Controls */}
      <OrbitControls ref={ref} />
    </Canvas>
  );
}

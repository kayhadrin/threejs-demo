'use client';

import { AccumulativeShadows, OrbitControls, RandomizedLight, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Lazy3DModels from './3DModels/Lazy3DModels';
import HtmlLabel from './HtmlLabel';

export default function ProductEditorCanvas() {
  // const ref = useRef<ExtractDreiForwardRefTarget<typeof OrbitControls>>(null);

  return (
    <Canvas
      id="product_editor_canvas"
      className="top-0 left-0 z-0 h-full w-full"
      // Keep explicit "fixed" position to ensure it covers the entire viewport
      style={{ position: 'fixed' }}
      camera={{ position: [0, 0, 30], fov: 75 }}
    >
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

      <Suspense
        fallback={
          <HtmlLabel rotation={[0, 0, 0]}>
            <div
              className="select-none"
              style={{ position: 'absolute', fontSize: 16, scale: 4, letterSpacing: -0.5, left: 0 }}
            >
              Loading model...
            </div>
          </HtmlLabel>
        }
      >
        <Stage
          preset="rembrandt"
          intensity={1}
          environment={null}
        >
          {/* <BeerBottle3DModel /> */}
          <Lazy3DModels.ShampooBottle3DModel />
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
      <OrbitControls />
    </Canvas>
  );
}

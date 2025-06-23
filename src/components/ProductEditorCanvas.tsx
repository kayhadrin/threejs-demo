'use client';

import { ExtractDreiForwardRefTarget } from '@/TypeUtils';
import {
  AccumulativeShadows,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  Stage,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Children, ReactNode, Suspense, useEffect, useRef } from 'react';
import HtmlLabel from './HtmlLabel';

const DEFAULT_CAMERA_POSITION: [x: number, y: number, z: number] = [0, 0, 30];

export default function ProductEditorCanvas({ children }: { children?: ReactNode }) {
  const cameraRef = useRef<ExtractDreiForwardRefTarget<typeof PerspectiveCamera> | null>(null);
  const controlsRef = useRef<ExtractDreiForwardRefTarget<typeof OrbitControls> | null>(null);
  const hasChildren = Children.count(children) > 0;

  useEffect(() => {
    if (!hasChildren) {
      // ProductEditorCanvas has no children, resetting camera to default position and controls
      cameraRef.current?.position.set(...DEFAULT_CAMERA_POSITION);
      controlsRef.current?.update();
    }
  }, [hasChildren]);

  return (
    <Canvas
      className="top-0 left-0 z-0 h-full w-full"
      // Keep explicit "fixed" position to ensure it covers the entire viewport
      style={{ position: 'fixed' }}
      camera={{ position: DEFAULT_CAMERA_POSITION, fov: 75 }}
      fallback={<strong>Browser unsupported! :-(</strong>}
    >
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
      />

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

      {hasChildren ? (
        <>
          <Suspense
            fallback={
              // TODO: BUG: label is not visible when loading children; seems to be a camera/scale issue
              <HtmlLabel rotation={[0, 0, 0]}>
                <div
                  className="select-none"
                  style={{
                    position: 'absolute',
                    fontSize: 16,
                    scale: 4,
                    letterSpacing: -0.5,
                    left: 0,
                  }}
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
              {children}
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
          <OrbitControls
            ref={controlsRef}
            minAzimuthAngle={-Math.PI}
            maxAzimuthAngle={Math.PI}
            minPolarAngle={-Math.PI / 2}
            maxPolarAngle={Math.PI}
          />
        </>
      ) : null}
    </Canvas>
  );
}

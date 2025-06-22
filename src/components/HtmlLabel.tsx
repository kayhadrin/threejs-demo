'use client';

import { Html } from '@react-three/drei';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

export default function HtmlLabel({
  children,
  ...props
}: ComponentPropsWithoutRef<'group'> & { children: ReactNode }) {
  return (
    <group>
      <Html
        // 3D-transform contents
        transform
        {...props}
      >
        {children}
      </Html>
    </group>
  );
}

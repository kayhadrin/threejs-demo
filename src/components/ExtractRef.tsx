'use client';

import { ForwardRefComponent } from '@react-three/drei/helpers/ts-utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ExtractRef<T> = T extends ForwardRefComponent<infer P, infer T> ? T : never;

import { ForwardRefComponent } from '@react-three/drei/helpers/ts-utils';
import invariant from 'invariant';
import * as THREE from 'three';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ExtractDreiForwardRefTarget<T> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends ForwardRefComponent<infer P, infer T> ? T : never;

// opaque type
export type ID<Name extends string> = string & { _name: Name };

export function castToID<Name extends string>(id: string): ID<Name> {
  invariant(typeof id === 'string', 'ID must be a string');
  return id as ID<Name>;
}

export type Nullish = null | undefined;

export function isMeshNode(object?: THREE.Object3D): object is THREE.Mesh {
  return object?.type === 'Mesh';
}

export function enforceMeshNode(object?: THREE.Object3D): THREE.Mesh {
  invariant(isMeshNode(object), 'Expected a THREE.Mesh node');
  return object;
}

export type PrimitiveValue = bigint | boolean | number | string | symbol;

export type DeepReadonly<T> = {
  // readonly [K in keyof T]: DeepReadonly<T[K]>;
  readonly [K in keyof T]: T[K] extends PrimitiveValue | Nullish ? T[K] : DeepReadonly<T[K]>;
};

/**
 * @example structuredClone(data) as DeepMutable<typeof data>;
 */
export type DeepMutable<T> = {
  -readonly [K in keyof T]: DeepMutable<T[K]>;
};

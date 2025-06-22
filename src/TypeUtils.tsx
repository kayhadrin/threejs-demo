import { ForwardRefComponent } from '@react-three/drei/helpers/ts-utils';
import invariant from 'invariant';
import * as THREE from 'three';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ExtractDreiForwardRefTarget<T> = T extends ForwardRefComponent<infer P, infer T> ? T : never;

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

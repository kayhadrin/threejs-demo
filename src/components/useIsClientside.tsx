'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const Context = createContext<boolean>(false);

export function IsClientsideContextProvider({ children }: { children: ReactNode }) {
  const [isClientside, setClientside] = useState(false);
  useEffect(() => setClientside(true), []);
  return <Context value={isClientside}>{children}</Context>;
}

export function useIsClientsideContext() {
  return useContext(Context);
}

/**
 * Context-less hook version
 * @returns Returns true when the component is mounted on the client side.
 */
export function useIsClientside() {
  const [isClientside, setClientside] = useState(false);
  useEffect(() => setClientside(true), []);
  return [isClientside];
}

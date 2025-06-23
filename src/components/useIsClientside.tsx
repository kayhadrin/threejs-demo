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

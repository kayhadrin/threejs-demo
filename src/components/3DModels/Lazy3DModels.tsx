import { lazy } from 'react';

const Lazy3DModels = {
  BeerBottle3DModel: lazy(() => import('./BeerBottle3DModel')),
  ShampooBottle3DModel: lazy(() => import('./ShampooBottle3DModel')),
};

export default Lazy3DModels;

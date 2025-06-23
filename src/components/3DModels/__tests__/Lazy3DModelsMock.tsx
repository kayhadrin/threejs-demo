import { ComponentType, lazy, LazyExoticComponent } from 'react';
import Lazy3DModelsMockOriginal from '../Lazy3DModels';

function createMockComponentModule(name: string) {
  return Promise.resolve({
    default: <T extends object>(props: T) => {
      return (
        <div data-testid={`lazy3DModel-${name}`}>
          {`[[[${name}`}
          {`props = ${JSON.stringify(props, null, 2)}`}
          {`${name}]]]`}
        </div>
      );
    },
  });
}

jest.mock(
  '../Lazy3DModels',
  (): {
    __esModule: true;
    default: {
      [K in keyof typeof Lazy3DModelsMockOriginal]: LazyExoticComponent<ComponentType<object>>;
    };
  } => {
    return {
      __esModule: true,
      default: {
        BeerBottle3DModel: lazy(() => createMockComponentModule('BeerBottle3DModel')),
        ShampooBottle3DModel: lazy(() => createMockComponentModule('ShampooBottle3DModel')),
      },
    };
  }
);

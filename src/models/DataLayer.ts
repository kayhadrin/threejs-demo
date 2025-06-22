import { castToID } from '@/TypeUtils';
import { ContainerMaterial, ContainerTemplate, ImageAsset, ModelAsset, Product } from './Models';

const backendDataMock: {
  products: Array<Product>;
  containerTemplates: Array<ContainerTemplate>;
  containerMaterials: Array<ContainerMaterial>;
  imageAssets: Array<ImageAsset>;
  modelAssets: Array<ModelAsset>;
} = {
  products: [],
  containerTemplates: [
    {
      id: castToID('container-template-1'),
      name: 'Shampoo Bottle',
      containerMaterialID: castToID('container-material-1'),
      modelAssetID: castToID('model-asset-1'),
      height: 160,
      width: 120,
      depth: 120,
    },
    {
      id: castToID('container-template-2'),
      name: 'Beer Bottle',
      containerMaterialID: castToID('container-material-2'),
      modelAssetID: castToID('model-asset-2'),
      height: 220,
      width: 100,
      depth: 100,
    },
  ],
  containerMaterials: [
    {
      id: castToID('container-material-1'),
      name: 'Plastic',
    },
    {
      id: castToID('container-material-2'),
      name: 'Glass',
    },
  ],
  imageAssets: [
    {
      id: castToID('image-asset-1'),
      type: 'thumbnail',
      desc: 'Shampoo Bottle Thumbnail',
      url: '/3DModels/shampooBottle/scene.thumbnail.png',
      width: 468,
      height: 496,
    },
    {
      id: castToID('image-asset-2'),
      type: 'thumbnail',
      desc: 'Beer Bottle Thumbnail',
      url: '/3DModels/beerBottle/scene.thumbnail.png',
      width: 511,
      height: 523,
    },
  ],
  modelAssets: [
    {
      id: castToID('model-asset-1'),
      name: 'Shampoo bottle model',
      desc: 'Shampoo bottle.',
      uiComponentName: 'ShampooBottle3DModel',
      thumbnailImageID: castToID('image-asset-1'),
      licenseMd: `Author: [Sousinho](https://sketchfab.com/sousinho)
License: [SKETCHFAB Standard](https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/shampoo-bottle-38508e5df44840ebae254e40e1ebd73f`,
    },
    {
      id: castToID('model-asset-2'),
      name: 'Beer glass bottle model',
      desc: 'Beer glass bottle.',
      uiComponentName: 'BeerBottle3DModel',
      thumbnailImageID: castToID('image-asset-2'),
      licenseMd: `Author: [gelmi.com.br](https://sketchfab.com/rodrigogelmi)
License: [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/beer-bottle-c3de7f8b092e4092aef14d4ffc9fac7f`,
    },
  ],
};

export class DataLayer {
  // constructor() {}
}

const DataLayerSingleton = new DataLayer();
export default DataLayerSingleton;

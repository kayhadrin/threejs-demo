import Lazy3DModels from '@/components/3DModels/Lazy3DModels';
import { ID, Nullish } from '@/TypeUtils';
import { Overwrite } from '@react-three/drei/helpers/ts-utils';

/**
 * Represents a physical product
 */
export interface Product {
  id: ID<'Product'>;
  name: string;
  /**
   * TODO: remove this from frontend because this
   * foreign key to another model should only exist on
   * the backend. The clientside should use the non-ID property directly.
   */
  containerTemplateID: ID<'ContainerTemplate'>;
  containerTemplate?: ContainerTemplate | Nullish;
  /**
   * Unit (mm)
   */
  customHeight?: number | Nullish;
  /**
   * Unit (mm)
   */
  customWidth?: number | Nullish;
  /**
   * Unit (mm)
   */
  customDepth?: number | Nullish;

  // TODO
  // labelImageID?: ID<'ImageAsset'>;
}

export type DraftProduct = Overwrite<
  Product,
  { containerTemplateID?: ID<'ContainerTemplate'> | Nullish }
>;

/**
 * Represents a template for a product container.
 */
export interface ContainerTemplate {
  id: ID<'ContainerTemplate'>;
  name: string;
  /**
   * TODO: remove this from frontend because this
   * foreign key to another model should only exist on
   * the backend. The clientside should use the non-ID property directly.
   */
  containerMaterialID: ID<'ContainerMaterial'>;
  containerMaterial?: ContainerMaterial | Nullish;
  /**
   * Unit (mm)
   */
  width: number;
  /**
   * Unit (mm)
   */
  height: number;
  /**
   * Unit (mm)
   */
  depth: number;
  modelAssetID: ID<'ModelAsset'>;
  modelAsset?: ModelAsset | Nullish;
}

/**
 * Represents the main material used for the container in the product.
 */
export interface ContainerMaterial {
  id: ID<'ContainerMaterial'>;
  name: string;
}

export type ImageAssetType = 'thumbnail' | 'label';

/**
 * Represents an image asset that can be used in the application.
 * It can be a thumbnail or a label image.
 */
export interface ImageAsset {
  id: ID<'ImageAsset'>;
  type: ImageAssetType;
  url: string;
  /**
   * Unit (px)
   */
  width: number;
  /**
   * Unit (px)
   */
  height: number;
  desc: string;
  /**
   * TODO: remove this from frontend because this
   * foreign key to another model should only exist on
   * the backend. The clientside should use the non-ID property directly.
   */
  thumbnailImageAssetID?: ID<'ImageAsset'> | Nullish;
  thumbnailImageAsset?: ImageAsset | Nullish;
}

/**
 * Represents a 3D model asset that can be used in the application.
 */
export interface ModelAsset {
  id: ID<'ModelAsset'>;
  name: string;
  desc: string;
  uiComponentName: keyof typeof Lazy3DModels;
  /**
   * TODO: remove this from frontend because this
   * foreign key to another model should only exist on
   * the backend. The clientside should use the non-ID property directly.
   */
  thumbnailImageID: ID<'ImageAsset'>;
  thumbnailImage?: ImageAsset | Nullish;
  licenseMd: string;
}

import { ID, Nullish } from '@/TypeUtils';

/**
 * Represents a material product
 */
export interface Product {
  id: ID<'Product'>;
  name: string;
  containerTemplateID: ID<'ContainerTemplate'>;
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

/**
 * Represents a template for a product container.
 */
export interface ContainerTemplate {
  id: ID<'ContainerTemplate'>;
  name: string;
  containerMaterialID: ID<'ContainerMaterial'>;
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
  thumbnailImageID: ID<'ImageAsset'>;
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
  width: number;
  height: number;
  desc: string;
  thumbnailImageAssetID?: ID<'ImageAsset'> | Nullish;
}

/**
 * Represents a 3D model asset that can be used in the application.
 */
export interface ModelAsset {
  id: ID<'ModelAsset'>;
  name: string;
  desc: string;
  licenseMd: string;
}

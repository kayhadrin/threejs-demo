// TODO: keep or delete this file?

import { ID, Nullish } from '@/TypeUtils';
import invariant from 'invariant';

/**
 * Represents a material product
 */
export class Product {
  id: ID<'Product'>;
  name: string;
  containerTemplateID: ID<'ContainerTemplate'>;
  /**
   * Unit (mm)
   */
  customHeight?: number;
  /**
   * Unit (mm)
   */
  customWidth?: number;
  /**
   * Unit (mm)
   */
  customDepth?: number;

  // TODO
  // labelImageID?: ID<'ImageAsset'>;

  constructor(params: {
    id: ID<'Product'>;
    name: string;
    containerTemplateID: ID<'ContainerTemplate'>;
    /**
     * Unit (mm)
     */
    customHeight?: number;
    /**
     * Unit (mm)
     */
    customWidth?: number;
    /**
     * Unit (mm)
     */
    customDepth?: number;
    labelImageID?: ID<'ImageAsset'>;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.containerTemplateID = params.containerTemplateID;
    this.customHeight = params.customHeight;
    this.customWidth = params.customWidth;
    this.customDepth = params.customDepth;
    // this.labelImageID = params.labelImageID;
  }
}

/**
 * Represents a template for a product container.
 */
export class ContainerTemplate {
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

  constructor(params: {
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
  }) {
    this.id = params.id;
    this.name = params.name;
    this.containerMaterialID = params.containerMaterialID;
    this.width = params.width;
    this.height = params.height;
    this.depth = params.depth;
    this.modelAssetID = params.modelAssetID;
    this.thumbnailImageID = params.thumbnailImageID;
  }
}

/**
 * Represents the main material used for the container in the product.
 */
export class ContainerMaterial {
  id: ID<'ContainerMaterial'>;
  name: string;

  constructor(params: { id: ID<'ContainerMaterial'>; name: string }) {
    this.id = params.id;
    this.name = params.name;
  }
}

export type ImageAssetType = 'thumnail' | 'label';

/**
 * Represents an image asset that can be used in the application.
 * It can be a thumbnail or a label image.
 */
export class ImageAsset {
  id: ID<'ImageAsset'>;
  type: ImageAssetType;
  width: number;
  height: number;
  desc: string;
  thumbnailImageAssetID: ID<'ImageAsset'> | Nullish;

  constructor(params: {
    id: ID<'ImageAsset'>;
    type: ImageAssetType;
    width: number;
    height: number;
    desc: string;
    thumbnailImageAssetID?: ID<'ImageAsset'> | Nullish;
  }) {
    this.id = params.id;
    this.type = params.type;
    this.width = params.width;
    this.height = params.height;
    this.desc = params.desc;
    if (params.type === 'thumnail') {
      invariant(
        params.thumbnailImageAssetID == null,
        `Thumbnail image asset (${this.id}) should not have a thumbnailImageAssetID (${
          params.thumbnailImageAssetID
        })`
      );
    }
    this.thumbnailImageAssetID = params.thumbnailImageAssetID || null;
  }
}

/**
 * Represents a 3D model asset that can be used in the application.
 */
export class ModelAsset {
  id: ID<'ModelAsset'>;
  name: string;
  desc: string;
  licenseMd: string;

  constructor(params: { id: ID<'ModelAsset'>; name: string; desc: string; licenseMd: string }) {
    this.id = params.id;
    this.name = params.name;
    this.desc = params.desc;
    this.licenseMd = params.licenseMd;
  }
}

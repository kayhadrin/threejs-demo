'use client';

import Lazy3DModels from '@/components/3DModels/Lazy3DModels';
import DataLayer from '@/models/DataLayer';
import { ContainerMaterial, ContainerTemplate } from '@/models/Models';
import { castToID, DeepReadonly, ID, Nullish } from '@/TypeUtils';
import Image from 'next/image';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import ShareButton from './ShareButton';
import { IsClientsideContextProvider, useIsClientsideContext } from './useIsClientside';

const ProductEditorCanvas = lazy(() => import('@/components/ProductEditorCanvas'));

export type InitProps = {
  containerMaterialID?: ID<'ContainerMaterial'> | Nullish;
  containerTemplateID?: ID<'ContainerTemplate'> | Nullish;
};

export default function ProductEditor({ init = {} }: { init?: InitProps }) {
  const containerMaterials = useContainerMaterials();
  //DEBUG
  // console.log('containerMaterials:', containerMaterials);

  const { containerTemplates, containerMaterialID, setContainerMaterialID } = useContainerTemplates(
    init.containerMaterialID
  );
  //DEBUG
  // console.log('containerMaterialID:', containerMaterialID);

  const [containerTemplateID, setContainerTemplateID] = useState<ID<'ContainerTemplate'> | Nullish>(
    init.containerTemplateID
  );
  //DEBUG
  // console.log('containerTemplateID:', containerTemplateID);

  const TemplateAssetModel = useMemo(() => {
    const template = containerTemplates.find((template) => template.id === containerTemplateID);
    return Object.entries(Lazy3DModels).find(
      ([key]) => key === template?.modelAsset?.uiComponentName
    )?.[1];
  }, [containerTemplateID, containerTemplates]);
  //DEBUG
  console.log('TemplateAssetModel:', TemplateAssetModel);

  return (
    <IsClientsideContextProvider>
      <Suspense
        fallback={
          <div
            className="top-0 left-0 z-0 h-full w-full p-4 sm:p-8 md:p-12"
            // Keep explicit "fixed" position to ensure it covers the entire viewport
            style={{ position: 'fixed' }}
          >
            <p>Loading 3D canvas...</p>
          </div>
        }
      >
        <ProductEditorCanvas>
          {TemplateAssetModel && <TemplateAssetModel key={String(containerTemplateID)} />}
        </ProductEditorCanvas>
      </Suspense>
      <div className="z-0 rounded bg-blue-100/50 p-4 sm:p-8 md:p-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Product Editor</h1>
        <section className="flex flex-col gap-4">
          {/* Choose container material */}
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Container Material</span>
            <select
              className="rounded border px-2 py-1"
              style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
              value={containerMaterialID ?? ''}
              onChange={(e) => {
                e.stopPropagation();
                setContainerMaterialID(castToID(e.target.value));
              }}
            >
              <option value="">Select a material</option>
              {containerMaterials.map((material) => (
                <option
                  key={material.id}
                  value={material.id}
                >
                  {material.name}
                </option>
              ))}
            </select>
          </label>
          {/* Choose container template */}
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Container Template</span>
            <div className="flex flex-wrap gap-4">
              {containerTemplates.length === 0 && (
                <span className="text-gray-500">No templates available</span>
              )}
              {containerTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  className={`flex flex-col items-center rounded border p-2 transition ${template.id === containerTemplateID ? 'ring-2 ring-blue-500' : 'hover:border-blue-400'}`}
                  style={{
                    background:
                      template.id === containerTemplateID
                        ? 'rgba(59,130,246,0.1)'
                        : 'rgba(255,255,255,0.8)',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Selected template:', template);
                    setContainerTemplateID(template.id);
                  }}
                  title={`Select ${template.name}`}
                >
                  <Image
                    src={template.modelAsset?.thumbnailImage?.url ?? '#'}
                    width={template.modelAsset?.thumbnailImage?.width}
                    height={template.modelAsset?.thumbnailImage?.height}
                    alt={template.name}
                    className="mb-2 h-24 w-24 object-contain"
                  />
                </button>
              ))}
            </div>
          </label>

          {/* TODO: show ability to resize model */}
          {/* TODO: WISH: add ability to choose a label decal */}

          {containerMaterialID && containerTemplateID ? (
            <div className="flex flex-col gap-4">
              <ShareProducctEditorURL
                {...{
                  containerMaterialID,
                  containerTemplateID,
                }}
              />
            </div>
          ) : null}
        </section>
      </div>
    </IsClientsideContextProvider>
  );
}

function ShareProducctEditorURL({
  containerMaterialID,
  containerTemplateID,
}: {
  containerMaterialID: ID<'ContainerMaterial'> | Nullish;
  containerTemplateID: ID<'ContainerTemplate'> | Nullish;
}) {
  const isClientside = useIsClientsideContext();
  const fullURL = useMemo(() => {
    return isClientside
      ? `${window.location.href.split('?')[0]}?${Object.entries({
          containerMaterialID,
          containerTemplateID,
        })
          .reduce((acc, [key, value]) => {
            if (value) {
              acc.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
            return acc;
          }, [] as Array<string>)
          .join('&')}`
      : '#';
  }, [containerMaterialID, containerTemplateID, isClientside]);

  return <ShareButton url={fullURL} />;
}

function useContainerMaterials() {
  const [containerMaterials, setContainerMaterials] = useState<
    DeepReadonly<Array<ContainerMaterial>>
  >([]);

  useEffect(() => {
    (async () => {
      setContainerMaterials(await DataLayer.getContainerMaterials());
    })();
  }, []);

  return containerMaterials;
}

function useContainerTemplates(initContainerMaterialID: ID<'ContainerMaterial'> | Nullish = null) {
  const [containerMaterialID, setContainerMaterialID] = useState<ID<'ContainerMaterial'> | Nullish>(
    initContainerMaterialID
  );
  const [containerTemplates, setContainerTemplates] = useState<
    DeepReadonly<Array<ContainerTemplate>>
  >([]);

  useEffect(() => {
    (async () => {
      if (!containerMaterialID) {
        return setContainerTemplates([]);
      }
      setContainerTemplates(await DataLayer.getContainerTemplates(containerMaterialID));
    })();
  }, [containerMaterialID]);

  return { containerTemplates, containerMaterialID, setContainerMaterialID };
}

import ProductEditor, { InitProps } from '@/components/ProductEditor';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Editor',
};

export default async function ProductEditorPage({
  searchParams,
}: {
  searchParams: Promise<InitProps>;
}) {
  const { containerMaterialID, containerTemplateID } = await searchParams;
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col gap-[32px] sm:items-start">
        <ProductEditor
          init={{
            containerMaterialID,
            containerTemplateID,
          }}
        />
      </main>
    </div>
  );
}

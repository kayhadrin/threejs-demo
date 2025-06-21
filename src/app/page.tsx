import { lazy, Suspense } from 'react';

const ProductEditorCanvas = lazy(() => import('@/components/ProductEditorCanvas'));

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Product Editor</h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <ProductEditorCanvas />
        </Suspense>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]"></footer>
    </div>
  );
}

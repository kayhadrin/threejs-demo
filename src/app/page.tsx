import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '3D Demo - Home',
};

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">3D Demo</h1>
        <Link
          href="/product/editor"
          className="text-blue-500 hover:underline"
        >
          Open Product Editor
        </Link>
      </main>
    </div>
  );
}

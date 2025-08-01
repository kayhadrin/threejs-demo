import Link from 'next/link';
import React, { SyntheticEvent } from 'react';

export default function ShareButton({ url }: { url: string }) {
  const handleCopy = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(url);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {}
  };

  return (
    <div className="flex items-center align-middle">
      <span className="inline-block max-h-lh max-w-sm overflow-hidden bg-white p-1 font-mono overflow-ellipsis whitespace-nowrap text-blue-500 select-all">
        {url}
      </span>
      <Link
        href={url}
        className="ml-2 rounded border-2 border-blue-500 bg-blue-100 p-1 transition-all duration-300 ease-out hover:bg-blue-200 active:border-green-500 active:bg-green-100"
        onClick={handleCopy}
      >
        Share
      </Link>
    </div>
  );
}

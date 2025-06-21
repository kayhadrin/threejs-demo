import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    'three', // needed by react-three-fiber
  ],
  // experimental: {
  //   // Enabling Partial Prerendering
  //   // @see https://nextjs.org/docs/app/getting-started/partial-prerendering#enabling-partial-prerendering
  //   ppr: 'incremental',
  // },
};

export default nextConfig;

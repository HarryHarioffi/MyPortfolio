import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` emits plain HTML/CSS/JS to ./out.
  output: "export",
  // /about -> /about/index.html, so any static host serves clean URLs without rewrites.
  trailingSlash: true,
  // The default image optimizer needs a server; assets are local and pre-sized.
  images: { unoptimized: true },
};

export default nextConfig;

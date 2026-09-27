/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // No remotePatterns: every image in this project is served from /public.
  // Keeping this empty is deliberate — it's a guardrail against
  // accidentally wiring in an external/hotlinked image URL later.
};

export default nextConfig;

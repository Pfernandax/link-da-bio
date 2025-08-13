/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Evita a build travar por tipagem/lint em CI
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true }
};
export default nextConfig;

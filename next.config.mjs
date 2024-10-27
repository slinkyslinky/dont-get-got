/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/dont-get-got",
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["d11p8vtjlacpl4.cloudfront.net", "images.unsplash.com"],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["gsap"],
    webpack(config, { isServer }) {
        if (!isServer) {
            // We're in the browser build, so we can safely exclude the sharp module
            config.externals.push("sharp");
        }

        // svg as components
        // @see: https://github.com/vercel/next.js/discussions/52690
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack", "url-loader"],
        });

        // audio support
        config.module.rules.push({
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            exclude: config.exclude,
            use: [
                {
                    loader: "url-loader",
                    options: {
                        limit: config.inlineImageLimit,
                        fallback: "file-loader",
                        publicPath: `${config.assetPrefix}/_next/static/images/`,
                        outputPath: `${isServer ? "../" : ""}static/images/`,
                        name: "[name]-[hash].[ext]",
                        esModule: config.esModule || false,
                    },
                },
            ],
        });

        // shader support
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: ["raw-loader", "glslify-loader"],
        });

        return config;
    },
};

export default nextConfig;

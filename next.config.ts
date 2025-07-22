import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	// experimental: {
	// 	ppr: true,
	// },
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
				pathname: "**",
			},
		],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		// ppr: true,
		serverActions: {
			bodySizeLimit: "5mb",
		},
	},

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
				pathname: "**",
			},
			new URL("https://my-store-id.public.blob.vercel-storage.com/**"),
		],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;

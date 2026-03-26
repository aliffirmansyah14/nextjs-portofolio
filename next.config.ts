import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
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
			new URL("https://vy6h6fhwkpvikfqj.public.blob.vercel-storage.com/**"),
		],
		qualities: [75, 90],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;

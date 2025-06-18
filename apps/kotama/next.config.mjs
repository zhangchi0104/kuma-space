/**
 * @format
 * @type {import('next').NextConfig}
 */

import createNextIntlPlugin from "next-intl/plugin";
import createBundleAnalyzer from "@next/bundle-analyzer";
const withNextIntl = createNextIntlPlugin();
import createMDX from "@next/mdx";

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
});
const withBundleAnalyzer = createBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ["framer-motion", "@radix-ui/react-icons"],
	},
};

export default withNextIntl(withBundleAnalyzer(withMDX(nextConfig)));

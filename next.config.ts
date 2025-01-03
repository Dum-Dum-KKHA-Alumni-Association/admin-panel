import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	/* config options here */
	async headers() {
		return [
			{
				// Apply to all API routes
				source: '/api/:path*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: process.env.NEXT_PUBLIC_FRONTEND_URL!, // Specify your allowed origin
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET, POST, OPTIONS', // Allowed HTTP methods
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Content-Type, Authorization', // Allowed headers
					},
				],
			},
			// {
			// 	// Apply to all API routes
			// 	source: '/api/:path*',
			// 	headers: [
			// 		{
			// 			key: 'Access-Control-Allow-Origin',
			// 			value: 'http://localhost:8080', // Specify your allowed origin
			// 		},
			// 		{
			// 			key: 'Access-Control-Allow-Methods',
			// 			value: 'GET, POST, OPTIONS', // Allowed HTTP methods
			// 		},
			// 		{
			// 			key: 'Access-Control-Allow-Headers',
			// 			value: 'Content-Type, Authorization', // Allowed headers
			// 		},
			// 	],
			// },
		];
	},
};

export default nextConfig;

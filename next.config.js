/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/dashboard',
				destination: '/dashboard/products',
				permanent: true,
			},
			{
				source: '/dashboard/inventory',
				destination: '/dashboard/products',
				permanent: true,
			},
		]
	},
}

module.exports = nextConfig

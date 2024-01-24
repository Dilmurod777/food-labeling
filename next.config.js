/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: '/dashboard',
				destination: '/dashboard/recipes',
				permanent: true,
			},
		]
	},
}

module.exports = nextConfig

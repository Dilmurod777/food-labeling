import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            backgroundColor: {
                "main-green": "#00a734",
                "hover-main-green": "#00982f",
                "main-blue": "#408abf"
            },
            textColor: {
                "main-green": "#00a734",
                "hover-main-green": "#00982f",
                "main-blue": "#408abf"
            },
            borderColor: {
                "main-green": "#00a734",
                "hover-main-green": "#00982f",
                "main-blue": "#408abf"
            }
        },
    },
    plugins: [],
}
export default config

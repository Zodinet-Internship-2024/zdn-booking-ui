import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#F6FCF1',
                    200: '#EBF8E0 ',
                    300: '#DAEBCC',
                    400: '#C4DCB1',
                    500: '#A2C287',
                    600: '#7FA65F',
                },
                neutral: {
                    DEFAULT: '#FFFFFF',
                    100: '#F1F3F6',
                    200: '#C8CED9',
                    300: '#8292AA',
                    400: '#384252',
                    500: '#242B35',
                    600: '#40423F ',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
export default config;

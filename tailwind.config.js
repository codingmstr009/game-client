/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './App.jsx', './app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                body: {
                    DEFAULT: '#f8f8f8',
                    dark: '#171c23',
                },
                panel: {
                    DEFAULT: '#fff',
                    dark: '#1c222a',
                },
                menu: {
                    DEFAULT: '#fff',
                    dark: '#2c3643',
                },
                input: {
                    DEFAULT: '#fff',
                    dark: '#242b34',
                },
                border: {
                    DEFAULT: '#ddd',
                    dark: '#333f55',
                },
                primary: {
                    DEFAULT: '#46b8b0',
                    light: '#f4fbfa',
                    'dark-light': 'rgba(67,97,238,.15)',
                },
                secondary: {
                    DEFAULT: '#33d3c8',
                    light: '#ebe4f7',
                    // DEFAULT: '#777',
                    // light: '#f1f1f1',
                    'dark-light': 'rgb(128 93 202 / 15%)',
                },
                success: {
                    DEFAULT: '#00ab55',
                    light: '#ddf5f0',
                    'dark-light': 'rgba(0,171,85,.15)',
                },
                danger: {
                    DEFAULT: '#e7515a',
                    light: '#fff5f5',
                    'dark-light': 'rgba(231,81,90,.15)',
                },
                warning: {
                    DEFAULT: '#e2a03f',
                    light: '#fff9ed',
                    'dark-light': 'rgba(226,160,63,.15)',
                },
                info: {
                    DEFAULT: '#2196f3',
                    light: '#e7f7ff',
                    'dark-light': 'rgba(33,150,243,.15)',
                },
                dark: {
                    DEFAULT: '#3b3f5c',
                    light: '#eaeaec',
                    'dark-light': 'rgba(59,63,92,.15)',
                },
                black: {
                    DEFAULT: '#000',
                    light: '#e3e4eb',
                    'dark-light': 'rgba(14,23,38,.15)',
                },
                white: {
                    DEFAULT: '#ffffff',
                    light: '#e0e6ed',
                    dark: '#888ea8',
                },
            },
            screens: {
                md: '768px',
                lg: '1124px',
            },
            spacing: {
                4.5: '18px',
            },
            boxShadow: {
                '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
                'sm': '.1rem .1rem .2rem #9991, -.1rem -.1rem .2rem #9991',
                'md': '.1rem .1rem .5rem #7771, -.1rem -.1rem .5rem #7771',
                'xl': '.2rem .2rem .8rem #9995, -.2rem -.2rem .8rem #9995',
            },
            borderRadius: {
                'sm': '1rem',
                'md': '2rem',
                'lg': '3rem',
                'xl': '4rem',
            },
            fontFamily: {
                nunito: ['Noto Kufi Arabic', 'sans-serif'],
            },
            keyframes: {
                shimmer: {
                  '0%': { transform: 'translateX(-50%)' },
                  '100%': { transform: 'translateX(100%)' },
                },
            },
            animation: {
                shimmer: 'shimmer .8s infinite',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-invert-headings': theme('colors.white.dark'),
                        '--tw-prose-invert-links': theme('colors.white.dark'),
                        h1: { fontSize: '40px', marginBottom: '0.5rem', marginTop: 0 },
                        h2: { fontSize: '32px', marginBottom: '0.5rem', marginTop: 0 },
                        h3: { fontSize: '28px', marginBottom: '0.5rem', marginTop: 0 },
                        h4: { fontSize: '24px', marginBottom: '0.5rem', marginTop: 0 },
                        h5: { fontSize: '20px', marginBottom: '0.5rem', marginTop: 0 },
                        h6: { fontSize: '16px', marginBottom: '0.5rem', marginTop: 0 },
                        p: { marginBottom: '0.5rem' },
                        li: { margin: 0 },
                        img: { margin: 0 },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/forms')({ strategy: 'class' }),
        require('@tailwindcss/typography'),
    ],
};

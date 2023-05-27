/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                logo: '#FF0000',
            },
        },
    },
    plugins: [],
};

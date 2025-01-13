/** @type {import('tailwindcss').Config} */
const primeui = require('tailwindcss-primeui');
module.exports = {
    darkMode: ['selector', '[class="p-dark"]'],
    content: ['./src/app/components/**/*.{html,ts,scss,css}', './src/index.html'],
    plugins: [primeui, require('flowbite/plugin')],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    }
};

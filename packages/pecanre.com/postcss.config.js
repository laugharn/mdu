const path = require('path');
const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        require('postcss-easy-import'),
        tailwindcss(path.resolve(__dirname, './tailwind.config.js')),
        require('autoprefixer'),
        require("cssnano")
    ]
}
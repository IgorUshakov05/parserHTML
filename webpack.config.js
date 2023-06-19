const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // Путь и имя файла точки входа
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './page/index.html', // Путь к вашему файлу HTML
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './page/logo.png', to: 'logo.png' }, // Путь к вашему логотипу
            ],
        }),
    ],
};

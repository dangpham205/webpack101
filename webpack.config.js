const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // file được lấy để bundle
    entry: {
        bundle: path.resolve(__dirname, './src/index.js'),
    },
    // file đc xuất ra production
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name][contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        port: 3000, // port khi run server
        open: true, // tự động mở browser khi run server
        hot: true, // hot reload
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
                    },
                },
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: './src/index.html',
        }),
    ],
};

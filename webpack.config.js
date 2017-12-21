// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');
const EXAMPLE_PATH = path.resolve(__dirname, 'example');

module.exports = {
    // Source Maps("source-map|cheap-module-source-map|eval-source-map|cheap-module-eval-source-map")
    // devtool: 'source-map',
    entry: {
        index: path.resolve(EXAMPLE_PATH, 'index.jsx')
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                include: [
                    SRC_PATH,
                    EXAMPLE_PATH
                ],
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
        }),
        new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: true
        }),
        new webpack.BannerPlugin('Copyright © 2017 by Chyrain. All rights reserved.'),
        new HtmlwebpackPlugin({
			template: path.resolve(EXAMPLE_PATH, './index.html'),
			filename: 'index.html',
			inject: 'body'
		})
    ]
}
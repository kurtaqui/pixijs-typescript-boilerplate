const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const APP_PATH = path.resolve(__dirname, "src/index.ts");
const BUILD_PATH = path.resolve(__dirname, "www");

module.exports = {
	entry: APP_PATH,
	devtool: "source-map",
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js',
		publicPath: '/js/'
	},
	resolve: {
		extensions: ['.ts', '.js'],
		modules: [path.resolve(path.join(__dirname, 'node_modules'))]
	},
	module: {
		rules: [{
				test: /\.ts$/,
				loader: 'tslint-loader',
				exclude: /(node_modules)/,
				enforce: 'pre'
			},
			{
				test: /\.ts$/,
				exclude: /(node_modules)/,
				loaders: ['awesome-typescript-loader']
			},
			{
				test: /\.png$/,
				exclude: /(node_modules)/,
				loaders: ['url-loader']
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				tslint: {
					emitErrors: true,
					failOnHint: true
				}
			}
		})
	],
	devServer: {
		hot: true,
		contentBase: BUILD_PATH
	}
};
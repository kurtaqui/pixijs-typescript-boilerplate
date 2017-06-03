const path = require('path');
const webpack = require('webpack');
const argv = require('yargs').argv;
const webpackDevServer = require('webpack-dev-server'); 
const CopyWebpackPlugin = require('copy-webpack-plugin'); 

const ROOT = path.resolve(__dirname, "src");
const APP_PATH = path.join(ROOT, "index.ts");
const BUILD_PATH = path.resolve(__dirname, "www");

let tslintAutofix;
if (argv && argv.env) {
	tslintAutofix = argv.env.fix;
}

module.exports = {
	entry: APP_PATH,
	devtool: "source-map",
	output: {
		path: path.join(BUILD_PATH, "/js/"),
		filename: 'bundle.js'
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
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ['$super', '$', 'exports', 'require']
			},
			output: {
				comments: false
			}
		}),
		new CopyWebpackPlugin([
			{ from:  path.join(ROOT, "index.html"), to: path.join(BUILD_PATH, "index.html")}
		]),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				tslint: {
					emitErrors: true,
					failOnHint: true,
					fix: tslintAutofix
				}
			}
		})
	],
	devServer: {
		hot: true,
		contentBase: BUILD_PATH
	}
};
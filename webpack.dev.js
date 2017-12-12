var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var BUILD_DIR  = path.resolve(__dirname, '.tmp');
var APP_DIR    = path.resolve(__dirname, 'app');

module.exports = {
	context: APP_DIR,

	devServer: {
		disableHostCheck: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	}, 

	entry: {
		html: APP_DIR + '/index.html',
		bundle: './scripts/index.js'
	},

	output: {
		path: BUILD_DIR,
		filename: '[name].js'
	},

	resolve: {
		extensions: ['', '.html', '.js', '.json', '.scss', '.css']
	},

	module: {
		loaders: [
			{
				test: /\.js$/i,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.s?[ca]ss$/i,
				loader: ExtractTextPlugin.extract([
				'css',
				'sass'
				])
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loaders: [
					'file?name=assets/[name].[ext]',
				]
			},
			{
				test: /\.html$/,
				loaders: [
					'file?name=[name].[ext]',
					'extract',
					'html'
				]
			}
		]
	},
	plugins: [
		new WebpackNotifierPlugin(),
		new ExtractTextPlugin('style.css'),
		new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
		new CopyWebpackPlugin([
			{
				from: path.resolve(APP_DIR, './fazenda.json')
			}
		])
	]
}

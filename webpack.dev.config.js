const { CleanWebpackPlugin } =require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const ASSET_PATH = process.env.ASSET_PATH || '/'
const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
}

module.exports = {
	entry: path.join(paths.SRC, 'index.js'),
	output: {
		filename: 'bundle.[contenthash].js',
		path: paths.DIST,
		publicPath: ASSET_PATH,
	},
	mode: 'development',

	devServer: {
		port: 9000,
		hot: true,
		static: {
			directory: paths.DIST,
		},
		devMiddleware: {
			// index: 'index.html',
			// index: 'page-template.hbs',
			index: path.resolve(paths.SRC, 'page-template.hbs'),
			writeToDisk: true,
		},
	},

	module: {
		rules: [
			{
				test: /\.(png|jpg)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 3 * 1024, // 3kb
					},
				},
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ],
			},
			{
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ],
			},
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/env' ],
						plugins: [ '@babel/plugin-proposal-class-properties' ],
					},
				},
			},
			{
				test: /\.hbs$/,
				use: [ 'handlebars-loader' ],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			// outputs file as named to the /dist directory
			filename: 'poop-machine.html',
			chunks: 'poop-machine',
			title: 'Poop Machine Webpack/React/Express',
			// uses this file as a template 
			template: path.join(paths.SRC, 'page-template.hbs'),
			description: 'A Webpack compiled React app with an ExpressJS backend',
		}),
		new HtmlWebpackPlugin({
			'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
		}),
	],
};
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ASSET_PATH = process.env.ASSET_PATH || '/'

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: '',
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				parser: {
					dataUrlCondition: {
						maxSize: 3 * 1024, // 3kb
					},
				},
			},
		  {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
			{
				test: /\.txt/,
				type: 'asset/src'
			},
			{
				test: /\.css$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
			},
			{
				test: /\.scss$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ],
			},
			{
				test: /\.(jsx|js)$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults" 
              }],
              '@babel/preset-react'
            ]
          }
        }]
			},
			{
				test: /\.hbs$/,
				use: [ 'handlebars-loader' ],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.[contenthash].css',
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'poop-machine.html',
			chunks: 'poop-machine',
			title: 'Poop Machine Webpack/React/Express',
			template: 'src/page-template.hbs',
			description: 'A Webpack compiled React app with an ExpressJS backend',
		}),
		new HtmlWebpackPlugin({
			'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
		}),
	],
};
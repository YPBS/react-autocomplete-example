//var webpack = require('webpack');
//var path = require('path');

//var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
//var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
	entry: './main.js',

	output: {
		path: './',
		filename: 'index.js',
	},
	devServer: {
		inline: true,
		port: 8080
	},
	debug: true,
	devtool: "#eval-source-map",
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',

			query: {
				presets: ['es2015', 'react']
			}
		}, {
			test: /\.css$/,
			loader: "style!css"
		},
		{
			test: /\.scss$/,
			loader: ["style", "css?modules", "sass", 'style!css!sass?outputStyle=expanded'],
		},
		/*
		{ 	test: /\.css$/, 
			loader: "style-loader!css-loader"
		 }*/
		]
	}
}

module.exports = config;

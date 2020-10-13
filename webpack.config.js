const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const filename = "react-overlay";
const output = "dist";

//Webpack config
module.exports = {
	mode: "production",
	entry: ["@babel/polyfill", `./src/${filename}.jsx`],
	output: {
		path: path.join(__dirname, output),
		filename: `${filename}.cjs.js`,
		library: `${filename}`,
		libraryTarget: "commonjs"
	},
	externals: {
		react: "React"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				resolve: {
					extensions: [".js", ".jsx"]
				},
				use: {
					loader: "babel-loader",
					options: {
						extends: "./babel.config.js"
					}
				}
			},
			{
				test: /\.(css|sass|scss)$/,
				loaders: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass")
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${filename}.css`
		})
	]
};

module.exports = {
	presets: ["@babel/preset-react", ["minify", {builtIns: false}]],
	plugins: [
		[
			"babel-plugin-transform-remove-imports",
			{
				test: "\\.(scss|css)$"
			}
		]
	]
};

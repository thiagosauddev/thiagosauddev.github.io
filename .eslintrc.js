module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["airbnb-base", "plugin:prettier/recommended"],
	settings: {
		"import/resolver": {
			alias: {
				extensions: ["*.js", "*.scss"],
				map: [
					["@", "./src/*"],
					["@assets", "./src/assets"],
					["@pages", "./src/pages"],
					["@scripts", "./src/scripts"],
					["@scss", "./src/scss"],
				],
			},
		},
	},
	overrides: [
		{
			files: ["webpack.config.js"],
			rules: {
				"node/no-unpublished-require": "off",
				"no-unpublished-import": "off",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["prettier"],
	rules: {},
	ignorePatterns: [".eslintrc.js", "webpack.config.js", "src/scripts/google-analytics.js"],
};

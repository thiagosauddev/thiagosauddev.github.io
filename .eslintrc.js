module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	ignorePatterns: ["**/vendor/*.js", "*.txt", "*.md", "*.html", "*.lock", "src/scss", "src/scripts", "src/assets", "dist", "coverage"],
	extends: ["airbnb-base", "eslint:recommended", "plugin:prettier/recommended"],
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
	rules: {
		"import/no-extraneous-dependencies": [0, { devDependencies: ["**/webpack.config.js"] }],
		"prettier/prettier": [
			"warn",
			{ endOfLine: "auto" },
			{
				usePrettierrc: true,
				fileInfoOptions: { withNodeModules: false },
			},
		],
	},
};

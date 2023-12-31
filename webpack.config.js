const PATH = require("path");
const YAML = require("yamljs");
const AutoPrefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlFaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlCSPWebpackPlugin = require("csp-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const PACKAGE_JSON = require("./package.json");

const IS_DEV_MODE = process.env.WEBPACK_SERVE;

const SITE_INFORMATION = {
	TITLE: "THIAGO SAUD DEVELOPER | Take your business to the next level!",
	TITLE_SHORT: "THIAGO SAUD DEVELOPER",
	URL: PACKAGE_JSON.author.url,
	URL_IMAGE: "https://raw.githubusercontent.com/thiagosauddev/thiagosauddev/main/images/banner.png",
	AUTHOR: PACKAGE_JSON.author.name,
	DESCRIPTION: PACKAGE_JSON.description,
	KEYWORDS: `${PACKAGE_JSON.keywords}`,
	THEME_COLOR: "#212529",
	BACKGROUND_COLOR: "#212529",
};

const getHTMLWebpackPlugin = filename => ({
	filename,
	template: PATH.resolve(__dirname, `src/pages/${filename}`),
	chunks: "all",
	minify: true,
	cache: true,
	meta: {
		charset: "UTF-8",
		viewport: "width=device-width, initial-scale=1.0",
		canonical: SITE_INFORMATION.URL,
		author: SITE_INFORMATION.AUTHOR,
		description: SITE_INFORMATION.DESCRIPTION,
		keywords: SITE_INFORMATION.KEYWORDS,
		robots: "index, follow",
		googlebot: "index, follow",
		"og:locale": "en_US",
		"og:type": "website",
		"og:url": SITE_INFORMATION.URL,
		"og:title": SITE_INFORMATION.TITLE,
		"og:site_name": SITE_INFORMATION.TITLE,
		"og:description": SITE_INFORMATION.DESCRIPTION,
		"og:image": SITE_INFORMATION.URL_IMAGE,
		"twitter:card": "summary_large_image",
		"twitter:url": SITE_INFORMATION.URL,
		"twitter:title": SITE_INFORMATION.TITLE,
		"twitter:description": SITE_INFORMATION.DESCRIPTION,
		"twitter:image": SITE_INFORMATION.URL_IMAGE,
		"twitter:image:alt": SITE_INFORMATION.TITLE,
		"theme-color": SITE_INFORMATION.THEME_COLOR,
		"msapplication-TileColor": SITE_INFORMATION.THEME_COLOR,
	},
});

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	target: "web",
	stats: {
		loggingDebug: ["sass-loader"],
	},
	devServer: {
		static: PATH.resolve(__dirname, "dist"),
		port: 3000,
		open: true,
		hot: false,
		liveReload: true,
	},
	plugins: [
		new HtmlWebpackPlugin(getHTMLWebpackPlugin("index.html")),
		new HtmlWebpackPlugin(getHTMLWebpackPlugin("404.html")),
		new HtmlFaviconsWebpackPlugin({
			inject: true,
			mode: "webapp",
			devMode: "webapp",
			publicPath: "static",
			outputPath: "static/assets",
			logo: PATH.resolve(__dirname, "src/assets/images/logotype.webp"),
			favicons: {
				start_url: IS_DEV_MODE ? "/" : SITE_INFORMATION.URL,
				manifestMaskable: true,
				appName: SITE_INFORMATION.TITLE,
				appShortName: SITE_INFORMATION.TITLE_SHORT,
				appDescription: SITE_INFORMATION.DESCRIPTION,
				developerName: SITE_INFORMATION.AUTHOR,
				developerURL: SITE_INFORMATION.URL,
				theme_color: SITE_INFORMATION.THEME_COLOR,
				background: SITE_INFORMATION.BACKGROUND_COLOR,
			},
			manifest: {
				start_url: IS_DEV_MODE ? "/" : SITE_INFORMATION.URL,
				name: SITE_INFORMATION.TITLE,
				short_name: SITE_INFORMATION.TITLE_SHORT,
				background_color: SITE_INFORMATION.BACKGROUND_COLOR,
				theme_color: SITE_INFORMATION.THEME_COLOR,
				orientation: "portrait",
			},
		}),
		new HtmlCSPWebpackPlugin(
			{
				"default-src": "'self'",
				"base-uri": "'self'",
				"connect-src": ["'self'", "https://www.google-analytics.com"],
				"font-src": "'self'",
				"frame-src": "'none'",
				"img-src": ["'self'", "https://www.google-analytics.com"],
				"manifest-src": "'self'",
				"media-src": "'none'",
				"object-src": "'none'",
				"style-src": "'self'",
				"script-src": ["'unsafe-inline'", "'self'", "'unsafe-eval'", "https://www.google-analytics.com"],
			},
			{
				enabled: true,
				hashingMethod: "sha256",
				hashEnabled: {
					"script-src": true,
					"style-src": true,
				},
				nonceEnabled: {
					"script-src": true,
					"style-src": true,
				},
			}
		),
		new MiniCssExtractPlugin({
			filename: "static/css/[name].[contenthash:8].css",
			chunkFilename: "static/css/[id].[contenthash:8].chunk.css",
		}),
		new CopyPlugin({
			patterns: [
				{
					from: PATH.resolve(__dirname, "src/robots.txt"),
					to: PATH.resolve(__dirname, "dist"),
					context: "*.txt",
				},
			],
		}),
	],
	resolve: {
		alias: {
			"@": PATH.resolve(__dirname, "src"),
			"@assets": PATH.resolve(__dirname, "src", "assets"),
			"@pages": PATH.resolve(__dirname, "src", "pages"),
			"@scripts": PATH.resolve(__dirname, "src", "scripts"),
			"@scss": PATH.resolve(__dirname, "src", "scss"),
		},
	},
	output: {
		clean: !IS_DEV_MODE,
		path: PATH.resolve(__dirname, "dist"),
		filename: "static/js/[name].[contenthash:8].js",
		chunkFilename: "static/js/[id].[chunkhash:8].chunk.js",
		assetModuleFilename: "static/assets/[name].[contenthash:8][ext]",
	},
	optimization: {
		moduleIds: "deterministic",
		runtimeChunk: "single",
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
		minimizer: [
			new CssMinimizerPlugin({
				parallel: true,
				minify: CssMinimizerPlugin.cleanCssMinify,
			}),
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				parallel: true,
				terserOptions: {
					ecma: 8,
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
				},
			}),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.sharpMinify,
					options: {
						quality: 100,
						encodeOptions: {
							webp: {
								lossless: true,
							},
						},
					},
				},
			}),
		],
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.(ttf)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(webp|ico)$/i,
				type: "asset/resource",
			},
			{
				test: /\.yaml$/i,
				type: "json",
				parser: {
					parse: YAML.parse,
				},
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						cacheCompression: true,
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-transform-runtime"],
					},
				},
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: "css-loader" },
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: { plugins: () => [AutoPrefixer()] },
						},
					},
					{ loader: "resolve-url-loader" },
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
};

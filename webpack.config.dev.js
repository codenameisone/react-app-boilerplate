const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const AutoPrefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const Webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const webpackBaseConfig = require("./webpack.config.common");

const plugins = [new Webpack.LoaderOptionsPlugin({ minimize: false })];

if (process.env.WEBPACK_WITH_BUNDLE_ANALYZER === "true") {
  plugins.unshift(new BundleAnalyzerPlugin({ openAnalyzer: false }));
}

module.exports = merge.smart(webpackBaseConfig, {
  devtool: "cheap-eval-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /.scss$/,
        exclude: /node_modules/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              minimize: false,
              sourceMap: true,
              localIdentName: "[name]__[local]__[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [AutoPrefixer({ browsers: "last 2 versions" })]
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    open: process.env.WEBPACK_AUTOMATIC_OPEN_BROWSER === "true",
    openPage: "", // https://github.com/webpack/webpack-dev-server/issues/972
    host: "0.0.0.0",
    port: 9090
  }
});

const path = require("path");
const AutoPrefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");
const Webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const Cssnano = require("cssnano");

const webpackBaseConfig = require("./webpack.config.common");

module.exports = merge.smart(webpackBaseConfig, {
  mode: "production",
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
              minimize: true,
              sourceMap: false,
              localIdentName: "[hash:base64:8]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                AutoPrefixer({ browsers: "last 2 versions" }),
                Cssnano()
              ]
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, "dist")]),
    new Webpack.LoaderOptionsPlugin({ minimize: true })
  ]
});
const path = require("path");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const Webpack = require("webpack");

const DIRECTORY = path.join(__dirname, "www");

module.exports = {
  entry: {
    index: path.resolve(DIRECTORY, "index.js")
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/",
    pathinfo: false
  },

  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "react-svg-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]"
        }
      }
    ]
  },

  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_HOST": JSON.stringify(process.env.API_HOST),
      "process.env.VERSION": JSON.stringify(process.env.VERSION)
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "favicon.png"),
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        favicons: true,
        firefox: true,
        coast: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new StylelintPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[chunkhash].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(DIRECTORY, "index.html.js"),
      inlineSource: ".css$",
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new Webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /us/)
  ]
};

module.exports = [
  {
    test: /.js$/,
    exclude: /node_modules/,
    loader: ["babel-loader"]
  },
  {
    test: /\.svg$/,
    loader: "react-svg-loader"
  },
  {
    test: /.scss$/,
    exclude: /node_modules/,
    loader: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: true,
          sourceMap: true,
          localIdentName: "[name]__[local]__[hash:base64:5]"
        }
      },
      "postcss-loader",
      "sass-loader"
    ]
  }
];

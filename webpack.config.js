const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  // 添加resolve
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    loaders: [
      // 增加新的loader
      {
        test: /\.tsx?$/,
        loaders: ["babel-loader", "ts-loader"],
      },
    ],
  },
};

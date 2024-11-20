const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // Add source-map-loader to handle source maps
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: /node_modules\/@pinecone-database\/pinecone/, // Exclude Pinecone package
      },
      // Your other loaders (e.g., babel-loader for JavaScript, style-loader for CSS)
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
  // Remove ignoreWarnings if using the exclude method above
};

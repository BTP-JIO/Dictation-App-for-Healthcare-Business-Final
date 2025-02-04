import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack"; // Import webpack

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "umd",
    globalObject: "this",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
    port: 3000,
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"], // Polyfill for Buffer (optional)
    }),
  ],
  // Add the following in order to define the fallback for Node.js modules
  resolve: {
    fallback: {
      process: require.resolve("process/browser"),
      buffer: require.resolve("buffer/"), // Optional if your code uses Buffer
    },
    extensions: [".js", ".jsx", ".json"],
  },
};

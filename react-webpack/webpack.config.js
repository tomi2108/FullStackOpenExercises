const path = require("path");
const webpack = require("webpack");

const rulesForJavascript = {
  test: /\.js$/,
  loader: "babel-loader",
  options: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
  },
};

const rulesForCss = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
};

const config = (env, argv) => {
  const backend_url = argv.mode === "production" ? "https://obscure-harbor-49797.herokuapp.com/api/notes" : "http://localhost:3001/notes";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "main.js",
    },
    module: {
      rules: [rulesForJavascript, rulesForCss],
    },
    devServer: {
      static: path.resolve(__dirname, "build"),
      compress: true,
      port: 3000,
    },
    devtool: "source-map",
    plugins: [new webpack.DefinePlugin({ BACKEND_URL: JSON.stringify(backend_url) })],
  };
};

module.exports = config;

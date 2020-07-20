module.exports = {
    entry: {
      main: "./main.js",
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                [
                  "@babel/plugin-transform-react-jsx",
                  { pragma: "ToyReact.createElement" },
                ],
              ],
            },
          },
        },
      ],
    },
    mode: "development",
    optimization: {
      minimize: false,
    },
  };
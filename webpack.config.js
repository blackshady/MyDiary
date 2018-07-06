const path = require ('path');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');

module.exports = {
  entry: './UI/index.js',
  output: {
    path: path.resolve (__dirname, './UI/build'),
    filename: 'bundle.js',
    publicPath: './UI/build',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract ({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                minimize: true,
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [new ExtractTextPlugin ('styles.css')],
};

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './UI/index.js',

  output: {
    path: path.resolve(__dirname, './UI/build'),
    filename: 'bundle.js',
    // publicPath: './UI/',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: ['/node_modules/', '/UI/client/js'],
      use: {
        loader: 'babel-loader',
      },
    },

    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: false,
            minimize: true,
            sourceMap: true,
            localIdentName: '[hash:base64:5]',
          },
        }],
      }),
    },
    {
      test: /\.(ttf|otf|eot|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]',
        },
      },
    },
    {
      test: /\.(png|svg|jpe?g|gif)/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: './UI/img/[name].[ext]',
          limit: 10000,
        },
      },
      'img-loader',
      ],
    },
    ],
  },

  plugins: [new ExtractTextPlugin('styles.css')],
};

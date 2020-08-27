const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  context: path.join(__dirname, 'app'),
  entry: {
    main: './app'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'final.js',
    publicPath: '/assets/'
  },

  resolveLoader: {
    alias: {
      'cutting-comments-loader': path.join(__dirname, 'app/loaders', 'cutting-comments-loader.js')
    }
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
        options: {
          name: '[contenthash].[ext]',
        },
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "cutting-comments-loader",
            options: {attrs: false}
          },
          {
            loader: "html-loader",
            options: {attrs: false}
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new HtmlWebpackPlugin({
      title: "Movie App",
      template: "app/index.html",
      filename: "index.html",
    }),
    new Dotenv({
      path: './.env'
    }),
  ],

  resolve: {
    modules: [],
    extensions: ['.js', '.jsx', '.scss', '.css']
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunk: 'all',
          minSize: 0,
          maxSize: 2
        }
      }
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin()
    ],
  },

  target: 'web',

  watch: false
}

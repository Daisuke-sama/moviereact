const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',

  context: path.join(__dirname, 'app'),
  entry: {
    main: './index'
  },
  output: {
    path: path.resolve(__dirname, 'dev'),
    filename: '[name].js',
    chunkFilename: "[name].js",
    publicPath: '/assets/'
  },

  resolve: {
    modules: [path.resolve(__dirname, './app'), 'node_modules'],
    extensions: ['.js', '.jsx', '.scss', '.css']
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /.s?css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        loader: 'babel-loader'
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      title: "Movie App",
      template: "index.html"
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new Dotenv({
      path: './.env'
    }),
  ],

  target: 'web',

  stats: {
    colors: true,
    reasons: true,
    hash: true,
    version: true,
    timings: true,
    chunks: true,
    chunkModules: true,
    cached: true,
    cachedAssets: true
  },

  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dev'),
    compress: true,
    port: 3000,
    bonjour: true
  },
  watch: false
}

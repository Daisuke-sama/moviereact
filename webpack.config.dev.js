const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',

  context: path.join(__dirname, 'app'),
  entry: {
    main: './app'
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
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
        options: {
          name: '[path][name].[ext]',
        },
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
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    }
  },

  plugins: [
    new CleanWebpackPlugin(['dev']),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new HtmlWebpackPlugin({
      title: "Movie App",
      template: "app/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new Dotenv({
      path: './.env'
    }),
  ],

  target: 'web',

  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dev'),
    compress: true,
    port: 9000,
    bonjour: true
  },
  watch: false
}

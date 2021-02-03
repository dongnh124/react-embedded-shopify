const path = require("path")

// webpack prod
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const rootDir = path.resolve(__dirname)

module.exports = {
  entry: {
    main: path.resolve(rootDir, 'index.js'),
  },
  output: {
    path: path.resolve(rootDir, './assets'),
    filename: '2b.bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '2b.bundle.css',
    }),
    new webpack.DefinePlugin({
      LINK_FETCH: JSON.stringify('/apps/2b-offspring'),
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
          },
        }
      }),
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.css', '.scss', '.sass' ],
    modules: [ 'node_modules' ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-optional-chaining',
            ],
          },
        },
      },
      {
        test: /\.(s?)[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ],
      }
    ],
  },
  // watchOptions: {
  //   aggregateTimeout: 5000,
  //   poll: 1000,
  // },
  mode: 'production',
  // mode: 'development',
  // devtool: "inline-source-map",
  watch: true,
}
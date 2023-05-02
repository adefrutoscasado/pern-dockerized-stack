import path from 'path'
import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

const mapObject = (object, fn) => {
  const objectified = Object
    .entries(object)
    .map(fn)
  return Object.assign({}, ...objectified)
}

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const webpackConfig = (env): Configuration => ({
  entry: './src/index.tsx',
  ...(env.production || !env.development ? {} : { devtool: 'eval-source-map' }),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /build/
      },
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  devServer: {
    // docker cant use localhost here
    host: '0.0.0.0',
    port: 3010,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      // Make build load from '/build' instead of just 'build' in index.html
      publicPath:'/'
    }),
    new webpack.DefinePlugin({
      // Pass all arguments from 'npm run build' indiscriminately
      ...mapObject(env, ([key, value]) => {
        return { [`process.env.${key}`]: JSON.stringify(value) }
      }),
      // Set default arguments of 'npm run build'
      'process.env.PRODUCTION': env.production || JSON.stringify(false),
      'process.env.API_HOST': JSON.stringify(env.API_HOST || 'http://localhost:3000/api'),
      'process.env.NAME': JSON.stringify(require('./package.json').name),
      'process.env.VERSION': JSON.stringify(require('./package.json').version),
    }),
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: {
    //     files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
    //   }
    // })
  ]
})

export default webpackConfig;

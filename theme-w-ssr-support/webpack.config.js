const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Output build path
 */
const buildPath = path.join(__dirname, 'build', 'js');

/**
 * Watch configuration
 */
const watch = process.env.NODE_ENV === 'development';

/**
 * UglifyJs configuration
 */
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';
const uglifyJsPlugin = new UglifyJsPlugin({
  uglifyOptions: {
    compress: {
      warnings: false,
      // Disabled because of an issue with Uglify breaking seemingly valid code:
      // https://github.com/facebookincubator/create-react-app/issues/2376
      // Pending further investigation:
      // https://github.com/mishoo/UglifyJS2/issues/2011
      comparisons: false,
    },
    mangle: true,
    output: {
      comments: false,
      // Turned on because emoji and regex is not minified properly using default
      // https://github.com/facebookincubator/create-react-app/issues/2488
      ascii_only: true,
    },
  },
  sourceMap: shouldUseSourceMap,
});

/**
 * ExtractTextPlugins
 */
const cssPlugin = new ExtractTextPlugin('main.css');

/**
 * Plugins
 */
const plugins = [
  new CopyWebpackPlugin(
    [{ from: 'public', to: '..' }],
    { debug: 'debug' },
  ),
  cssPlugin,
  uglifyJsPlugin,
];

const rules = [
  {
    test: /\.(js|jsx|mjs)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          /*
            To get tree shaking working, we need the `modules: false` below.
            https://goo.gl/4vZBSr - 2ality blog mentions that the issue is caused
            by under-the-hood usage of `transform-es2015-modules-commonjs`.
            https://goo.gl/sBmiwZ - A comment on the above post shows that we
            can use `modules: false`.
            https://goo.gl/aAxYAq - `babel-preset-env` documentation.
          */
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: [
                  'last 2 Chrome versions',
                  'last 2 Firefox versions',
                  'last 2 Safari versions',
                  'last 2 iOS versions',
                  'last 1 Android version',
                  'last 1 ChromeAndroid version',
                  'ie 11',
                ],
              },
              modules: false, // Needed for tree shaking to work.
            },
          ],
          // '@babel/preset-env', // https://goo.gl/aAxYAq
          '@babel/preset-react', // https://goo.gl/4aEFV3
        ],
        plugins: [
          '@babel/plugin-proposal-object-rest-spread', // https://goo.gl/LCHWnP
          '@babel/plugin-proposal-class-properties', // https://goo.gl/TE6TyG
          '@babel/plugin-transform-runtime',
        ],
        cacheDirectory: true,
      },
    },
  },
  {
    test: /(?:.*)\.s?css$/,
    exclude: /(node_modules|bower_components)/,
    use: cssPlugin.extract({
      use: [
        // "postcss" loader applies autoprefixer to our CSS.
        { loader: 'raw-loader' },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
        // "sass" loader converts SCSS to CSS.
        {
          loader: 'sass-loader',
          options: {
            // Add common CSS file for variables and mixins.
            outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
          },
        },
      ],
    }),
  },
  {
    test: /\.(jpg|svg|png|ico|gif|eot|woff|ttf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '/images/[name].[ext]',
        },
      },
    ],
  },
];

const resolve = {
  modules: [
    path.resolve(__dirname, 'src'),
    'node_modules',
  ],
  extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
};

/**
 * Webpack configurations
 */
module.exports = [
  // Server-side PHP
  {
    entry: './src/server/index.js',
    output: {
      pathinfo: true,
      filename: 'server.js',
      path: buildPath,
    },
    plugins,
    module: { rules },
    resolve,
    devtool: 'cheap-eval-source-map',
    stats: 'minimal',
    target: 'node',
    watch,
  },
  // Client-side JS
  {
    entry: './src/client.jsx',
    output: {
      pathinfo: true,
      filename: 'client.js',
      path: buildPath,
    },
    plugins,
    module: { rules },
    resolve,
    devtool: 'cheap-eval-source-map',
    stats: 'minimal',
    watch,
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },
];

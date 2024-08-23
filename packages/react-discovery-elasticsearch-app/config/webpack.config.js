const fs = require('fs')
const isWsl = require('is-wsl')
const path = require('path')
const webpack = require('webpack')
const resolve = require('resolve')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const TerserPlugin = require('terser-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const paths = require('./paths')
const modules = require('./modules')
const getClientEnvironment = require('./env')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin')
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false'
const useTypeScript = fs.existsSync(paths.appTsConfig)

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'
  const publicPath = isEnvProduction
    ? paths.servedPath
    : isEnvDevelopment && '/'
  const publicUrl = isEnvProduction
    ? publicPath.slice(0, -1)
    : isEnvDevelopment && ''
  const env = getClientEnvironment(publicUrl)
  return {
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? false
      : isEnvDevelopment && 'inline-source-map',
    entry: [
      isEnvDevelopment &&
        require.resolve('react-dev-utils/webpackHotDevClient'),
      paths.appIndexJs
    ].filter(Boolean),
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    module: {
      rules: [
        {
          oneOf: [
            {
              include: paths.appSrc,
              test: /\.(ts|tsx)$/,
              use: [
                { loader: 'react-hot-loader/webpack' },
                { loader: 'ts-loader' }
              ]
            }
          ]
        }
      ],
      strictExportPresence: true
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        (compiler) => {
          new TerserPlugin({
            parallel: !isWsl,
            terserOptions: {
              compress: {
                comparisons: false,
                ecma: 5,
                inline: 2,
                warnings: false
              },
              mangle: {
                safari10: true
              },
              output: {
                ascii_only: true, //eslint-disable-line
                comments: false,
                ecma: 5
              },
              parse: {
                ecma: 8
              }
            }
          }).apply(compiler)
        }
      ],
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        name: false
      }
    },
    output: {
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
          path
            .relative(paths.appSrc, info.absoluteResourcePath)
            .replace(/\\/g, '/')
        : isEnvDevelopment &&
        (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      path: isEnvProduction ? paths.appBuild : undefined,
      pathinfo: isEnvDevelopment,
      publicPath
    },
    performance: false,
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml
          },
          isEnvProduction
            ? {
                minify: {
                  collapseWhitespace: true,
                  keepClosingSlash: true,
                  minifyCSS: true,
                  minifyJS: true,
                  minifyURLs: true,
                  removeComments: true,
                  removeEmptyAttributes: true,
                  removeRedundantAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  useShortDoctype: true
                }
              }
            : undefined
        )
      ),
      isEnvProduction &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new ModuleNotFoundPlugin(paths.appPath),
      new webpack.DefinePlugin(env.stringified),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        generate: (seed, files) => {
          const manifestFiles = files.reduce(function (manifest, file) {
            manifest[file.name] = file.path
            return manifest
          }, seed)
          return {
            files: manifestFiles
          }
        },
        publicPath
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      isEnvProduction &&
        new WorkboxWebpackPlugin.GenerateSW({
          exclude: [/\.map$/, /asset-manifest\.json$/],
          navigateFallback: publicUrl + '/index.html'
        }),
      useTypeScript &&
        new ForkTsCheckerWebpackPlugin()
    ].filter(Boolean),
    resolve: {
      alias: {
        'react-native': 'react-native-web'
      },
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      modules: ['node_modules', paths.appNodeModules].concat(modules.additionalModulePaths || []),
      plugins: [
        PnpWebpackPlugin,
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
      ]
    },
    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(module)
      ]
    }
  }
}

const webpack = require('webpack')
const helpers = require('./helpers')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function(options) {
    var jsLoaders = options.jsLoaders || ['ng-annotate', 'babel']

    return {
        entry: {
            main: helpers.root('src', 'app', 'root.module.js'),
            vendor: helpers.root('src', 'app', 'vendor.js')
        },
        // metadata: {
        //     baseUrl: '/',
        //     isDevServer: helpers.isWebpackDevServer()
        // },
        devtool: 'sourcemap',
        output: {
            path: helpers.root('dist'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map'
        },
        resolve: {
            extensions: ['.js', '.json'],
            modules: [helpers.root('src'), 'node_modules']
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        plugins: [
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ["vendor"]
            // }),
            // new CopyWebpackPlugin([
            //     {
            //         from: 'src/assets',
            //         to: 'assets'
            //     }
            // ]),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: 'dependency'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(
                    process.env.NODE_ENV || 'development'
                )
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loaders: jsLoaders
                },
                {
                    test: /\.html$/,
                    loaders: [
                        'ngtemplate-loader?relativeTo=' + helpers.root('src'),
                        'raw-loader'
                    ],
                    exclude: [helpers.root('src/index.html')]
                },
                {
                    test: /\.scss$/,
                    loaders: [
                        'style-loader',
                        'css-loader?sourceMap',
                        'sass-loader?sourceMap'
                    ]
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(ttf|otf|eot|svg|woff2?)$/,
                    loader: 'url-loader'
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: 'file-loader'
                }
            ]
        }
    }
}

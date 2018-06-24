/**
 * Development Webpack Configuration
 */

const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const helpers = require('./helpers')
const combineLoaders = require('webpack-combine-loaders')

const ENV = (process.env.ENV = process.env.NODE_ENV = 'development')
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

module.exports = function(options) {
    return webpackMerge(
        commonConfig({
            env: ENV,

            // in development we want to use the ngRedux/Redux Devtools which uses JSX
            // and React. That's why we'll override the jsLoaders preset to include
            // 'react'
            jsLoaders: combineLoaders([
                { loader: 'ng-annotate-loader' },
                {
                    loader: 'babel-loader',
                    query: {
                        presets: ['env']
                    }
                }
            ])
        }),
        {
            mode: 'development',
            devtool: 'cheap-module-source-map',
            devServer: {
                port: PORT,
                host: HOST,
                historyApiFallback: true,
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000
                }
                // outputPath: helpers.root("dist")
            }
        }
    )
}

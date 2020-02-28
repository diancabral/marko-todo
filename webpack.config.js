const path = require('path')
const webpack = require('webpack')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const MarkoPlugin = require('@marko/webpack/plugin').default

/* */

const devServerPort = Math.floor(1000 + Math.random() * 9000)
const development = process.env.NODE_ENV === 'development'

/* */

console.log(`Webpack is building for ${process.env.NODE_ENV}...`)
console.log("\n")

/* */

module.exports = {

    mode : process.env.NODE_ENV,

    entry : './src/app.js',

    output : {

        filename : development ? 'app.js' : '[name].[contenthash:8].js',
        path : path.join(__dirname, 'dist'),
        publicPath : development ? '/' : '/assets/'

    },

    module : {

        rules : [

            {

                test : /\.js$/,
                loader : 'babel-loader',
                exclude : '/node-modules/',

                query : {

                    presets : [

                        '@babel/env'

                    ],

                    plugins : [

                        '@babel/plugin-syntax-dynamic-import'

                    ]

                }

            },

            {

                test : /\.marko/,
                loader : '@marko/webpack/loader'

            },

            {

                test:/\.(s*)css$/,
                oneOf: [

                    {

                        use : [

                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'postcss-loader',
                            'sass-loader'

                        ]

                    }

                ]

            },

        ]

    },

    resolve: {

        alias : {

            '@' : path.resolve(__dirname, 'src'),
            'node_modules' : path.resolve(__dirname, 'node_modules')

        }

    },

    plugins : [

        new MiniCssExtractPlugin({

            filename: development ? '[name].css' : '[name].[contenthash:8].css'

        }),

        new CleanWebpackPlugin(),

        new webpack.optimize.ModuleConcatenationPlugin(),

        new HtmlWebpackPlugin({

            template: './public/index.html',
            inject: true

        }),

        new CopyWebpackPlugin([

            {

                from: './public/',
                ignore: ['index.html']

            }

        ]),

    ],

    devServer : {

        port : devServerPort,
        contentBase: './public/',
        publicPath : development ? '/' : '/assets/',
        compress: true,
        open : true,
        watchContentBase: true

    },

    optimization: {

        minimizer: [

            new UglifyJsPlugin({

                cache: true,
                parallel: true,
                sourceMap: false

            }),

            new OptimizeCSSAssetsPlugin()

        ],

        splitChunks: {

            chunks: 'all'

        }

    }

}

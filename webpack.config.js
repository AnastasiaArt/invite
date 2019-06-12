// Webpack v4
const path = require('path');
const jquery =  require("jquery");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin= require('copy-webpack-plugin');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        // extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use:  [  'style-loader', MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        url: false
                    }
                },'postcss-loader', 'sass-loader']
            },
            {
                test: /images[\\\/].+\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name][hash].[ext]'
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 70
                        }
                    }
                },
            ],
        }, {
            test: /fonts[\\\/].+\.(otf|eot|svg|ttf|woff|woff2)$/i,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },
        }
    ]
},

plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),

        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),

        new WebpackMd5Hash(),
        new CopyWebpackPlugin([
            {
                from: './src/images',
                to: './images'
            },
            {
                from: './src/fonts',
                to: './fonts'
            }
        ])
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 9000,
        compress: true,
        open: true
    }
};

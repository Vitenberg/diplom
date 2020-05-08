const path = require('path');
const  webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: { 
        index: './src/pages/main/index.js', 
        about: './src/pages/about/about.js',
        stat: './src/pages/statistics/stat.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [{ // тут описываются правила
                    test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                    use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
                    exclude: /node_modules/ // исключает папку node_modules
                },
                {
                    test: /\.css$/i,
                    use: [(isDev ? 'style-loader' : { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../'} }),
                                    'css-loader', 
                                    'postcss-loader']
                },
                { //обработка шрифтов
                    test: /\.(eot|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=./vendor/[name].[ext]'
                },
                {
                    test: /\.(png|jpg|gif|ico|svg)$/,
                    use: ['file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                        {loader: 'image-webpack-loader',
                            options: {}
                        },
                    ]
                },

            ]
        },
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: { 
                preset: ['default'],
            },
            canPrint: true
        }), 
        new HtmlWebpackPlugin({ 
            inject: false,
            template: './src/pages/main/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({ 
            inject: false,
            template: './src/pages/about/about.html',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({ 
            inject: false,
            template: './src/pages/statistics/stat.html',
            filename: 'stat.html'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
        ]    
}
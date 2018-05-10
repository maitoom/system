'use strict';
const path=require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    entry:{
        main:'./src/main.js'
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'build.js'
    },
    module:{
        rules:[
        {
            test:/\.css$/,
            loader:'style-loader!css-loader!autoprefixer-loader'
        },
        {
           test:/\.less$/,
            loader:'style-loader!css-loader!autoprefixer-loader!less-loader' 
        },
        {
            test:/\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
            loader:'url-loader',
            options:{
                limit:4096,
                name:'[name].[ext]'
            }
        },
        {
            test:/\.js$/,
            loader:'babel-loader',
            exclude:/node-modules/,
        },
        {
            test:/vue-preview.src.*?js$/,
            loader:'babel-loader'
        },
        {test:/\.vue$/,
        loader:'vue-loader'
        }
        ]
    },
    plugins:[
    new htmlWebpackPlugin(
    {
        template:'./src/index.html'
    })
    ]


}
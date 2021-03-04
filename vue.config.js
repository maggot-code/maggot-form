/*
 * @Author: maggot-code
 * @Date: 2021-03-03 22:58:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 09:28:57
 * @Description: file content
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    publicPath: './',
    outputDir: 'dist', // 打包输出目录
    assetsDir: 'static',
    productionSourceMap: false,
    css: {
        // 查看CSS属于哪个css文件
        sourceMap: process.env.NODE_ENV === 'development',
        extract: true
    },
    configureWebpack: config => {
        config.devtool = 'source-map';
        // config.plugins.push(new BundleAnalyzerPlugin())
    }
}
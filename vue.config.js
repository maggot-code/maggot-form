/*
 * @Author: maggot-code
 * @Date: 2021-03-03 22:58:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-03 22:59:45
 * @Description: file content
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    configureWebpack: config => {
        config.plugins.push(new BundleAnalyzerPlugin())
    }
}
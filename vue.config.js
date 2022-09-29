/*
 * @Author: maggot-code
 * @Date: 2021-03-03 22:58:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-29 16:01:02
 * @Description: file content
 */
// const BundleAnalyzerPlugin =require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const pluginList = [
    // new BundleAnalyzerPlugin(),
    new LodashModuleReplacementPlugin(),
    new CompressionWebpackPlugin({
        filename: info => `${info.path}.gz${info.query}`,
        algorithm: 'gzip',
        threshold: 10240 * 10, // 只有大小大于该值的资源会被处理 10240
        test: new RegExp('\\.(' + ['js', 'css', 'json'].join('|') + ')$'),
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
    })
]

module.exports = {
    publicPath: "./",
    outputDir: "dist", // 打包输出目录
    assetsDir: "static",
    productionSourceMap: false,
    css: {
        // 查看CSS属于哪个css文件
        sourceMap: process.env.NODE_ENV === "development",
        extract: true,
    },
    devServer: {
        https: false,
        open: false,
        proxy: {
            "/SystemManage": {
                target: "http://192.1.1.5:8080",
                ws: true,
                secure: false,
                changeOrigin: true,
                pathReWrite: { "^/SystemManage": "" },
            },
            "/kyhxs": {
                target: "http://192.1.1.5:8080",
                ws: true,
                secure: false,
                changeOrigin: true,
                pathReWrite: { "^/kyhxs": "" },
            },
            "/SWZDH": {
                target: "http://192.1.1.5:8080",
                ws: true,
                secure: false,
                changeOrigin: true,
                pathReWrite: { "^/SWZDH": "" },
            },
            "/api/node": {
                target: "http://127.0.0.1:8000",
                ws: true,
                secure: false,
                changeOrigin: true,
                pathReWrite: { "^/api/node": "" },
            },
        },
    },
    configureWebpack: (config) => {
        // 调试JS
        // if (process.env.NODE_ENV === "development") {
        //     config.devtool = "source-map";
        // } else {
        //     pluginList.push(new BundleAnalyzerPlugin());
        // }

        if (process.env.NODE_ENV === "development") {
            config.devtool = "source-map";
        }
        //打包文件大小配置
        config.performance = {
            maxEntrypointSize: 10240 * 100,
            maxAssetSize: 10240 * 100,
        };
        // 公共代码抽离
        config.optimization = {
            // 分割代码块
            splitChunks: {
                cacheGroups: {
                    //公用模块抽离
                    common: {
                        chunks: "initial",
                        minSize: 10240 * 10, //大于0个字节
                        minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
                    },
                    vendor: {
                        priority: 1, //权重
                        test: /node_modules/,
                        chunks: "initial",
                        minSize: 10240 * 10, //大于0个字节
                        minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
                    },
                },
            },
        };
        config.plugins.push(...pluginList);
        config.mode = process.env.NODE_ENV;
    },
};

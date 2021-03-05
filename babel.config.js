/*
 * @Author: maggot-code
 * @Date: 2021-02-28 13:25:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-05 13:15:13
 * @Description: babel config
 */
module.exports = {
    presets: ["@babel/preset-env"],
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        "lodash"
    ]
}

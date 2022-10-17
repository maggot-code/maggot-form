/*
 * @FilePath: \maggot-form\packages\mg-switch\index.js
 * @Author: maggot-code
 * @Date: 2022-10-17 17:02:22
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-10-17 17:03:24
 * @Description: 
 */
import MgSwitch from "./src/mg-switch";

/* istanbul ignore next */
MgSwitch.install = function (Vue) {
    Vue.component(MgSwitch.name, MgSwitch);
};

export default MgSwitch;

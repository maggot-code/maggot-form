/*
 * @FilePath: \maggot-form\packages\mg-slider\index.js
 * @Author: maggot-code
 * @Date: 2022-10-18 09:22:51
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-10-18 09:23:13
 * @Description: 
 */
import MgSlider from "./src/mg-slider";

/* istanbul ignore next */
MgSlider.install = function (Vue) {
    Vue.component(MgSlider.name, MgSlider);
};

export default MgSlider;

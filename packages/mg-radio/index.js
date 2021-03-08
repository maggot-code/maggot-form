/*
 * @Author: maggot-code
 * @Date: 2021-03-06 14:43:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-06 14:44:30
 * @Description: export mg-radio component
 */
import MgRadio from './src/mg-radio';

/* istanbul ignore next */
MgRadio.install = function (Vue) {
    Vue.component(MgRadio.name, MgRadio);
};

export default MgRadio;
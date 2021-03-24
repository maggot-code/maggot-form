/*
 * @Author: maggot-code
 * @Date: 2021-03-23 16:30:42
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-23 16:31:36
 * @Description: export mg-cascader component
 */
import MgCascader from './src/mg-cascader';

/* istanbul ignore next */
MgCascader.install = function (Vue) {
    Vue.component(MgCascader.name, MgCascader);
};

export default MgCascader;
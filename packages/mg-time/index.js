/*
 * @Author: maggot-code
 * @Date: 2021-03-17 11:28:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-17 13:12:55
 * @Description: export mg-time component
 */
import MgTime from './src/mg-time';

/* istanbul ignore next */
MgTime.install = function (Vue) {
    Vue.component(MgTime.name, MgTime);
};

export default MgTime;
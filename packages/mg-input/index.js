/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:49:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 09:50:59
 * @Description: export mg-input component
 */
import MgInput from './src/mg-input';

/* istanbul ignore next */
MgInput.install = function (Vue) {
    Vue.component(MgInput.name, MgInput);
};

export default MgInput;
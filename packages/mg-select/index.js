/*
 * @Author: maggot-code
 * @Date: 2021-03-04 16:53:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 16:53:30
 * @Description: export mg-select component
 */
import MgSelect from './src/mg-select';

/* istanbul ignore next */
MgSelect.install = function (Vue) {
    Vue.component(MgSelect.name, MgSelect);
};

export default MgSelect;
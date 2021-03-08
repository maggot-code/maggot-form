/*
 * @Author: maggot-code
 * @Date: 2021-03-06 17:34:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-06 17:36:20
 * @Description: export mg-check-box component
 */
import MgCheckBox from './src/mg-check-box';

/* istanbul ignore next */
MgCheckBox.install = function (Vue) {
    Vue.component(MgCheckBox.name, MgCheckBox);
};

export default MgCheckBox;
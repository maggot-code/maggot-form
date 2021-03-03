/*
 * @Author: maggot-code
 * @Date: 2021-03-03 16:58:15
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-03 17:15:26
 * @Description: file content
 */

import MgButton from './src/mg-button.vue';

/* istanbul ignore next */
MgButton.install = function (Vue) {
    Vue.component(MgButton.name, MgButton);
};

export default MgButton;
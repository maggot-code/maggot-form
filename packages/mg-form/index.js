/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:46:35
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 09:49:40
 * @Description: export mg-form component
 */
import MgForm from './src/mg-form';

/* istanbul ignore next */
MgForm.install = function (Vue) {
    Vue.component(MgForm.name, MgForm);
};

export default MgForm;
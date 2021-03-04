/*
 * @Author: maggot-code
 * @Date: 2021-03-03 16:50:39
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 10:16:55
 * @Description: mg form component inlet
 */
import '../plugins/element';
import MgForm from '../packages/mg-form';
import MgInput from '../packages/mg-input';

const components = [
    MgForm,
    MgInput
];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    MgForm,
    MgInput
}

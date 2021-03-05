/*
 * @Author: maggot-code
 * @Date: 2021-03-03 16:50:39
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-05 15:08:42
 * @Description: mg form component inlet
 */
import '../plugins/element';
import MgForm from '../packages/mg-form';
import MgInput from '../packages/mg-input';
import MgSelect from '../packages/mg-select';

const components = [
    MgForm,
    MgInput,
    MgSelect
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
    MgInput,
    MgSelect
}

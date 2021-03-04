/*
 * @Author: maggot-code
 * @Date: 2021-03-03 16:50:39
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 18:21:11
 * @Description: mg form component inlet
 */
import '../plugins/element';
import '../packages/mg-form/tag-mill';
import MgForm from '../packages/mg-form';
import MgInput from '../packages/mg-input';
import MgSelect from '../packages/mg-select';
import Tagmill from '../packages/mg-form/tag-mill';

const components = [
    MgForm,
    MgInput,
    MgSelect
];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

    Vue.prototype.$Tagmill = new Tagmill();
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

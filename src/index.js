/*
 * @Author: maggot-code
 * @Date: 2021-03-03 16:50:39
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-08 10:06:11
 * @Description: mg form component inlet
 */
import '../plugins/element';
import MgForm from '../packages/mg-form';
import MgInput from '../packages/mg-input';
import MgSelect from '../packages/mg-select';
import MgRadio from '../packages/mg-radio';
import MgCheckBox from '../packages/mg-check-box';
import MgUpload from '../packages/mg-upload';

const components = [
    MgForm,
    MgInput,
    MgSelect,
    MgRadio,
    MgCheckBox,
    MgUpload
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
    MgSelect,
    MgRadio,
    MgCheckBox,
    MgUpload
}

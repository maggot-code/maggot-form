/*
 * @Author: maggot-code
 * @Date: 2021-03-23 11:24:11
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-23 11:24:44
 * @Description: export mg-autocomplete component
 */
import MgAutocomplete from './src/mg-autocomplete';

/* istanbul ignore next */
MgAutocomplete.install = function (Vue) {
    Vue.component(MgAutocomplete.name, MgAutocomplete);
};

export default MgAutocomplete;
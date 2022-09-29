/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:51:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-29 14:54:06
 * @Description: unify install form components
 */
import MgInput from '../mg-input';
import MgSelect from '../mg-select';
import MgRadio from '../mg-radio';
import MgCheckBox from '../mg-check-box';
import MgUpload from '../mg-upload';
import MgTime from '../mg-time';
import MgAutocomplete from '../mg-autocomplete';
import MgCascader from '../mg-cascader';
import MgSearch from "../mg-search";

const components = [
    MgInput,
    MgSelect,
    MgRadio,
    MgCheckBox,
    MgUpload,
    MgTime,
    MgAutocomplete,
    MgCascader,
    MgSearch,
];

const FormCellComponents = {};
const FormCellRules = {};
components.forEach(component => {
    const { name, trigger } = component;
    FormCellComponents[name] = component;
    FormCellRules[name] = trigger || "blur"
});

export {
    FormCellComponents,
    FormCellRules,
};



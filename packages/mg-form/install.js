/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:51:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-23 16:34:41
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

const components = [
    MgInput,
    MgSelect,
    MgRadio,
    MgCheckBox,
    MgUpload,
    MgTime,
    MgAutocomplete,
    MgCascader
];

const FormCellComponents = {};
components.forEach(component => {
    FormCellComponents[component.name] = component;
});

export {
    FormCellComponents
};



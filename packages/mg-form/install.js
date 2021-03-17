/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:51:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-17 13:13:59
 * @Description: unify install form components
 */
import MgInput from '../mg-input';
import MgSelect from '../mg-select';
import MgRadio from '../mg-radio';
import MgCheckBox from '../mg-check-box';
import MgUpload from '../mg-upload';
import MgTime from '../mg-time';

const components = [
    MgInput,
    MgSelect,
    MgRadio,
    MgCheckBox,
    MgUpload,
    MgTime
];

const FormCellComponents = {};
components.forEach(component => {
    FormCellComponents[component.name] = component;
});

export {
    FormCellComponents
};



/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:51:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-08 10:07:05
 * @Description: unify install form components
 */
import MgInput from '../mg-input';
import MgSelect from '../mg-select';
import MgRadio from '../mg-radio';
import MgCheckBox from '../mg-check-box';
import MgUpload from '../mg-upload';

const components = [
    MgInput,
    MgSelect,
    MgRadio,
    MgCheckBox,
    MgUpload
];

const FormCellComponents = {};
components.forEach(component => {
    FormCellComponents[component.name] = component;
});

export {
    FormCellComponents
};



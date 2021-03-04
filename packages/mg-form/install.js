/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:51:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 16:54:54
 * @Description: unify install form components
 */
import MgInput from '../mg-input';
import MgSelect from '../mg-select';

const components = [
    MgInput,
    MgSelect
];

const FormCellComponents = {};
components.forEach(component => {
    FormCellComponents[component.name] = component;
});

export {
    FormCellComponents
};



/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:51:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 10:21:23
 * @Description: unify install form components
 */
import MgInput from '../mg-input';

const components = [
    MgInput
];

const FormCellComponents = {};
components.forEach(component => {
    FormCellComponents[component.name] = component;
});

export {
    FormCellComponents
};



/*
 * @Author: maggot-code
 * @Date: 2021-03-08 10:04:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-08 10:05:26
 * @Description: export mg-upload component
 */
import MgUpload from './src/mg-upload';

/* istanbul ignore next */
MgUpload.install = function (Vue) {
    Vue.component(MgUpload.name, MgUpload);
};

export default MgUpload;
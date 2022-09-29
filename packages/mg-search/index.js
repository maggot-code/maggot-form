/*
 * @FilePath: \maggot-form\packages\mg-search\index.js
 * @Author: maggot-code
 * @Date: 2022-09-29 14:51:49
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-29 14:52:02
 * @Description: 
 */
import MgSearch from "./src/mg-search";

/* istanbul ignore next */
MgSearch.install = function (Vue) {
    Vue.component(MgSearch.name, MgSearch);
};

export default MgSearch;

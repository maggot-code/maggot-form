/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:15:56
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 15:27:57
 * @Description: file content
 */
import Vue from 'vue';
import VueCompositionApi from "@vue/composition-api";
import App from './App';
import MGform from './index';
// import MGform from "../lib/maggot-form.common";
import 'element-ui/lib/theme-chalk/index.css';
// import "../lib/maggot-form.css";

Vue.use(VueCompositionApi);
Vue.use(MGform);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app')

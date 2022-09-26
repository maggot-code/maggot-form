/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:15:56
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-26 16:19:59
 * @Description: file content
 */
import Vue from 'vue';
import VueCompositionApi from "@vue/composition-api";
import App from './App';
import MGform from './index';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueCompositionApi);
Vue.use(MGform);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app')

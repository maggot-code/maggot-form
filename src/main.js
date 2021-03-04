/*
 * @Author: maggot-code
 * @Date: 2021-03-04 09:15:56
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 09:38:27
 * @Description: file content
 */
import Vue from 'vue';
import App from './App';
import MGform from './index';

Vue.use(MGform);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app')
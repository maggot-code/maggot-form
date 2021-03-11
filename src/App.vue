<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-10 17:09:13
 * @Description: file content
-->
<template>
    <div id="app">
        <mg-form :job="jobFunction" :schema="testSchema"></mg-form>
    </div>
</template>

<script>
import TestFormWorker from "../test/test-form-worker";
import TestJsonschema from "../test/test-select";
// import TestJsonschema from "../test/test-radio";
// import TestJsonschema from "../test/test-check-box";
// import TestJsonschema from "../test/test-upload";
export default {
    name: "App",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            testSchema: {
                formSchema: {},
                cellSchema: TestJsonschema,
            },
            jobFunction: TestFormWorker,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss'>
* {
    margin: 0;
    padding: 0;
}
html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
ul,
ol,
li {
    list-style: none;
}
#app {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
}
</style>
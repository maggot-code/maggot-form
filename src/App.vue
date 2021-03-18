<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-18 18:27:45
 * @Description: file content
-->
<template>
    <div id="app">
        <mg-form
            proName="kyhxs"
            token="a160081c-2d0e-44fd-b32a-f4d1ae1d4838"
            :job="jobFunction"
            :schema="testSchema"
            @submitForm="submit"
        ></mg-form>
    </div>
</template>

<script>
// import TestFormWorker from "../test/test-form-worker";
// import TestJsonschema from "../test/test-select";
// import TestJsonschema from "../test/test-radio";
// import TestJsonschema from "../test/test-check-box";
// import TestJsonschema from "../test/test-upload";
// import TestJsonschema from "../test/am_writings";
// import TestJsonschema from "../test/test-table-seach";
// import TestJsonschema from "../test/test-time";
import TestJsonschema from "../test/test-input";
export default {
    name: "App",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            testSchema: {
                formSchema: {
                    labelWidth: "160px",
                },
                cellSchema: TestJsonschema,
            },
            jobFunction: {},
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        submit(formData) {
            const { status, data } = formData;
            console.log(status, data);
        },
    },
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
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 30px;
    box-sizing: border-box;
    overflow: hidden;
}
</style>
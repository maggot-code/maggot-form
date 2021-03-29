<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-29 13:11:38
 * @Description: file content
-->
<template>
    <div id="app">
        <mg-form
            proName="kyhxs"
            :ref="formRefName"
            :job="jobFunction"
            :schema="testSchema"
            @form-error="handlerFormError"
            @monitor-value="handleValue"
        ></mg-form>
        <el-button
            v-for="(cell, keys) in formButtonGroup"
            plain
            :key="keys"
            :type="cell.type"
            :icon="cell.icon"
            @click="cell.handle"
            >{{ cell.label }}</el-button
        >
    </div>
</template>

<script>
// import TestFormWorker from "../test/test-form-worker";
// import TestJsonschema from "../test/test-select";
// import TestJsonschema from "../test/test-select-copy";
// import TestJsonschema from "../test/test-select1";
// import TestJsonschema from "../test/test-radio";
// import TestJsonschema from "../test/test-check-box";
// import TestJsonschema from "../test/test-upload";
// import TestJsonschema from "../test/am_writings";
// import TestJsonschema from "../test/test-table-seach";
// import TestJsonschema from "../test/test-time";
// import TestJsonschema from "../test/test-input";
// import TestJsonschema from "../test/test-v1";
// import TestJsonschema from "../test/test-autocomplete.json";
// import TestJsonschema from "../test/test-cascader.json";
import TestJsonschema from "../test/test-cascader-v1.json";
// import TestJsonschema from "../test/test-add-v1.json";
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

            formRefName: "apply",
            formButtonGroup: {
                submit: {
                    type: "success",
                    icon: "el-icon-check",
                    label: "提交",
                    handle: this.submit,
                },
                temp: {
                    type: "primary",
                    icon: "el-icon-folder",
                    label: "暂存",
                    handle: this.temp,
                },
                reset: {
                    type: "info",
                    icon: "el-icon-refresh",
                    label: "重置",
                    handle: this.reset,
                },
            },
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handlerFormError(error) {
            console.log(error);
        },
        handleValue(params) {
            // console.log(params);
        },
        submit() {
            this.$refs[this.formRefName].formValidate();
        },
        temp() {
            const { data } = this.$refs[this.formRefName].formOutput();
            console.log(data);
        },
        reset() {
            this.$refs[this.formRefName].resetForm();
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
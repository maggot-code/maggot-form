<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 17:53:53
 * @Description: file content
-->
<template>
    <div id="app">
        <mg-form :schema="testSchema"></mg-form>
    </div>
</template>

<script>
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
                cellSchema: [
                    {
                        componentName: "mg-input",
                        mold: "text",
                        field: "wenzi",
                        value: "",
                        leaderTag: {},
                        workerTag: [],
                        dataSchema: {
                            lib: {},
                        },
                        uiSchema: {
                            col: 24,
                            label: "文字框",
                            placeholder: "请输入文字信息",
                        },
                        ruleSchema: [
                            {
                                required: true,
                                message: "请填写文字框",
                                trigger: "blur",
                            },
                            {
                                min: 3,
                                max: 5,
                                message: "长度在3到5个字符内",
                                trigger: "blur",
                            },
                        ],
                    },
                    {
                        componentName: "mg-input",
                        mold: "number",
                        field: "shuzi",
                        value: 0,
                        leaderTag: {},
                        workerTag: [],
                        dataSchema: {
                            lib: {},
                        },
                        uiSchema: {
                            col: 8,
                            label: "数字框",
                            minus: true,
                        },
                        ruleSchema: [],
                    },
                    {
                        componentName: "mg-input",
                        mold: "integer",
                        field: "age",
                        value: 0,
                        leaderTag: {},
                        workerTag: [],
                        dataSchema: {
                            lib: {},
                        },
                        uiSchema: {
                            col: 8,
                            label: "整数框",
                            minus: false,
                        },
                        ruleSchema: [],
                    },
                    {
                        componentName: "mg-input",
                        mold: "float",
                        field: "perCent",
                        value: 0,
                        leaderTag: {},
                        workerTag: [],
                        dataSchema: {
                            lib: {},
                        },
                        uiSchema: {
                            col: 8,
                            label: "浮点框",
                        },
                        ruleSchema: [],
                    },
                    {
                        componentName: "mg-select",
                        mold: "default",
                        field: "sex",
                        value: "0",
                        leaderTag: {},
                        workerTag: [],
                        dataSchema: {
                            lib: {},
                            enums: [
                                {
                                    eid: "100",
                                    label: "女",
                                    value: "0",
                                    disabled: false,
                                },
                                {
                                    eid: "101",
                                    label: "男",
                                    value: "1",
                                },
                            ],
                        },
                        uiSchema: {
                            col: 24,
                            label: "选择框",
                            multiple: false,
                            disabled: false,
                            placeholder: "请选择性别",
                        },
                        ruleSchema: [],
                    },
                    {
                        componentName: "mg-select",
                        mold: "default",
                        field: "province",
                        value: "",
                        leaderTag: {
                            isCity: {
                                params: {},
                                controller: "dataSchema.enums",
                            },
                        },
                        workerTag: [],
                        dataSchema: {
                            lib: {},
                            enums: [
                                {
                                    eid: "1001",
                                    label: "东北省",
                                    value: "1001",
                                },
                                {
                                    eid: "1002",
                                    label: "河北省",
                                    value: "1002",
                                },
                                {
                                    eid: "1003",
                                    label: "河南省",
                                    value: "1003",
                                },
                            ],
                        },
                        uiSchema: {
                            col: 7,
                            label: "省市选择",
                            multiple: false,
                            disabled: false,
                            placeholder: "请选择省份",
                        },
                        ruleSchema: [],
                    },
                    {
                        componentName: "mg-select",
                        mold: "default",
                        field: "city",
                        value: "",
                        leaderTag: {},
                        workerTag: ["isCity"],
                        dataSchema: {
                            lib: {},
                            enums: [],
                        },
                        uiSchema: {
                            col: 4,
                            label: "",
                            multiple: false,
                            disabled: false,
                            placeholder: "请选择市区",
                            "no-data-text": "请确定省份",
                        },
                        ruleSchema: [],
                    },
                ],
            },
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
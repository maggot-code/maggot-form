<!--
 * @Author: maggot-code
 * @Date: 2021-03-04 09:16:01
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-10-18 09:21:39
 * @Description: file content
-->
<template>
    <div id="app">
        <mg-form
            style="height: 600px" 
            proName="SWZDH"
            :ref="formRefName"
            :job="jobFunction"
            :schema="testSchema"
            :upload="uploadService"
            :remote="remoteService"
            @form-error="handlerFormError"
            @monitor-value="handleValue">
        </mg-form>
        <el-button v-for="(cell, keys) in formButtonGroup" plain :key="keys" :type="cell.type" :icon="cell.icon"
            @click="cell.handle">{{ cell.label }}</el-button>
    </div>
</template>

<script>
import axios from "axios";
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
// import TestJsonschema from "../test/test-cascader-v1.json";
// import TestJsonschema from "../test/test-add-v1.json";
// import TestJsonschema from "../test/test-ceshi-v1.json";
// import TestJsonschema from "../test/test-ceshi-v2.json";

// import TestJsonschema from "../test/test.v2.json";
// import TestJsonschema from "../test/v2.upload.json";
// import TestJsonschema from "../test/v2.search.json";
// import TestJsonschema from "../test/v2.cascader.json";
// import TestJsonschema from "../test/v3.cascader.json";
// import TestJsonschema from "../test/v2.select.json";
// import TestJsonschema from "../test/v1.switch.json";
import TestJsonschema from "../test/v1.slider.json";

const requestAxios = axios.create({
    baseURL: window.location.origin,
    headers: {
        token:"b5ed5211-3a44-4374-9062-192b326811cc"
    }
});
function requestCall(request) {
    const {file} = request;
    const service = "/SWZDH/Common/UpFile";
    const body = new FormData();
    body.append("files", file);

    const tocancel = new AbortController();

    async function tocall() {
        const {data} = await requestAxios({
            url: service,
            method: "post",
            data: body,
            signal: tocancel.signal,
            onUploadProgress: (progress) => {
                const { loaded, total } = progress;
                const percent = (loaded / total) * 100;
                request.onProgress({ percent });
            }
        });

        return data;
    }

    return {
        uid: file.uid,
        tocancel,
        tocall,
    }
}
async function requestDown(file) {
    const fileAddress = "http://192.1.1.5:8080/SWZDH/file";
    const {url} = file;
    const address = fileAddress + url;

    const { data } = await axios({ url: address, method: "GET", responseType: 'blob' });
    return data;
}
async function requestSearch(config) {
    const { address,lib, query,labelKey } = config;
    const url = "/kyhxs" + address;
    const params = Object.assign({}, lib, { [labelKey]: query });
    const { data } = await requestAxios({ url, method: "POST", params});
    return data;
}
async function requestEnums(config) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    "id": "001",
                    "text": "北京市呼吸疾病研究所",
                    "state": "open",
                    "checked": false,
                    "attributes": {
                        "CodeId": "UM"
                    },
                    "children": [
                        {
                            "id": "001001",
                            "text": "医学研究中心",
                            "state": "open",
                            "checked": false,
                            "attributes": {
                                "CodeId": "UM"
                            },
                            "children": null,
                            "open": false,
                            "iconCls": null,
                            "pid": null
                        },
                        {
                            "id": "001002",
                            "text": "呼吸与危重症医学科",
                            "state": "open",
                            "checked": false,
                            "attributes": {
                                "CodeId": "UM"
                            },
                            "children": null,
                            "open": false,
                            "iconCls": null,
                            "pid": null
                        },
                        {
                            "id": "001003",
                            "text": "感染科",
                            "state": "open",
                            "checked": false,
                            "attributes": {
                                "CodeId": "UM"
                            },
                            "children": null,
                            "open": false,
                            "iconCls": null,
                            "pid": null
                        },
                        {
                            "id": "001007",
                            "text": "测试科",
                            "state": "open",
                            "checked": false,
                            "attributes": {
                                "CodeId": "UM"
                            },
                            "children": null,
                            "open": false,
                            "iconCls": null,
                            "pid": null
                        },
                        {
                            "id": "001008",
                            "text": "科研处",
                            "state": "open",
                            "checked": false,
                            "attributes": {
                                "CodeId": "UM"
                            },
                            "children": null,
                            "open": false,
                            "iconCls": null,
                            "pid": null
                        }
                    ],
                    "open": false,
                    "iconCls": null,
                    "pid": null
                }
            ])
        }, 1200);
    });
}

export default {
    name: "App",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            ruleForm: {
                region: "",
            },
            uploadService: {
                call: requestCall,
                down: requestDown,
            },
            remoteService: {
                search: requestSearch,
                enums: requestEnums
            },
            rules: {
                region: [
                    {
                        required: true,
                        message: "请选择活动区域",
                        trigger: "change",
                    },
                ],
            },

            testSchema: {
                formSchema: {
                    labelWidth: "160px",
                },
                cellSchema: [],
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
            console.log(params);
            // console.log(params);
        },
        submit() {
            const cellSchema = this.$refs[this.formRefName].getFormCell(
                "dateFixed"
            );
            console.log(cellSchema);
            const { validate, data } = this.$refs[
                this.formRefName
            ].formOutput();
            validate(() => {
                console.log(data);
            });
        },
        temp() {
            const { data } = this.$refs[this.formRefName].formOutput();
            console.log(data);
        },
        reset() {
            this.$refs[this.formRefName].resetForm();
        },
        async serviceCall(request) {
            const fileAddress = "http://192.1.1.5:8080/SWZDH/file";
            const service = "/SWZDH/Common/UpFile";
            const body = new FormData();
            console.log(request);
            console.log(request.file);
            body.append("files", request.file);

            const {data} = await axios({
                url: service,
                method: "POST",
                data: body,
                onUploadProgress: (progress) => {
                    const { loaded, total } = progress;
                    const percent = (loaded / total) * 100;
                    request.onProgress(Object.assign(request.file), { percent });
                }
            });

            // const [{ url }] = data;
            // const address = fileAddress + url;

            // const { data: blobData } = await axios({ url: address, method: "GET", responseType: 'blob' });
            // const URL = window.URL.createObjectURL(blobData);
            // console.log(URL);
            // const download = document.createElement("a");
            // download.href = URL;
            // download.download = request.file.name;
            // download.click();
            // window.URL.revokeObjectURL(URL);

            return data;
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$set(this.testSchema, "cellSchema", TestJsonschema);
    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
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

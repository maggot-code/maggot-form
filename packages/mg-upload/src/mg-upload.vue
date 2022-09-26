<!--
 * @Author: maggot-code
 * @Date: 2021-03-08 10:04:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-26 18:10:54
 * @Description: mg-upload.vue component
-->
<template>
    <el-upload
        class="mg-upload"
        :ref="refs"
        :file-list="fileValue"
        v-bind="options"
        :on-preview="onPreview"
        :on-remove="onRemove"
        :on-success="onSuccess"
        :on-error="onError"
        :on-progress="onProgress"
        :on-change="onChange"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :http-request="httpRequest"
    >
        <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
        <div v-if="fileTips.show" slot="tip" class="mg-upload-tip">{{fileTips.value}}</div>
    </el-upload>
</template>

<script>
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { flake } from "maggot-utils";
import { concat, compact, isNil,isString} from "lodash";

const DefaultFileName = "files";
const DefBlacklist = [
    "exe",
    "bat",
    "php",
    "xml",
    "html",
    "js",
    "ts",
    "css",
    "scss",
    "less",
    "json",
    "jsx",
    "vue",
];
const Download = document.createElement("a");
function useDownload(file) {
    const {name, size,type} = file;
    const blob = new Blob([size], { type:type });
    const href = window.URL.createObjectURL(blob);
    function unhref() {
        window.URL.revokeObjectURL(href);
    }

    Download.href = href;
    Download.download = name;

    return {
        href,
        toload: () => {
            Download.click();
            unhref();
        },
        unhref
    }
}

// mb 换算 byte
function mb2byte(value) {
    return value * 1024 * 1024;
}
// byte 换算 mb
function byte2mb(value) {
    return (value / 1024 / 1024).toFixed(2);
}

// 获取文件类型
function getFileType(file) {
    return file.split(".").pop();
}

// 设置是否多选
function setupMultiple(ui) {
    return true;
}

// 设置是否禁用
function setupDisabled(ui) {
    return false;
}

// 设置单次上传数量
function setupLimit(ui) {
    return [false,0];
}

// 设置文件列表
function setupFileList(value) {
    return Array.isArray(value) ? value : [];
}

// 检查文件类型
function checkFileType(file, fileType) {
    const { name } = file;
    const {usable,unusable} = fileType;
    const type = getFileType(name);
    const toUsable = usable.includes(type);
    const toUnusable = unusable.includes(type);
    const state = toUsable && !toUnusable;
    
    return [state,`${name} 文件类型不符合要求`];
}

// 检查文件大小
function checkFileSize(file, fileSize) {
    const { name,size } = file;
    const state = size < fileSize;

    return [state,`${name} 文件大小不符合要求`];
}

// 检查文件类型和文件大小
function checkFile(file, fileType, fileSize,emitError) {
    const [typeState, typeError] = checkFileType(file, fileType);
    const [sizeState, sizeError] = checkFileSize(file, fileSize);

    if (!typeState) emitError(file, typeError);
    if (!sizeState) emitError(file, sizeError);

    return !(typeState && sizeState);
}

export default {
    name: "mg-upload",
    trigger: "change",
    mixins: [MgFormComponent],
    components: {},
    props: {},
    data() {
        //这里存放数据
        const refs = flake.gen();
        const watchValue = {
            variable: "value",
            func(newVal) {
                this.$set(this, "fileValue", setupFileList(newVal))
            }
        };
        const watchFileValue = {
            variable: "fileValue",
            func(newVal) {
                this.monitorValue({
                    mold: this.mold,
                    field: this.field,
                    value: newVal,
                    handle:"upload"
                })
            }
        };

        return {
            refs,
            watchHandle: Object.freeze([watchValue,watchFileValue]),
            fileValue: [],
        };
    },
    //监听属性 类似于data概念
    computed: {
        options: (vm) => {
            const { ui } = vm;

            const [hasLimit,limit] = setupLimit(ui);

            const vbind = {
                action: "",
                listType: "text",
                autoUpload: true,
                withCredentials: true,
                showFileList: true,
                drag:false,
                name: DefaultFileName,
                multiple: setupMultiple(ui),
                disabled: setupDisabled(ui),
            }

            if(hasLimit) vbind.limit = limit;

            return vbind;
        },
        fileTips: (vm) => {
            const { tips } = vm.ui;
            const isTips = !isNil(tips) && isString(tips);

            return {
                value: tips,
                show: isTips,
            }
        },
        fileSize: (vm) => {
            const { size } = vm.ui;
            return isNil(size) ? -1 : mb2byte(size);
        },
        fileType: (vm) => {
            const { types, blacklist } = vm.ui;
            return {
                usable: Array.isArray(types) ? types : [],
                unusable: Array.isArray(blacklist) ? concat(blacklist, DefBlacklist) : DefBlacklist
            };
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        // 点击文件列表中已上传的文件时的钩子	function(file)
        onPreview(file) {
            console.log("onPreview", file);
            
            const { href, toload } = useDownload(file);
            console.log(href);
            toload();
        },

        // 文件列表移除文件时的钩子	function(file, fileList)
        onRemove(file, fileList) {
            console.log("onRemove", file, fileList);
        },

        // 文件上传成功时的钩子	function(response, file, fileList)
        onSuccess(response, file, fileList) {
            console.log("onSuccess", response, file, fileList);
        },

        // 文件上传失败时的钩子	function(err, file, fileList)
        onError(err, file, fileList) {
            console.log("onError", err, file, fileList);
        },

        // 文件上传时的钩子	function(event, file, fileList)
        onProgress(event, file, fileList) {
            console.log("onProgress", event, file, fileList);
        },

        // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用	function(file, fileList)
        onChange(file, fileList) {
            console.log("onChange", file, fileList);
        },

        // 文件超出个数限制时的钩子	function(files, fileList)
        onExceed(files, fileList) {
            console.log("onExceed", files, fileList);
        },

        // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。	function(file)
        beforeUpload(file) {
            // 检查文件类型和文件大小
            const checkError = checkFile(file, this.fileType, this.fileSize, this.uploadError);

            // 目前只检查了文件的类型和大小，还需要检查其他的需要增加校验函数
            // 然后返回一个布尔值
            // true 代表存在错误
            // false 代表不存在错误
            // 通过 compact 过滤假值然后检查长度来判断是否拦截上传
            return compact([checkError]).length <= 0;
        },

        // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。	function(file, fileList)
        beforeRemove(file, fileList) {
            console.log("before remove", file);
            // TODO..
            return true;
        },
        
        // 覆盖默认的上传行为，可以自定义上传的实现	function
        async httpRequest(request) {
            const response = await this.form.serviceCall(request);
            return response;
        },

        // 上传控件错误抛出
        uploadError(file,txt) {
            this.formThrowError("mg-upload", {file,txt});
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.initValue("fileValue", setupFileList(this.value)).then((val) => {
            this.$emit("update:value", val);
            this.mountWatch(this.watchHandle);
        });
    },
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
<style lang='scss' scoped>
@import "./mg-upload.scss";
</style>

<!--
 * @Author: maggot-code
 * @Date: 2021-03-08 10:04:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-28 14:43:29
 * @Description: mg-upload.vue component
-->
<template>
    <el-upload
        class="mg-upload"
        :key="uploadKey"
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
        <mg-upload-list
            slot="file"
            slot-scope="{file}"
            :key="file.uid"
            :file="file"
            @on-delete="onDelete"
            @on-preview="onPreview"
            @on-cancel="onCancel">
        </mg-upload-list>
        <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
        <div v-if="fileTips.show" slot="tip" class="mg-upload-tip">{{fileTips.value}}</div>
    </el-upload>
</template>

<script>
import MgUploadList from "./mg-upload-list.vue";
import MgFormComponent from "../../mg-form/mixins/mg-form-component";
import { mb2byte } from "../../mg-form/utils";
import { flake } from "maggot-utils";
import {concat,compact, remove, isNil, isString, isBoolean, isNumber } from "lodash";

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
const Cache = new Map();

// 获取文件类型
function getFileType(file) {
    return file.split(".").pop();
}

// 设置是否多选
function setupMultiple({ multiple }) {
    return isBoolean(multiple) ? multiple : false;
}

// 设置是否禁用
function setupDisabled({ disabled }) {
    return isBoolean(disabled) ? disabled : false;
}

// 设置单次上传数量
function setupLimit({ limit }) {
    const value = isNumber(limit) ? limit : 0;
    const state = value > 0;
    
    return [state,value];
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
    const { name, size } = file;

    const state = fileSize <= 0 ? true : size < fileSize;

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
    components: {MgUploadList},
    props: {},
    inject: ["useDownload"],
    data() {
        //这里存放数据
        const uploadKey = flake.gen();
        const refs = flake.gen();
        const watchValue = {
            variable: "value",
            func(newVal) {
                this.$set(this, "followFileValue", setupFileList(newVal))
            }
        };
        const watchFloowFileValue = {
            variable: "followFileValue",
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
            uploadKey,
            refs,
            watchHandle: Object.freeze([watchValue, watchFloowFileValue]),
            fileValue: setupFileList(this.value),
            followFileValue:[]
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
                data:{},
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
        usableDownload: (vm) => {
            const { download } = vm.ui
            return isBoolean(download) ? download : false;
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
        onDelete(file) {
            const list = [...this.followFileValue];
            remove(list, ({ id }) => id === file.id);
            
            this.followFileValue = list;
            this.fileValue = list;
            this.uploadKey = flake.gen();
        },
        // 点击文件列表中已上传的文件时的钩子	function(file)
        onPreview(file) {
            const download = this.useDownload(file.raw);

            this.usableDownload && download.toload();

            this.$emit("uploadCellEvent", download);
        },

        // 文件列表移除文件时的钩子	function(file, fileList)
        onRemove(file, fileList) {
            console.log("onRemove", file, fileList);
        },

        // 文件上传成功时的钩子	function(response, file, fileList)
        onSuccess(response) {
            this.$set(this, "followFileValue", concat(setupFileList(this.value), response));
        },

        // 文件上传失败时的钩子	function(err, file, fileList)
        onError(err, file) {
            this.uploadError(file, err);
        },

        // 文件上传时的钩子	function(event, file, fileList)
        onProgress(event, file) {
            console.log("onProgress", event, file);
        },

        // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用	function(file, fileList)
        onChange(file) {
            const { status } = file;
            console.log(status);
        },

        // 文件超出个数限制时的钩子	function(files, fileList)
        onExceed(files) {
            const { limit } = this.ui;
            
            this.uploadError(files,`抱歉，一次最多只能上传 ${limit} 个文件`);
        },

        onCancel(file) {
            const { uid } = file;

            if (!Cache.has(uid)) return;

            const { tocancel } = Cache.get(uid);
            try {
                tocancel.abort();
            } catch (error) {
                console.log(error);
            }
            Cache.delete(uid);
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
        httpRequest(request) {
            const { uid, tocall, tocancel } = this.form.upload.call(request);
            
            Cache.set(uid, { tocancel });

            return tocall();
        },

        // 上传控件错误抛出
        uploadError(file,txt) {
            this.formThrowError("mg-upload", {file,txt});
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.initValue("followFileValue", setupFileList(this.value)).then((val) => {
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
    beforeDestroy() {
        Cache.forEach(({ tocancel }, key) => {
            try {
                tocancel.abort();
            } catch (error) {
                console.log(error);
            }
            Cache.delete(key);
        });
        
        Cache.clear();
    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
@import "./mg-upload.scss";
</style>

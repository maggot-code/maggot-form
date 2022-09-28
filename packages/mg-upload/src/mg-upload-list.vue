<!--
 * @FilePath: \maggot-form\packages\mg-upload\src\mg-upload-list.vue
 * @Author: maggot-code
 * @Date: 2022-09-27 17:00:58
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-28 14:43:04
 * @Description: 
-->
<template>
    <div class='mg-upload-list'>
        <div>
            <div>
                <el-link type="primary" @click="uploadPreview">{{file.name}}</el-link>
                <template v-if="useProgress">
                    <p>{{speed}} %</p>
                    <p>{{current}} MB</p>
                    <p>{{total}} MB</p>
                </template>
            </div>
            
            <div>
                <el-button v-show="useProgress" type="primary" size="mini" @click="uploadCancel">取消</el-button>
                <el-button v-show="!useProgress" type="primary" size="mini" @click="uploadDelete">删除</el-button>
            </div>
        </div>

        <div v-if="useProgress" style="position: relative;">
            <el-progress :percentage="speed" :show-text="false"></el-progress>
        </div>
    </div>
</template>

<script>
import { byte2mb } from "../../mg-form/utils";
import { floor } from "lodash";

function toFixed2(value) {
    return floor(value, 2);
}

export default {
    name: 'mg-upload-list',
    mixins: [],
    components: {},
    props: {
        file: {
            type: Object,
            required: true,
        }
    },
    inject: ["form"],
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        fileValue() {
            const { response } = this.file;
            const [value] = response ?? [];
            return Object.assign({}, this.file, value ?? {});
        },
        current() {
            const { size, percentage } = this.fileValue;
            return toFixed2(byte2mb(size * percentage / 100));
        },
        total() {
            const { size } = this.fileValue;
            return toFixed2(byte2mb(size));
        },
        speed() {
            const { percentage } = this.fileValue;
            return toFixed2(percentage);
        },
        status() {
            const { status } = this.fileValue;
            return status;
        },
        useProgress() {
            return this.status === "uploading";
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        uploadDelete() {
            this.$emit("on-delete", this.fileValue);
        },
        async uploadPreview() {
            const blob = await this.form.upload.down(this.fileValue);
            const raw = Object.assign(blob, {
                name: this.fileValue.name,
            });
            
            this.$emit("on-preview", Object.assign({}, this.fileValue,{raw}));
        },
        uploadCancel() {
            this.$emit('on-cancel', this.fileValue);
        }
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
<style lang='scss' scoped></style>

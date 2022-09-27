<!--
 * @FilePath: \maggot-form\packages\mg-upload\src\mg-upload-list.vue
 * @Author: maggot-code
 * @Date: 2022-09-27 17:00:58
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-27 17:29:36
 * @Description: 
-->
<template>
    <div class='mg-upload-list'>
        <div>
            <div>
                <p>{{file.name}}</p>
                <p>{{speed}} %</p>
                <p>{{current}} MB</p>
                <p>{{total}} MB</p>
            </div>
            
            <div>
                <el-button type="primary" size="mini" @click="uploadCancel">取消</el-button>
            </div>
        </div>

        <div style="position: relative;">
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
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        current() {
            const { size, percentage } = this.file;
            return toFixed2(byte2mb(size * percentage / 100));
        },
        total() {
            const { size } = this.file;
            return toFixed2(byte2mb(size));
        },
        speed() {
            const { percentage } = this.file;
            return toFixed2(percentage);
        }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        uploadCancel() {
            this.$emit('upload-cancel', this.file);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        console.log(this.file);
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
<style lang='scss' scoped></style>

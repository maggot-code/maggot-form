/*
 * @Author: maggot-code
 * @Date: 2021-03-04 13:31:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 14:39:42
 * @Description: mg input password mold
 */
import { mergeSchema } from "../../mg-form/utils";

const defaultBind = {
    "type": "text",
    "placeholder": "请输入密码",
    "show-password": true,
    "prefix-icon": "el-icon-lock"
}

export default {
    name: "mg-input-password",
    mixins: [],
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        moldPassword(uiSchema) {
            const vbind = mergeSchema(defaultBind, uiSchema);

            return vbind;
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
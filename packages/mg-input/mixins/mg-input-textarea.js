/*
 * @Author: maggot-code
 * @Date: 2021-03-04 13:31:51
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-04 14:36:17
 * @Description: mg input textarea mold
 */
import { mergeSchema } from "../../mg-form/utils";

const defaultBind = {
    "type": "textarea",
    "placeholder": "请输入文本内容",
    "show-word-limit": true,
    "maxlength": 200,
    "autosize": {
        "minRows": 2,
        "maxRows": 4
    }
}

export default {
    name: "mg-input-textarea",
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
        moldTextarea(uiSchema) {
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
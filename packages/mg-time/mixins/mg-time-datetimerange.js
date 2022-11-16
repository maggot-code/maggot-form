/*
 * @Author: maggot-code
 * @Date: 2021-03-17 13:18:35
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-16 15:29:12
 * @Description: file content
 */
import { mergeSchema } from '../../mg-form/utils';

const defaultBind = {
    "type": "datetimerange",
    "format": "yyyy-MM-dd HH:mm:ss",
    "prefix-icon": "el-icon-date",
    "start-placeholder": "开始日期",
    "end-placeholder": "结束日期",
};

export default {
    name: "mg-time-datetimerange",
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
        moldDatetimerange(uiSchema) {
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

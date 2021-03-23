/*
 * @Author: maggot-code
 * @Date: 2021-03-04 14:06:27
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-23 13:07:26
 * @Description: mg form utils
 */
/**
 * @description: 合并对象结构
 * @param {Object} schema 对象结构
 * @return {Object} 合并后的对象结构
 */
export const mergeSchema = (...schema) => {
    return Object.assign({}, ...schema);
}

/**
 * @description: 判定和填充input属性（isMinus,min）
 * @param {Boolean} minus 是否可以为负
 * @param {Number} min 最小值是多少
 * @return {Number} 与minus和min判定后的决定值
 */
export const inputMinus = (minus, min) => {
    const minusType = typeof minus;
    const minType = typeof min;

    // 保证 minus 的类型不是 undefined 必须是 boolean 并且 minus 为false进入判断;
    const flg = minusType !== "undefined" && minusType === "boolean" && !minus;

    if (!flg) { return undefined }

    if (minType === "undefined") {
        return 0;
    } else {
        return min < 0 ? 0 : min;
    }
}

/**
 * @description: 设置枚举项属性
 * @param {Object} item 枚举项
 * @return {Object} 调整过滤后的枚举项
 */
export const setEnums = (item) => {
    const disabledType = typeof item.disabled;
    const disabledFlg =
        disabledType !== "undefined" && disabledType === "boolean";
    const disabled = disabledFlg ? item.disabled : false;

    return { ...item, disabled: disabled };
}

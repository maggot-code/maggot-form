/*
 * @Author: maggot-code
 * @Date: 2021-03-23 13:07:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-29 14:32:33
 * @Description: file content
 */
import axios from 'axios';
import { MGaxios } from 'maggot-utils';
import { flake, getToken, setToken } from 'maggot-utils';
setToken('92e7d3ff-aaa2-4169-ab04-c61f922d47e4');
const BASEURL = process.env.NODE_ENV === 'production' ? window.location.origin : '/';
const { Send } = MGaxios;

const baseAxios = axios.create({ baseURL: BASEURL });

// 请求拦截器
baseAxios.interceptors.request.use(config => {
    config.requestId = flake.gen();

    const token = getToken();
    if (token) {
        config.headers.token = token;
    }

    return config;
}, error => Promise.reject(error));

export const send = Send(baseAxios);
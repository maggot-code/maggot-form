/*
 * @Author: maggot-code
 * @Date: 2021-03-23 13:07:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-23 13:32:18
 * @Description: file content
 */
import axios from 'axios';
import { MGaxios } from 'maggot-utils';
import { flake, getToken, setToken } from 'maggot-utils';
setToken('f21321b2-8db5-4be3-b9af-73500e1b932e');
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
/*
 * @Author: maggot-code
 * @Date: 2021-03-23 13:07:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-26 16:41:35
 * @Description: file content
 */
import axios from 'axios';
import { MGaxios } from 'maggot-utils';
import { flake, getToken, setToken } from 'maggot-utils';
setToken('c69aa0a8-b082-465b-87e9-d2ca7ae3307d');
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
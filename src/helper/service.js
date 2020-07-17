import schema2code from "./schema2code";
import axios from "axios";
import { getParameterByName } from "./util";

/**
 * schema 转代码并格式化
 * @param {array} schema
 * @returns {Promise<AxiosResponse<any>>}
 */
export const formatCode = (schema, pageType) => {
  const code = schema2code(schema, pageType);
  return axios({
    method: "POST",
    url: "/api/code/format",
    data: { code, type: "VUE" },
  }).then((res) => res.data);
};

/**
 * 保存文件
 * @param {string} name 文件名称
 * @param {array} schema
 * @returns {Promise<AxiosResponse<any>>}
 */
export const saveSchema = async (name, schema) => {
  const token = getParameterByName("token");
  if (!token) {
    return Promise.reject(new Error("未登录"));
  }
  return axios({
    method: "PUT",
    url: `/api/code/${name}`,
    data: { schema, token },
  }).then((res) => res.data);
};

/**
 * 获取文件 Schema
 * @param {string} name 文件名称
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getSchema = async (name) => {
  const token = getParameterByName("token");
  return axios({
    method: "GET",
    url: `/api/code/${name}`,
    params: { token },
  }).then((res) => res.data);
};

/**
 * 创建空文件
 * @param {string} name 文件名称
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createEmptyCode = (name) => {
  const token = getParameterByName("token");
  return axios({
    method: "POST",
    url: "/api/code/create",
    data: { type: "VUE", name, token },
  }).then((res) => res.data);
};

/**
 * 获取团队的目录
 * @param {string} teamId 团队ID
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getFolders = async (teamId) => {
  return axios({
    method: "GET",
    url: `/api/team/${teamId}/folders`,
  }).then((res) => res.data);
};

/**
 * 保存团队的目录
 * @param {string} teamId 团队ID
 * @param {array} folders
 * @returns {Promise<AxiosResponse<any>>}
 */
export const saveFolders = async (teamId, folders) => {
  return axios({
    method: "PUT",
    url: `/api/team/${teamId}/folders`,
    data: { folders },
  }).then((res) => res.data);
};

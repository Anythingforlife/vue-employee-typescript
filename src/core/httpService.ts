import Vue from 'vue';
import axios from 'axios';
export const httpService = {
  get,
  postMethod,
  putMethod,
  deleteMethod,
};

/**
 * Get method
 *
 * @param {string} url
 */
function get(url: string) {
  return axios.get(Vue.config.apiURL + url).then(handleResponse).catch(handleError);
}

/**
 * Post method
 * @param {string} url
 * @param {any} data
 */
async function postMethod(url: string, data: any) {
  return axios.post(Vue.config.apiURL + url, data).then(handleResponse).catch(handleError);
}

/**
 * Put method
 *
 * @param {string} url
 * @param {any} data
 */
async function putMethod(url: string, data: any) {
  try {
    const response = await axios.put(Vue.config.apiURL + url, data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

/**
 * Delete method
 *
 * @param {string} url
 */
async function deleteMethod(url: string) {
  try {
    const response = await axios.delete(Vue.config.apiURL + url);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

/**
 * Handle response data
 *
 * @param {any} response
 */
function handleResponse(response: { data: string }) {
  return response.data;
}

/**
 * Handle error data
 * @param {any} error
 */
function handleError(error: { response: { data: any; }; message: any; }) {
  return Promise.reject(error.response ? error.response.data : { message: error.message });
}

import { config } from "../config/apiConfig.js";
import axios from "../utils/axios.js";
const listCutomerURL = `${config.baseURL}v1/runner/list?page=1&size=10`;
export const getListCustomer = async () => {
  try {
    const response = await axios.get(listCutomerURL, {
      headers: config.headers,
    });
    const data = {
      status: response.status,
      time: response.responseTime,
    };
    return data;
  } catch (error) {
    const logs = {
      urlAPI: listCutomerURL,
      code: error.code,
      status: error.response.status,
      text: error.response.data,
    };

    return {
      status: error?.response?.status,
      time: error?.responseTime,
    };
  }
};

console.log(await getListCustomer());

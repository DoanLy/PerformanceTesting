import { bookStoreConfig } from "../../config/apiConfig.js";
import axios from "../../utils/axios.js";

export const login = async (request) => {
  const userName = request;
  try {
    // Iterate over each username
    const dataReq = {
      userName: userName,
      password: "Nguoiemyeu@2704",
    };

    console.log("dataReq ", dataReq);

    const createAccUserURL = `${bookStoreConfig.baseURL}Account/v1/Login`;
    const response = await axios.post(createAccUserURL, dataReq);

    const data = {
      status: response.status,
      time: response.responseTime,
      userID: response.data.userId,
      token: response.data.token,
      userName: dataReq.userName,
      password: dataReq.password,
    };

    return data;
  } catch (error) {
    return {
      error: true,
      status: error?.response?.status, //ok
      message: error?.response.statusText,
      urlApi: error?.response.config.url, //ok
      dataRequest: error?.response.config.data, //ok
    };
  }
};

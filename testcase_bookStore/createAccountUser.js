import { bookStoreConfig } from "../config/apiConfig.js";
import axios from "../utils/axios.js";
import fs from "fs";

export const createAccountUser = async () => {
  try {
    const randomUsername = Math.floor(Math.random() * 300) + 90;
    const dataReq = {
      userName: `lydtt292`,
      password: "Nguoiemyeu@2704",
    };

    console.log(dataReq);

    const createAccUserURL = `${bookStoreConfig.baseURL}Account/v1/User`;
    const response = await axios.post(createAccUserURL, dataReq);

    const data = {
      status: response.status,
      time: response.responseTime,
      userID: response.data.userID,
      userName: dataReq.userName,
      password: dataReq.password,
    };
    fs.writeFileSync(
      "D:/CODE/PerformanceTesting/data/user.txt",
      dataReq.userName
    );

    return data;
  } catch (error) {
    return {
      error: true,
      status: error?.response?.status,
      message: error?.response.data.message,
      urlApi: error?.response.config.url,
      dataRequest: error?.response.config.data,
    };
  }
};

import { bookStoreConfig } from "../config/apiConfig.js";
import axios from "../utils/axios.js";
import { createAccountUser } from "./createAccountUser.js";
export const generateToken = async () => {
  try {
    const dataAccUser = await createAccountUser();

    const dataReq = {
      userName: dataAccUser.userName,
      password: dataAccUser.password,
    };
    console.log(dataReq, "generateToken");
    const GenerateTokenURL = `${bookStoreConfig.baseURL}Account/v1/GenerateToken`;
    const response = await axios.post(GenerateTokenURL, dataReq);

    const data = {
      userID: dataAccUser.userID,
      token: response.data.token,
    };
    return data;
  } catch (error) {
    return {
      status: error?.response?.status,
      time: error?.responseTime,
    };
  }
};

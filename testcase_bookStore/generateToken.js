import { bookStoreConfig } from "../config/apiConfig.js";
import axios from "../utils/axios.js";
import { getLoginData } from "./login/login.get.js";
export const generateToken = async () => {
  try {
    // const dataAccUser = await createAccountUser();
    const listUser = getLoginData();

    for (let index = 0; index < listUser.length; index++) {
      const dataReq = {
        userName: listUser[index],
        password: "Nguoiemyeu@2704",
      };
      console.log(dataReq, "generateToken");
      const GenerateTokenURL = `${bookStoreConfig.baseURL}Account/v1/GenerateToken`;
      const response = await axios.post(GenerateTokenURL, dataReq);

      const data = {
        userID: dataReq.userName,
        token: response.data.token,
      };
      console.log("Response generate token", data);
    }
  } catch (error) {
    return {
      status: error?.response?.status,
      time: error?.responseTime,
    };
  }
};

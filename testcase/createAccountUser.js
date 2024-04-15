import { bookStoreConfig } from "../config/apiConfig.js";
import axios from "../utils/axios.js";
import fs from "fs";

export const createAccountUser = async () => {
  try {
    const randomUsername = Math.floor(Math.random() * 1000000) + 1000;
    const dataReq = {
      userName: `lydtt${randomUsername}`,
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
      status: error?.response?.status,
      time: error?.responseTime,
    };
  }
};

const callFuncAPI = async () => {
  const resultVerifyListOrder = await createAccountUser();
  console.log(resultVerifyListOrder);
};

callFuncAPI();

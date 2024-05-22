import { bookStoreConfig } from "../../config/apiConfig.js";
import axios from "../../utils/axios.js";

export const deleteBookCollection = async (request) => {
  const listUser = request;
  try {
    const startTime = new Date();

    const deleteBookCollectionURL = `${bookStoreConfig.baseURL}BookStore/v1/Books`;

    const configHeader = {
      headers: {
        Authorization: `Bearer ${listUser.token}`,
      },
    };

    const response = await axios.delete(
      `${deleteBookCollectionURL}?UserId=${listUser.userID}`,
      configHeader
    );
    console.log("response: ", response.status);

    return response.data;
  } catch (error) {
    console.log("er test: ", error);
    return {
      // error: true,
      // status: error?.response?.status, //ok
      // message: error.response.data.message,
      // urlApi: error?.response.config.url, //ok
      // dataRequest: error?.response.config.data, //ok
      //   //   time: error?.responseTime,
    };
  }
};

// async function myAsyncFunction() {
//   const result = await peakLoadTestingReadFile(3);
//   console.log(result);
// }

// myAsyncFunction();

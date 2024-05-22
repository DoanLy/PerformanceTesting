import { bookStoreConfig } from "../../config/apiConfig.js";
import axios from "../../utils/axios.js";
import { readFileListUser } from "./readFileListUser.js";

export const addBookCollection = async (request) => {
  const listUser = request;
  try {
    const startTime = new Date();
    const listIsbn = "9781449331818";

    const addBookCollectionURL = `${bookStoreConfig.baseURL}BookStore/v1/Books`;

    const configHeader = {
      Authorization: `Bearer ${listUser.token}`,
    };
    const dataReq = {
      userId: listUser.userID,
      collectionOfIsbns: [
        {
          isbn: listIsbn,
        },
      ],
    };
    console.log("dataReq: ", dataReq);
    const response = await axios.post(addBookCollectionURL, dataReq, {
      headers: configHeader,
    });
    // console.log("response ly: ", response);

    const endTime = new Date();
    const data = {
      status: response.status,
      time: endTime - startTime,
      userName: listUser.userName,
      userID: dataReq.userId,
      token: configHeader.Authorization,
      isbn: response.data.books[0].isbn,
    };

    return data;
  } catch (error) {
    // console.log("er: ", error);
    return {
      error: true,
      status: error?.response?.status, //ok
      message: error.response.data.message,
      urlApi: error?.response.config.url, //ok
      dataRequest: error?.response.config.data, //ok

      //   //   time: error?.responseTime,
    };
  }
};

// async function myAsyncFunction() {
//   const result = await peakLoadTestingReadFile(3);
//   console.log(result);
// }

// myAsyncFunction();

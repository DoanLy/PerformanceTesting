import { bookStoreConfig } from "../config/apiConfig.js";
import axios from "../utils/axios.js";
import { getListBookStore } from "./getListBookStore.js";
import { generateToken } from "./GenerateToken.js";
export const addBookCollection = async () => {
  try {
    const startTime = new Date();
    const listIsbn = await getListBookStore();
    const listUser = await generateToken();
    const datauserID = listUser.userID;
    const configHeader = {
      Authorization: `Bearer ${listUser.token}`,
    };
    const addBookCollectionURL = `${bookStoreConfig.baseURL}BookStore/v1/Books`;
    let arr = [];
    for (let index = 0; index < listIsbn.length; index++) {
      const dataReq = {
        userId: datauserID,
        collectionOfIsbns: [
          {
            isbn: listIsbn[index],
          },
        ],
      };
      await axios.post(addBookCollectionURL, dataReq, {
        headers: configHeader,
      });
    }
    const endTime = new Date();

    return {
      status: 201,
      time: endTime - startTime,
    };
  } catch (error) {
    return {
      status: error?.response?.status,
      time: error?.responseTime,
    };
  }
};

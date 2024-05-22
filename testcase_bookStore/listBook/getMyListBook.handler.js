import { bookStoreConfig } from "../../config/apiConfig.js";
import axios from "../../utils/axios.js";

export const getMyListBook = async (request) => {
  try {
    const listUser = request;

    const userId = listUser.userID;

    const configHeader = {
      headers: {
        Authorization: `Bearer ${listUser.token}`,
      },
    };

    const listBookStoreURL = `${bookStoreConfig.baseURL}Account/v1/User/${userId}`;
    const response = await axios.get(listBookStoreURL, configHeader);

    const data = {
      status: response.status,
      time: response.responseTime,
      userName: response.data.username,
      myListBook: response.data.books.map((book) => book.isbn),
    };

    return data;
  } catch (error) {
    // console.log("er: ", error);
    return {
      error: true,
      status: error?.response?.status,
      message: error?.response?.data?.message || error?.response?.statusText,
      urlApi: error?.response?.config?.url,
      dataRequest: error?.response?.config?.data,
    };
  }
};

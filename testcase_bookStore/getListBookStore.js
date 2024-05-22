import { bookStoreConfig } from "../config/apiConfig.js";
import axios from "../utils/axios.js";
export const getListBookStore = async () => {
  try {
    const listBookStoreURL = `${bookStoreConfig.baseURL}BookStore/v1/Books`;
    const response = await axios.get(listBookStoreURL);
    const dataRes = response.data.books;
    let listIsbnBook = [];
    for (let index = 0; index < dataRes.length; index++) {
      listIsbnBook.push(dataRes[index].isbn);
    }

    const data = {
      status: response.status,
      time: response.responseTime,
      listBook: listIsbnBook,
    };

    return data;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      status: error?.response?.status,
      message: error?.response.data.message,
      urlApi: error?.response.config.url,
      dataRequest: error?.response.config.data,
    };
  }
};

import { bookStoreConfig } from "../config/apiConfig.js";
import axios from "../utils/axios.js";
export const getListBookStore = async () => {
  try {
    const listBookStoreURL = `${bookStoreConfig.baseURL}BookStore/v1/Bookshyujhhyyyy`;
    const response = await axios.get(listBookStoreURL);
    // const data = response.data.books;
    // let listIsbnBook = [];
    // for (let index = 0; index < data.length; index++) {
    //   listIsbnBook.push(data[index].isbn);
    // }
    // return listIsbnBook;
    const data = {
      status: response.status,
      time: response.responseTime,
    };
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

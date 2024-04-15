import { bookStoreConfig } from "../config/apiConfig.js";
import axios from "../utils/axios.js";
export const getListBookStore = async () => {
  try {
    const listBookStoreURL = `${bookStoreConfig.baseURL}BookStore/v1/Books`;
    const response = await axios.get(listBookStoreURL);
    const data = response.data.books;
    let listIsbnBook = [];
    for (let index = 0; index < data.length; index++) {
      listIsbnBook.push(data[index].isbn);
    }
    return listIsbnBook;
  } catch (error) {
    return {
      status: error?.response?.status,
      time: error?.responseTime,
    };
  }
};

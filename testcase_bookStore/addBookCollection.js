import { bookStoreConfig } from "../config/apiConfig.js";
import axios from "../utils/axios.js";
import { getListBookStore } from "./getListBookStore.js";
import { generateToken } from "./GenerateToken.js";
export const addBookCollection = async () => {
  try {
    const startTime = new Date();
    const listIsbn = await getListBookStore();
    const listBook = listIsbn.listBook;
    console.log("get list book in add book function", listBook);
    // const listUser = await generateToken();

    const listUser = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Imx5ZHR0IiwicGFzc3dvcmQiOiJOZ3VvaWVteWV1QDI3MDQiLCJpYXQiOjE3MTM4OTEzMTB9.04z58J3vDpzAd7sDai506YB6KHq4qBxLjcti1fcu2-8",
    };

    // const datauserID = listUser.userID;
    const datauserID = "5004ca8c-89eb-47d9-9f14-f2958772e320";

    const configHeader = {
      Authorization: `Bearer ${listUser.token}`,
    };
    const addBookCollectionURL = `${bookStoreConfig.baseURL}BookStore/v1/Books`;

    for (let index = 0; index < listBook.length; index++) {
      const dataReq = {
        userId: datauserID,
        collectionOfIsbns: [
          {
            isbn: listBook[index],
          },
        ],
      };
      try {
        const response = await axios.post(addBookCollectionURL, dataReq, {
          headers: configHeader,
        });
        console.log(response.data);
      } catch (error) {
        console.log(
          `Error occurred for ISBN ${listBook[index]}:`,
          error.response.data
        );
        // Log the error and continue to the next iteration
        continue;
      }
    }
    const endTime = new Date();

    return {
      status: 201,
      time: endTime - startTime,
    };
  } catch (error) {
    console.log(error);
    return {
      status: error?.response?.status,
      time: error?.responseTime,
    };
  }
};

async function myAsyncFunction() {
  // Perform some asynchronous operation, like fetching data from a server
  const result = await addBookCollection();

  // Once the asynchronous operation is completed, you can continue with your code
  console.log(result);
}

// Call the asynchronous function
myAsyncFunction();

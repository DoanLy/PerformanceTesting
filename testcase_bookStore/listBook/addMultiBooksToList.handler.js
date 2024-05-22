import { bookStoreConfig } from "../../config/apiConfig.js";
import axios from "../../utils/axios.js";
import { readFileListUser } from "./readFileListUser.js";

const listIsbn = ["9781449331818", "9781449337711", "9781449365035"];
const addBookCollectionURL = `${bookStoreConfig.baseURL}BookStore/v1/Books`;

export const addMultiBooksToList = async (request) => {
  const listUser = request;
  let arr = [];
  for (let index = 0; index < listIsbn.length; index++) {
    try {
      const configHeader = {
        Authorization: `Bearer ${listUser.token}`,
      };

      const dataReq = {
        userId: listUser.userID,
        collectionOfIsbns: [
          {
            isbn: listIsbn[index],
          },
        ],
      };

      const response = await axios.post(addBookCollectionURL, dataReq, {
        headers: configHeader,
      });
      const data = {
        status: response.status,
        time: endTime - startTime,
        userName: listUser.userName,
        userID: dataReq.userId,
        token: configHeader.Authorization,
        isbn: response.data.books[0].isbn,
      };
      console.log("addMultiBooksToList response: ", data);

      arr.push(data);
    } catch (error) {
      console.log(error.response);
    }
  }
  // console.log("addMultiBooksToList response: ", arr);
};

// const runMultiple = async () => {
//   const listUsers = readFileListUser(); // Changed listUser to listUsers to reflect it's an array
//   const arrayPromise = [];

//   for (let index = 0; index < 2; index++) {
//     // Changed listUser to listUsers
//     arrayPromise.push(addMultiBooksToList(listUsers[index])); // Pass each user object to addMultiBooksToList
//   }
//   await Promise.all(arrayPromise);
// };

// runMultiple();

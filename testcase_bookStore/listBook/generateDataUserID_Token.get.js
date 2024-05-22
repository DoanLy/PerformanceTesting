//function này giúp generate data test
import { login } from "../login/login.handler.js";
import { getLoginData } from "../login/login.get.js";
import fs from "fs";
import { generateToken } from "../generateToken.js";

const getListUserIDToken = async () => {
  let listUserIDToken = [];
  const listAccoutLogin = getLoginData();

  for (let index = 0; index < listAccoutLogin.length; index++) {
    const listUser = await login(listAccoutLogin[index]);
    const userIDToken = {
      userName: listUser.userName,
      password: listUser.password,
      userID: listUser.userID,
      token: listUser.token,
    };
    listUserIDToken.push(userIDToken);
    // console.log("listUser: ", listUser);
  }
  return listUserIDToken;
};

async function myAsyncFunction() {
  const filePath =
    "D:/CODE/PerformanceTesting/testcase_bookStore/listBook/listUser.json";
  try {
    fs.writeFileSync(filePath, "", { flag: "w" });
    console.log("Dữ liệu đã được xóa thành công.");
  } catch (error) {
    console.error("Đã xảy ra lỗi khi xóa dữ liệu từ tệp:", error);
    return;
  }
  // Perform some asynchronous operation, like fetching data from a server
  const result = await getListUserIDToken();

  const jsonData = JSON.stringify(result, null, 1);
  try {
    fs.writeFileSync(filePath, jsonData);
    console.log("Dữ liệu đã được ghi vào file thành công.");
  } catch (error) {
    console.error("Đã xảy ra lỗi khi ghi dữ liệu vào file:", error);
  }
}
async function myAsyncFunction1() {
  await generateToken();
  const result = await myAsyncFunction();
  console.log(result);
}

myAsyncFunction1();

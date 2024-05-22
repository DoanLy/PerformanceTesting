import fs from "fs";

// Function để đọc dữ liệu từ file JSON
export function readFileListUser() {
  const filename =
    "D:/CODE/PerformanceTesting/testcase_bookStore/listBook/listUser.json";
  try {
    const jsonData = fs.readFileSync(filename, "utf8");
    const userData = JSON.parse(jsonData);
    const listuser = [];
    for (let index = 0; index < userData.length; index++) {
      //lấy ra list token
      const user = {
        // stt: index + 1,
        userID: userData[index].userID,
        token: userData[index].token,
        userName: userData[index].userName,
      };
      listuser.push(user);
    }

    return listuser;
  } catch (error) {
    console.error("Đã xảy ra lỗi khi đọc dữ liệu từ file:", error);
    return null;
  }
}

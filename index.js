import { exportToExcel } from "./utils/exportExcel.js";
import { peakLoadTestingReadFile } from "./core/Performance_Tests_readFile/peakLoadTesting-readFile.js";
import { stressTesting } from "./core/Performance_Tests/stressTesting.js";
import { environment } from "./config/env.js";
import { getListBookStore } from "./testcase_bookStore/getListBookStore.js";
import { createAccountUser } from "./testcase_bookStore/register/createAccountUser.handler.js";
import { login } from "./testcase_bookStore/login/login.handler.js";
import { loadTesting } from "./core/Performance_Tests/loadTesting.js";
import { getLoginData } from "./testcase_bookStore/login/login.get.js";
import { loadTestingReadFile } from "./core/Performance_Tests_readFile/loadTesting-readFile.js";
import { peakLoadTesting } from "./core/Performance_Tests/peakLoadTesting.js";
import { stressTestingReadFile } from "./core/Performance_Tests_readFile/stresstTesting-readFile.js";
import { readFileListUser } from "./testcase_bookStore/listBook/readFileListUser.js";
import { addBookCollection } from "./testcase_bookStore/listBook/addMyListBook.handler.js";
import { getMyListBook } from "./testcase_bookStore/listBook/getMyListBook.handler.js";
import { addMultiBooksToList } from "./testcase_bookStore/listBook/addMultiBooksToList.handler.js";
import { deleteBookCollection } from "./testcase_bookStore/listBook/deleteMyListBook.handler.js";
const testcases = [
  {
    transNm: "Create Account User - Load Test",
    durationInSeconds: 60 * 5,
    func: createAccountUser,
    expectedStatus: 201,
    numReq: 50,
    type: "loadTesting",
    active: false,
  },
  {
    transNm: "Create Account User - StressTesting",
    numTimes: 100,
    numReq: 50,
    waitTime: 500,
    func: createAccountUser,
    expectedStatus: 201,
    type: "stressTesting",
    active: false,
  },
  // {
  //   transNm: "Create Account User - Peak Load Test",
  //   numReq: 10,
  //   func: createAccountUser,
  //   expectedStatus: 201,
  //   type: "peakLoadTesting",
  //   active: true,
  // },
  {
    transNm: "Login - loadTestingReadFile",
    durationInSeconds: 5,
    func: login,
    expectedStatus: 200,
    numReq: 2,
    getFunc: getLoginData,
    type: "loadTestingReadFile",
    active: false,
  },
  // {
  //   transNm: "Login - peakLoadTestingReadFile",
  //   numReq: 10,
  //   func: login,
  //   expectedStatus: 200,
  //   getFunc: getLoginData,
  //   type: "peakLoadTestingReadFile",
  //   active: false,
  // },
  {
    transNm: "Login",
    numTimes: 10,
    numReq: 5,
    waitTime: 3000,
    func: login,
    expectedStatus: 200,
    getFunc: getLoginData,
    type: "stressTestingReadFile",
    active: false,
  },
  // {
  //   transNm: "Add my list book - peakLoadTestingReadFile",
  //   numReq: 50,
  //   func: addBookCollection,
  //   expectedStatus: 201,
  //   getFunc: readFileListUser,
  //   type: "peakLoadTestingReadFile",
  //   active: false,
  // },
  // {
  //   transNm: "Add my list book - stressTestingReadFile",
  //   numTimes: 100,
  //   numReq: 30,
  //   waitTime: 100,
  //   func: addBookCollection,
  //   expectedStatus: 200,
  //   getFunc: readFileListUser,
  //   type: "stressTestingReadFile",
  //   active: false,
  // },
  // {
  //   transNm: "Get my list book - peakLoadTestingReadFile",
  //   numReq: 2,
  //   func: getMyListBook,
  //   expectedStatus: 200,
  //   getFunc: readFileListUser,
  //   type: "peakLoadTestingReadFile",
  //   active: true,
  // },
  {
    transNm: "Add multi my list book - peakLoadTestingReadFile",
    numReq: 1,
    func: addMultiBooksToList,
    expectedStatus: 200,
    getFunc: readFileListUser,
    type: "peakLoadTestingReadFile",
    active: true,
  },
  {
    transNm: "Delete my list book - peakLoadTestingReadFile",
    numReq: 1,
    func: deleteBookCollection,
    expectedStatus: 204,
    getFunc: readFileListUser,
    type: "peakLoadTestingReadFile",
    active: false,
  },
  // {
  //   transNm: "Get list book - stressTesting",
  //   numTimes: 2,
  //   numReq: 5,
  //   waitTime: 500,
  //   func: getListBookStore,
  //   expectedStatus: 200,
  //   type: "stressTesting",
  // },
  // {
  //   transNm: "Get List Products",
  //   numReq: 10,
  //   func: getListCustomer,
  //   expectedStatus: 200,
  //   type: "loadTesting",
  // },
];

let transactions = [];
let logError = [];

for (let index = 0; index < testcases.length; index++) {
  const testcase = testcases[index];
  let response;
  if (testcase.active === true) {
    switch (testcase.type) {
      case "peakLoadTesting":
        response = await peakLoadTesting(
          testcase.transNm,
          testcase.numReq,
          testcase.func,
          testcase.expectedStatus
        );
        break;

      case "peakLoadTestingReadFile":
        response = await peakLoadTestingReadFile(
          testcase.transNm,
          testcase.numReq,
          testcase.func,
          testcase.expectedStatus,
          testcase.getFunc
        );
        break;
      case "stressTesting":
        response = await stressTesting(
          testcase.transNm,
          testcase.numTimes,
          testcase.numReq,
          testcase.waitTime,
          testcase.func,
          testcase.expectedStatus
        );
        break;

      case "stressTestingReadFile":
        response = await stressTestingReadFile(
          testcase.transNm,
          testcase.numTimes,
          testcase.numReq,
          testcase.waitTime,
          testcase.func,
          testcase.expectedStatus,
          testcase.getFunc
        );
        break;

      case "loadTesting":
        response = await loadTesting(
          testcase.transNm,
          testcase.durationInSeconds,
          testcase.func,
          testcase.expectedStatus,
          testcase.numReq,
          testcase.getFunc
        );
        break;

      case "loadTestingReadFile":
        response = await loadTestingReadFile(
          testcase.transNm,
          testcase.durationInSeconds,
          testcase.func,
          testcase.expectedStatus,
          testcase.numReq,
          testcase.getFunc
        );
        break;
    }
    if (response.a_transactions) {
      transactions.push(response.a_transactions);
    }

    if (response.a_results) {
      logError.push(response.a_results);
    }
  }
}

let handleLogs = [];
logError.forEach((innerArray) => {
  innerArray.forEach((item) => {
    handleLogs.push(item);
  });
});

const logs = handleLogs
  .filter((item) => item.error === true)
  .map((item) => ({
    urlApi: item.urlApi,
    dataRequest: item.dataRequest,
    status: item.status,
    response: item.message,
  }));

await exportToExcel(environment, transactions, logs).catch((error) => {
  console.error("Error exporting to Excel:", error);
});

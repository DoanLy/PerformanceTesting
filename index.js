import { exportToExcel } from "./utils/exportExcel.js";
import { peakLoadTesting } from "./core/peakloadTesting.js";
import { stressTesting } from "./core/stressTesting.js";
import { environment } from "./config/env.js";
import { getListBookStore } from "./testcase_bookStore/getListBookStore.js";
import { createAccountUser } from "./testcase_bookStore/createAccountUser.js";
import { addBookCollection } from "./testcase_bookStore/addBookCollection.js";
import { loadTesting } from "./core/loadTesting.js";
const testcases = [
  {
    transNm: "Create Account User - Load Test",
    numReq: 1,
    durationInSeconds: 1,
    func: createAccountUser,
    expectedStatus: 201,
    type: "loadTesting",
  },
  // {
  //   transNm: "Get List Load Customers",
  //   numReq: 1,
  //   func: getListCustomer,
  //   expectedStatus: 200,
  //   type: "peakLoadTesting",
  // },
  {
    transNm: "Get list book",
    numReq: 1,
    func: getListBookStore,
    expectedStatus: 200,
    type: "peakLoadTesting",
  },
  // {
  //   transNm: "Add Book to Collection",
  //   numTimes: 2,
  //   numReq: 5,
  //   waitTime: 500,
  //   func: addBookCollection,
  //   expectedStatus: 201,
  //   type: "stressTesting",
  // },
  // {
  //   transNm: "Get List Products",
  //   numReq: 10,
  //   func: getListCustomer,
  //   expectedStatus: 200,
  //   type: "loadTesating",
  // },
];

let transactions = [];
let logError = [];
for (let index = 0; index < testcases.length; index++) {
  const testcase = testcases[index];
  let response;
  switch (testcase.type) {
    case "peakLoadTesting":
      response = await peakLoadTesting(
        testcase.transNm,
        testcase.numReq,
        testcase.func,
        testcase.expectedStatus
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

    case "loadTesting":
      response = await loadTesting(
        testcase.transNm,
        testcase.numReq,
        testcase.durationInSeconds,
        testcase.func,
        testcase.expectedStatus
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

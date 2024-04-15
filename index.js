import { exportToExcel } from "./utils/exportExcel.js";
import { loadTesting } from "./core/loadTesting.js";
import { stressTesting } from "./core/stressTesting.js";
import { environment } from "./config/env.js";
import { getListCustomer } from "./testcase/getListCustomer.js";
import { createAccountUser } from "./testcase/createAccountUser.js";
import { addBookCollection } from "./testcase/addBookCollection.js";

const testcases = [
  // {
  //   transNm: "Add Book to Collection",
  //   numberReq: 1,
  //   func: addBookCollection,
  //   expectedStatus: 201,
  //   type: "loadTesting",
  // },
  // {
  //   transNm: "Get List Load Customers",
  //   numberReq: 1,
  //   func: getListCustomer,
  //   expectedStatus: 200,
  //   type: "loadTesting",
  // },
  {
    transNm: "Create Account User",
    numberReq: 1,
    func: createAccountUser,
    expectedStatus: 201,
    type: "loadTesting",
  },
  // {
  //   transNm: "Add Book to Collection",
  //   numTimes: 2,
  //   numberReq: 5,
  //   waitTime: 500,
  //   func: addBookCollection,
  //   expectedStatus: 201,
  //   type: "stressTesting",
  // },
  // {
  //   transNm: "Get List Products",
  //   numberReq: 10,
  //   func: getListCustomer,
  //   expectedStatus: 200,
  //   type: "loadTesating",
  // },
];

let transactions = [];

for (let index = 0; index < testcases.length; index++) {
  const testcase = testcases[index];
  let response;
  switch (testcase.type) {
    case "loadTesting":
      response = await loadTesting(
        testcase.transNm,
        testcase.numberReq,
        testcase.func,
        testcase.expectedStatus
      );
      break;
    case "stressTesting":
      response = await stressTesting(
        testcase.transNm,
        testcase.numTimes,
        testcase.numberReq,
        testcase.waitTime,
        testcase.func,
        testcase.expectedStatus
      );
      break;
  }
  if (response) {
    transactions.push(response);
  }
}
const logs = [
  {
    urlApi: "http://aurora-api.dhttech.com",
    code: "ERR_BAD_REQUEST",
    status: 401,
    response: "invalid_token",
  },
];

await exportToExcel(environment, transactions, logs).catch((error) => {
  console.error("Error exporting to Excel:", error);
});

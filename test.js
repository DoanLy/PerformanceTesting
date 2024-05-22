const testcases = [
  {
    testcase: "Register",
    func: createAccountUser,
    type: "loadTesting",
  },
  {
    testcase: "Login",
    func: login,
    type: "peakloadTesting",
  },
  {
    testcase: "Add book to list",
    func: addBook,
    type: "stressTesting",
  },
];

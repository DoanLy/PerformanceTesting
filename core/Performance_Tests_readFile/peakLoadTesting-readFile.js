export const peakLoadTestingReadFile = async (
  transName,
  numReq,
  func,
  expectedStatus,
  getFunc
) => {
  const apiCallPromises = [];
  let currentIndex = 0;
  const requests = getFunc();

  if (requests.length === 0) {
    console.error("No requests found in the file.");
    return;
  }

  console.log(`Starting test with ${numReq} request`);

  for (let i = 0; i < numReq; i++) {
    // console.log(`Starting test time ${i + 1} `);

    if (currentIndex >= requests.length) {
      break;
    }

    const request = requests[currentIndex];
    currentIndex++;

    console.log(`Request ${i + 1}: "${request}"`);
    const result = func(request);

    apiCallPromises.push(result);
  }
  const results = await Promise.all(apiCallPromises);
  console.log("peak load test ", results);
  let totalTime = 0;
  let maxTime = 0;
  let minTime = Infinity;
  for (let index = 0; index < results.length; index++) {
    const times = results[index]?.time;
    totalTime += times;
    if (times > maxTime) {
      maxTime = times;
    }
    if (times < minTime) {
      minTime = times;
    }
  }
  const avgTime = totalTime / results.length;
  const transactions = {
    transactionName: transName,
    status:
      results.length ===
      results.filter((response) => response.status === expectedStatus).length
        ? "PASSED"
        : "FAILED",
    totalRequest: results.length,
    min: minTime,
    max: maxTime,
    avg: avgTime,
    passed: results.filter((response) => response.status === expectedStatus)
      .length,
    failed: results.filter((response) => response.status !== expectedStatus)
      .length,
  };

  return {
    a_transactions: transactions,
    a_results: results,
  };
};

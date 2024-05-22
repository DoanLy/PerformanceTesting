export const stressTestingReadFile = async (
  transName,
  numTimes,
  numReq,
  waitTime,
  func,
  expectedStatus,
  getFunc
) => {
  let totalTime = 0;
  let maxTime = 0;
  let minTime = Infinity;
  const requests = getFunc();
  let currentIndex = 0;
  let results = [];
  const maxRequets = requests.length;

  if (maxRequets === 0) {
    console.error("No requests found in the file.");
    return;
  }

  const callApi = async () => {
    const apiCallPromises = [];
    for (let index = 0; index < numReq; index++) {
      if (currentIndex === maxRequets) {
        break;
      }
      const request = requests[currentIndex];
      currentIndex++;
      apiCallPromises.push(func(request));
    }
    const result = await Promise.all(apiCallPromises);
    results = [...results, ...result];
  };

  for (let index = 0; index < numTimes; index++) {
    console.log(`Starting test time ${index + 1} `);
    if (currentIndex === maxRequets) {
      break;
    }
    callApi();
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
  console.log(results, "result");
  for (let index = 0; index < results.length; index++) {
    const times = results[index].time;
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

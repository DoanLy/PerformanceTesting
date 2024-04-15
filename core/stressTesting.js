export const stressTesting = async (
  transName,
  numTimes,
  numReq,
  waitTime,
  func,
  expectedStatus
) => {
  let totalTime = 0;
  let maxTime = 0;
  let minTime = Infinity;

  let results = [];

  for (let index = 0; index < numTimes; index++) {
    const apiCallPromises = [];
    for (let index = 0; index < numReq; index++) {
      const response = func();
      apiCallPromises.push(response);
    }
    const result = await Promise.all(apiCallPromises);
    results = [...results, ...result];
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

  return transactions;
};
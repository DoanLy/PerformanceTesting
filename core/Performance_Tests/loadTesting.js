export const loadTesting = async (
  transName,
  numReq,
  durationInSeconds,
  func,
  expectedStatus
) => {
  let totalTime = 0;
  let maxTime = 0;
  let minTime = Infinity;
  let results = [];
  const startTime = Date.now();

  const callApi = async () => {
    const apiCallPromises = []; //gửi xong n request sẽ reset lại mảng
    for (let j = 0; j < numReq; j++) {
      apiCallPromises.push(func()); //tạo promise
    }
    const result = await Promise.all(apiCallPromises); // gọi func
    results = [...results, ...result];
  };

  while ((Date.now() - startTime) / 1000 < durationInSeconds) {
    callApi();
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  // console.log("Load test log", results);
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

  return { a_transactions: transactions, a_results: results };
};

export const loadTestingReadFile = async (
  transName,
  durationInSeconds,
  func,
  expectedStatus,
  numReq,
  getFunc
) => {
  let dataLength = numReq;
  let requests = getFunc();

  const maxRequets = requests.length;
  let noRequets = 0;
  let totalTime = 0;
  let maxTime = 0;
  let minTime = Infinity;
  let results = [];
  const startTime = Date.now();

  const callApi = async () => {
    const apiCallPromises = [];
    const restNoRequest = maxRequets - noRequets; //số request còn lại
    if (restNoRequest < numReq) {
      dataLength = restNoRequest;
    }
    for (let j = 0; j < dataLength; j++) {
      const index = j + dataLength * noRequets;
      apiCallPromises.push(func(requests?.[index]));
    }

    const result = await Promise.all(apiCallPromises);
    results = [...results, ...result];
    noRequets += numReq;
  };
  while (
    (Date.now() - startTime) / 1000 < durationInSeconds &&
    noRequets < maxRequets
  ) {
    callApi();
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  console.log("Load test log", results);
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

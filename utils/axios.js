import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.metadata = { startTime: new Date() };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    response.config.metadata.endTime = new Date();
    const responseTime =
      response.config.metadata.endTime - response.config.metadata.startTime;
    response.responseTime = responseTime;
    return response;
  },
  function (error) {
    if (error.config) {
      error.config.metadata.endTime = new Date();
      const responseTime =
        error.config.metadata.endTime - error.config.metadata.startTime;
      error.responseTime = responseTime;
    }
    return Promise.reject(error);
  }
);
export default axios;

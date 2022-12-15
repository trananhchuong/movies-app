import axios from "axios";

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    params: {
      ...config.params,
      api_key: process.env.REACT_APP_API_KEY_MOVIE_DB,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default axiosClient;

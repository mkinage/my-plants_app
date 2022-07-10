import axios from "axios";

const plantsApi = axios.create({
  // @TODO: add env
  baseURL: "http://localhost:3000",
  timeout: 4000,
  headers: {
    Accept: "application/json",
  },
});

plantsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data?.message);
  }
);
export default plantsApi;
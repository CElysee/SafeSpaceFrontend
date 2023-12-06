// axiosInstance.js

import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API,
  // Other configuration options
});

export default instance;
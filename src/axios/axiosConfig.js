import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `xxxxxxx`, // Replace xxxxxxx with your backend base URL, e.g. http://localhost:5000
});

export default axiosInstance;
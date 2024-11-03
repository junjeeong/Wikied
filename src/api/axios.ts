import axios from "axios";

const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/9-3/",
  // timeout: 1000,
});

export default instance;

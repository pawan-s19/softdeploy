import axios from "axios";

const instance = axios.create({
  baseURL: "https://softdeploy.vercel.app",
  withCredentials: true,
});

export default instance;

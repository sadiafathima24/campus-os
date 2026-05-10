import axios from "axios";

const API = axios.create({
  baseURL: "https://campus-os-7fh1.onrender.com/",
});

export default API;
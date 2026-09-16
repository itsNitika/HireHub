import axios from "axios";

const API = axios.create({
  baseURL: "https://hirehub-i27u.onrender.com/api",
});

export default API;

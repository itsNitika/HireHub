import axios from "axios";

const API = axios.create({
  baseURL: "https://placepro-omn2.onrender.com/api",
});

export default API;
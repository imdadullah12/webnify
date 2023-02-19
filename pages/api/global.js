import axios from "axios";

const Api = axios.create({
  baseURL: "https://antlovebaba.com/school_management_api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default Api;

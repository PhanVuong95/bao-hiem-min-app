import axios from "axios";

const instance = axios.create({
  BASE_URL: "https://baohiem.dion.vn/",
});
export default instance;

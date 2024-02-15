import axios from "axios";

let baseURL = `http://192.168.10.129:10001`; // Towards API-hosted IP address

export default axios.create({
  baseURL: baseURL,
});

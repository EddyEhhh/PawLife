import axios from "axios";

let baseURL = `http://localhost:10001`; // Towards API-hosted IP address
baseURL = `http://172.24.145.70:10001`;
export default axios.create({
  baseURL: baseURL,
});

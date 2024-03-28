import axios from "axios";

let baseURL = `http://localhost:10001`; // Towards API-hosted IP address
// baseURL = `http://172.24.145.70:10001`;
// baseURL = `http://192.168.192.213:10001`; // Towards API-hosted IP address
// baseURL = `http://192.168.192.206:10001`; // Towards API-hosted IP address
// baseURL = `http://192.168.192.213:10001`; // Towards API-hosted IP address


export default axios.create({
  baseURL: baseURL,
});

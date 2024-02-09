import axios from "axios";

let baseURL = `http://10.0.2.2:10001`; // Towards API-hosted IP address

export default axios.create({
    baseURL : baseURL
})
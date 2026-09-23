import axios from "axios";

const api = axios.create({
  baseURL: "https://react-backend-ccm.onrender.com/"
});

export default api;
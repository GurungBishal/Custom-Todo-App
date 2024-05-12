import axios from "axios";

const axiosServices = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/todo`,
});

export default axiosServices;

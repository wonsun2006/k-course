import axios from "axios";

const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;

export const axiosInstance = axios.create({
  baseURL: `${REACT_APP_API_HOST}`,
  withCredentials: true,
});

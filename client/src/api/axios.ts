import axios from "axios";
import Cookies from "js-cookie";

const _axios = axios.create({
  // vercel env crash
  baseURL: `https://so-bes-senior-task.vercel.app`,
  headers: {
    "Content-Type": "application/json",
  },
});

_axios.interceptors.request.use((config: any) => {
  const newConfig = { ...config };
  const userData = Cookies.get("userData");
  const authData = userData ? JSON.parse(userData) : null;

  if (authData && newConfig.headers) {
    newConfig.headers.Authorization = `Bearer ${authData.accessToken}`;
  }

  return newConfig;
});

export default _axios;

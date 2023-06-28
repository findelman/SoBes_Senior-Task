// useUserData.js
import Cookies from "js-cookie";

export const useUserData = () => {
  const userData = Cookies.get("userData");
  return userData ? JSON.parse(userData) : null;
};
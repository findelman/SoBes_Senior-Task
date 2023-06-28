import Cookies from "js-cookie";

// Записываем куки, токен живет 1 день
export const setCookie = ({ email, token }: { email: string; token: string }) => {
    const coockiesData = {
      email: email,
      accessToken: token,
    };
    const coockiesDataString = JSON.stringify(coockiesData);
    Cookies.set("userData", coockiesDataString, { expires: 1 });
  };
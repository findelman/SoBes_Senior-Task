import _axios from "@/api/axios";
import rootStore from "@/store/RootStore";
import UserModel from "@/store/UserModel";
import { useState, ChangeEvent, FormEvent } from "react";
import { setCookie } from "./setCookie";

const endpoints = {
  login: "/auth/login",
  register: "/auth/register",
};

export const useAuthForm = (activeTab: number, router: any) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Меняем url запроса в зависимости от активного таба (Войти || Регистрация)
    const switchUrl: string =
      activeTab === 0 ? endpoints.login : endpoints.register;

    try {
      const response = await _axios.post(switchUrl, formData);

      rootStore.setUser(UserModel.create({ email: formData.email }));
      setCookie({ email: formData.email, token: response.data.access_token });

      router.push("/todo");
    } catch (error: any) {
      // Смотрим приходит ли ошибка в сообщении
      const errorMessage =
        error?.response?.data?.message || "Ошибка авторизации";
      setError(errorMessage);
    }
  };

  return {
    formData,
    handleFormChange,
    handleSubmit,
    error,
  };
};

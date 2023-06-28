"use client";
import { Provider } from "mobx-react";
import rootStore from "@/store/RootStore";
import "./globals.css";
import UserModel from "@/store/UserModel";
import { useEffect } from "react";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = useUserData();
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      rootStore.setUser(UserModel.create({ email: userData.email }));
      router.push("/todo");
    } else {
      router.push("/");
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <Provider rootStore={rootStore}>{children}</Provider>
      </body>
    </html>
  );
}

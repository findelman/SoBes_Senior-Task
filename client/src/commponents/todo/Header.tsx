"use client";
import rootStore from "@/store/RootStore";
import UserModel from "@/store/UserModel";
import { Button } from "@material-ui/core";
import Cookies from "js-cookie";
import { useObserver } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

const Wrapper = styled.header`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = () => {
  const router = useRouter();
  const { email } = useObserver(() => rootStore.user);
  const { setTodos } = rootStore.todos;

  const handleLogout = () => {
    Cookies.remove("userData");
    router.push("/");
    // При смене аккунта на долю секунды можно увидеть старый todolist, снизу  мы обновляем что бы этого не происходило
    setTodos([]);
  };

  return (
    <Wrapper>
      <b>{email}</b>
      <Button variant="contained" onClick={handleLogout}>
        Выйти
      </Button>
    </Wrapper>
  );
};

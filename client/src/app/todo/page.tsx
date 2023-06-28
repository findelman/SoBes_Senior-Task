"use client";
import { Header } from "@/commponents/todo/Header";
import { TodoList } from "@/commponents/todo/TodoList";
import { useUserData } from "@/hooks/useUserData";
import { Box } from "@material-ui/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  max-width: 450px;
  width: 100%;
  border-radius: 20px;
  background: white;
  padding: 20px;
`;

export default function Home() {
  const router = useRouter();
  const userData = useUserData();

  useEffect(() => {
    if (!userData) {
      router.push("/");
    }
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container>
        <Header />
        <TodoList />
      </Container>
    </Box>
  );
}

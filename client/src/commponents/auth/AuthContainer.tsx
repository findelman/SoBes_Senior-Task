"use client";
import React from "react";
import { TextField, Button, Box } from "@material-ui/core";
import styled from "styled-components";
import { useAuthForm } from "./hooks/useAuthForm";
import { AuthTab } from "./auth.inteface";
import { AuthTabs } from "./AuthTabs";
import { useAuthTabs } from "./hooks/useTabForm";
import { useRouter } from "next/navigation";

const Wrapper = styled.div`
  max-width: 550px;

  button {
    margin-top: 20px;
    width: 50%;
  }
  .submit-btn {
    width: 100%;
    font-weight: bold;
  }
`;

const Error = styled.p`
  color: red;
`;

const FORM_FIELDS = [
  {
    label: "Email",
    name: "email",
  },
  {
    label: "Password",
    name: "password",
  },
];

export const AuthContainer: React.FC<{}> = () => {
  const router = useRouter();
  const { activeTab, handleTabChange } = useAuthTabs();
  const { formData, handleFormChange, handleSubmit, error } = useAuthForm(
    activeTab,
    router
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Wrapper>
        <AuthTabs value={activeTab} onChange={handleTabChange} />
        <form onSubmit={handleSubmit}>
          {FORM_FIELDS.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              type={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleFormChange}
              fullWidth
              required
              margin="normal"
            />
          ))}
          <Error>{error}</Error>
          <Button
            className="submit-btn"
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            {activeTab === AuthTab.Login ? "Войти" : "Регистрация"}
          </Button>
        </form>
      </Wrapper>
    </Box>
  );
};

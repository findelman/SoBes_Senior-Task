import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { AuthTab } from "./auth.inteface";

interface IAuthTabs {
  value: AuthTab;
  onChange: (newValue: AuthTab) => void;
}

export const AuthTabs: React.FC<IAuthTabs> = ({ value, onChange }) => {
  return (
    <Tabs
      indicatorColor="primary"
      value={value}
      onChange={(event, newValue) => onChange(newValue as AuthTab)}
    >
      <Tab label="Войти" />
      <Tab label="Регистрация" />
    </Tabs>
  );
};


import { useState } from "react";
import { AuthTab } from "../auth.inteface";

export const useAuthTabs = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>(AuthTab.Login);

  const handleTabChange = (newValue: AuthTab) => {
    setActiveTab(newValue);
  };

  return {
    activeTab,
    handleTabChange,
  };
};

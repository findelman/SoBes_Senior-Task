"use client";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useTodoList } from "./hooks/useTodoList";
import { useState } from "react";
import styled from "styled-components";

const StyledToggleButton = styled(ToggleButton)`
  padding: 5px 0px;
`;

const ToggleWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const BUTTON_DATA = [
  { value: "all", label: "Все" },
  { value: "completed", label: "Выполненные" },
  { value: "createdAt", label: "По дате" },
];

export const SortButtons = () => {
  const { sortByCreatedAt, sortByCompleted, resetSort } = useTodoList();
  const [sortType, setSortType] = useState("all");

  const handleSort = (sortBy: string) => {
    switch (sortBy) {
      case "createdAt":
        sortByCreatedAt();
        setSortType("createdAt");
        break;
      case "completed":
        sortByCompleted();
        setSortType("completed");
        break;
      default:
        resetSort();
        setSortType("all");
    }
  };

  return (
    <ToggleWrapper>
      {BUTTON_DATA.map((button) => (
        <StyledToggleButton
          key={button.value}
          value={button.value}
          selected={sortType === button.value}
          onClick={() => handleSort(button.value)}
        >
          {button.label}
        </StyledToggleButton>
      ))}
    </ToggleWrapper>
  );
};

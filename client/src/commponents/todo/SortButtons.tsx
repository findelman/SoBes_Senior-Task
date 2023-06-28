"use client";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useTodoList } from "./hooks/useTodoList";
import { useState } from "react";
import styled from "styled-components";

const StyledToggleButton = styled(ToggleButton)`
padding: 5px 0px; 
`;

const ToggleWrapper = styled(ToggleButtonGroup)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

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
    <ToggleWrapper
      value={sortType}
      exclusive
      onChange={(event: React.MouseEvent<HTMLElement>, newValue: string) =>
        handleSort(newValue)
      }
    >
      <StyledToggleButton
        value="all"
        selected={sortType === "all"}
        onClick={() => handleSort("all")}
      >
        Все
      </StyledToggleButton>
      <StyledToggleButton
        value="completed"
        selected={sortType === "completed"}
        onClick={() => handleSort("completed")}
      >
        Выполненные
      </StyledToggleButton>
      <StyledToggleButton
        value="createdAt"
        selected={sortType === "createdAt"}
        onClick={() => handleSort("createdAt")}
      >
        По дате
      </StyledToggleButton>
    </ToggleWrapper>
  );
};

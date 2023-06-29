import {
  IconButton,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import { SetStateAction, memo, useState } from "react";
import styled from "styled-components";
import { useTodoList } from "./hooks/useTodoList";
import { observer } from "mobx-react-lite";

export const StyledIconButton = styled(IconButton)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: black;
`;

const TabsWrapper = styled(Tabs)`
  margin-top: 20px;
  button {
    width: 50%;
  }
`;

export const AddInput = observer(function AddInput() {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  
  const [activeTab, setActiveTab] = useState(0);
  const isAddTab = activeTab === 0;

  const { createTodo, searchText, setSearchText, filterTodos } = useTodoList();



  const handleTabChange = (event: any, newValue: SetStateAction<number>) => {
    if (!isAddTab) {
      setSearchText("");
      filterTodos();
    } else {
      setNewTodoTitle("");
    }
    setActiveTab(newValue);
  };

  const handleAddClick = () => {
    if (newTodoTitle.trim() !== "") {
      createTodo(newTodoTitle);
      setNewTodoTitle("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeTab === 0) {
      setNewTodoTitle(e.target.value);
    } else {
      setSearchText(e.target.value);
      filterTodos();
    }
  };


  return (
    <>
      <TabsWrapper
        indicatorColor="primary"
        value={activeTab}
        onChange={handleTabChange}
        centered
      >
        <Tab label="Добавление" />
        <Tab label="Поиск" />
      </TabsWrapper>
      <ListItem disableGutters>
        <TextField
          fullWidth
          label={isAddTab ? "Добавить" : "Поиск"}
          value={isAddTab ? newTodoTitle : searchText}
          onChange={handleInputChange}
        />
        {isAddTab && (
          <StyledIconButton aria-label="add" onClick={handleAddClick}>
            &#43;
          </StyledIconButton>
        )}
      </ListItem>
    </>
  );
});

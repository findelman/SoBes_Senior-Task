import { IconButton, ListItem, TextField } from "@material-ui/core";
import { memo, useState } from "react";
import styled from "styled-components";
import { useTodoList } from "./hooks/useTodoList";

export const StyledIconButton = styled(IconButton)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: black;
`;

export const AddInput = memo(function AddInput() {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const { createTodo } = useTodoList();

  return (
    <ListItem disableGutters>
      <TextField
        fullWidth
        label="Добавить"
        value={newTodoTitle}
        onChange={(e) => {
          setNewTodoTitle(e.target.value)
        }}
      />
      <StyledIconButton
        aria-label="add"
        onClick={() => {
          if(newTodoTitle.trim() !== ''){
            createTodo(newTodoTitle);
            setNewTodoTitle("");
          }
        }}
      >
        &#43;
      </StyledIconButton>
    </ListItem>
  );
});
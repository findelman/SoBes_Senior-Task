import {
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { useObserver } from "mobx-react-lite";
import { StyledIconButton } from "./AddInput";
import React from "react";
import { ITodo } from "./hooks/useTodoList";

interface ITodoItem {
  todo: ITodo;
  deleteTodo: (todoId: string) => void;
  toggleTodo: (todo: ITodo) => void;
}

export const TodoItem: React.FC<ITodoItem> = ({
  todo,
  deleteTodo,
  toggleTodo,
}) => {
  const formattedDate = new Date(todo.createdAt).toLocaleString();

  return useObserver(() => (
    <ListItem button disableGutters key={todo._id}>
      <Checkbox
        checked={todo.completed}
        disableRipple
        onClick={() => toggleTodo(todo)}
      />
      <ListItemText primary={todo.title} secondary={formattedDate} />
      <ListItemSecondaryAction>
        <StyledIconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteTodo(todo._id)}
        >
          &#128465;
        </StyledIconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));
};

"use client";
import { useObserver } from "mobx-react-lite";
import { List } from "@material-ui/core";
import { ITodo, useTodoList } from "./hooks/useTodoList";
import { AddInput } from "./AddInput";
import { TodoItem } from "./TodoItem";
import { SortButtons } from "./SortButtons";
import { styled } from "styled-components";

const ListWrapper = styled(List)`
  max-height: 50vh;
  overflow-y: scroll;
`;

export const TodoList = () => {
  const { todos, deleteTodo, toggleTodo } = useTodoList();

  return useObserver(() => (
    <>
      <AddInput />
      <SortButtons />
      <ListWrapper>
        {todos?.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        ))}
      </ListWrapper>
    </>
  ));
};

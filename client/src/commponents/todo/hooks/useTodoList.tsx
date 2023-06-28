'use client'
import _axios from "@/api/axios";
import rootStore from "@/store/RootStore";
import { useEffect } from "react";

export interface ITodo {
  title: string;
  completed: boolean;
  user?: string;
  createdAt: string;
  _id: string;
}

export const useTodoList = () => {
  const { todos, setTodos, addTodo, removeTodo, _toggleTodo,sortByCreatedAt,sortByCompleted,resetSort } = rootStore.todos;

  useEffect(() => {
    (async () => {
      try {
        const response = await _axios.get("/todos");
        setTodos(response.data);
      } catch (error) {
        console.log("Ошибка /todos get", error);
      }
    })();
  }, []);

  const createTodo = async (newTodoTitle: string) => {
    const newTodo = {
      title: newTodoTitle,
    };

    try {
      const response = await _axios.post("/todos", newTodo);
      addTodo(response.data);
    } catch (error) {
      console.log("Ошибка /todos create", error);
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      const response = await _axios.delete(`/todos/${todoId}`);
      removeTodo(response.data._id);
    } catch (error) {
      console.log("Ошибка /todos delete", error);
    }
  };

  const toggleTodo = async (todo: any) => {
    try {
      const response = await _axios.put(`/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      _toggleTodo(response.data._id);
    } catch (error) {
      console.log("Ошибка /todos toggleTodo", error);
    }
  };

  return { todos, createTodo, deleteTodo, toggleTodo,sortByCreatedAt,sortByCompleted,resetSort };
};

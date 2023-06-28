import { applySnapshot, getSnapshot, types } from "mobx-state-tree";
import TodoModel from "./TodoModel";
import { ITodo } from "@/commponents/todo/hooks/useTodoList";

const TodosModel = types
  .model("Todos", {
    todos: types.array(TodoModel),
    sortType: types.optional(types.string, ""),
  })
  .actions((self) => ({
    addTodo: (todo: typeof TodoModel.Type) => {
      if (self.sortType === "createdAt" || self.sortType === "completed") {
        self.todos.push(todo);
      } else {
        self.todos.unshift(todo);
      }
      const index = self.todos.findIndex((item) => {
        if (self.sortType === "createdAt") {
          return item.createdAt > todo.createdAt;
        }
      });
      if (index !== -1) {
        self.todos.splice(index, 0, todo);
      }
    },
    setTodos: (todos: ITodo[]) => {
      self.todos.replace(todos);
    },
    removeTodo: (todoId: string) => {
      self.todos.replace(self.todos.filter((item) => item._id !== todoId));
    },
    _toggleTodo: (todoId: string) => {
      const todo = self.todos.find((item) => item._id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    sortByCreatedAt: () => {
      self.todos.replace(
        self.todos
          .slice()
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      );
      self.sortType = "createdAt";
    },
    sortByCompleted: () => {
      self.todos.replace(
        self.todos.slice().sort((a, b) => (a.completed ? -1 : 1))
      );
      self.sortType = "completed";
    },
    resetSort: () => {
      if (self.sortType !== "") {
        self.todos.replace(
          self.todos
            .slice()
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
        );
        if (self.sortType === "createdAt" || self.sortType === "completed") {
          self.todos.reverse();
        }
        self.sortType = "";
      }
    },
  }));

export default TodosModel;

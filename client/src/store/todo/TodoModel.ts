import _axios from "@/api/axios";
import { types } from "mobx-state-tree";

const TodoModel = types.model("Todo", {
  _id: types.string,
  title: types.string,
  completed: types.boolean,
  createdAt: types.string,
});

export default TodoModel;

import { types } from "mobx-state-tree";
import TodoModel from "./todo/TodoModel";
import UserModel from "./UserModel";
import TodosModel from "./todo/TodosModel";

const RootStore = types.model("RootStore", {
    user: UserModel,
    todos: TodosModel,
  }).actions((self) => ({
    setUser(user: typeof UserModel.Type) {
      self.user = user;
    },
  }));
  
  const rootStore = RootStore.create({
    user: { email: "" },
    todos: TodosModel.create({ todos: [] }),
  });
  
  export default rootStore;

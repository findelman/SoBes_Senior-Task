import { types } from "mobx-state-tree";

const UserModel = types.model("User", {
  email: types.string,
});

export default UserModel;

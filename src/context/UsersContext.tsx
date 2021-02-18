import React, { createContext, useReducer } from "react";
import users from "../data/users";

export type UsersContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
export type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
};

export type State = {
  users: User[];
};
export type Action = {
  type: ActionNames;
  payload: User;
};
export type ActionNames = "createUser" | "updateUser" | "deleteUser";
export type fnAction = (x: State, y: Action) => State;
export type Actions = {
  [k in ActionNames]: fnAction;
};
// Outra forma de fazer caso use o Swith ao invez de separar por um objeto e chamar por uma key dinamica
// type CreateUser={
//   readonly type: 'createUser'
//   payload: User;
// }
// type UpdateUser={
//   readonly type: 'updateUser'
//   payload: User;
// }
// type DeleteUser={
//   readonly type: 'deleteUser';
//   payload: User;
// }
// type Action = CreateUser| UpdateUser | DeleteUser
// type Actions= {
//   [k:any]:any
// }

const initialState: { users: User[] } = { users };
const UsersContext = createContext({});
const actions: Actions = {
  createUser: (state: State, action: Action): State => {
    const user = action.payload;
    user.id = Math.random();
    return {
      ...state,
      users: [...state.users, user],
    };
  },
  updateUser(state: State, action: Action) {
    const user = action.payload;
    return {
      ...state,
      users: state.users.map((u: User) => (u.id === user.id ? user : u)),
    };
  },
  deleteUser(state: State, action: Action) {
    const user = action.payload;
    return {
      ...state,
      users: state.users.filter((u: User) => u.id !== user.id),
    };
  },
};

export const UsersProvider: React.FC = (props) => {
  function reducer(state: State, action: Action) {
    // const keyValue: ActionNames = action.type;
    // const fn = actions[keyValue];
    //              simplificado abaixo
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  return (
    <UsersContext.Provider value={{ state, dispatch } as UsersContextType}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;

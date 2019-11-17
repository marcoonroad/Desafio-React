import {
  IUser,
  IUsersState,
  ADD_USER,
  SAVE_USER,
  REMOVE_USER,
  IUserAction,
} from '../../types';

export type IDispatcher = (action: IUserAction) => void;
export type IGetState = () => IUsersState;

export const addUser = (newUser: IUser): IUserAction => {
  return {
    type: ADD_USER,
    data: newUser,
  };
};

export const saveUser = (updatedUser: IUser): IUserAction => {
  return {
    type: SAVE_USER,
    data: updatedUser,
  };
};

export const removeUser = (id: number): IUserAction => {
  return {
    type: REMOVE_USER,
    data: {id},
  };
};

import Immutable from 'immutable';

export interface IUser {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
}

export interface IUsersState {
  users: Immutable.Map<number, IUser>;
}

export const ADD_USER = 'ADD_USER';
export const SAVE_USER = 'SAVE_USER';
export const REMOVE_USER = 'REMOVE_USER';

export interface IAddUser {
  type: typeof ADD_USER;
  data: IUser;
}

export interface ISaveUser {
  type: typeof SAVE_USER;
  data: IUser;
}

export interface IRemoveUser {
  type: typeof REMOVE_USER;
  data: {
    id: number;
  };
}

export type IUserAction = IAddUser | ISaveUser | IRemoveUser;

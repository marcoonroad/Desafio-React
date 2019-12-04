import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {AppState} from '../../../store';

import {IUser, IUsersState, IUserAction} from '../../types';

import {addUser, saveUser, removeUser} from '../actions';

export type IDispatcher = (action: IUserAction) => void;
export type IGetState = () => {users: IUsersState};

export const addUserAsync = (
  newUser: IUser,
): ThunkAction<void, AppState, null, Action<IUser>> => {
  return async (dispatch: IDispatcher, getState: IGetState) => {
    dispatch(addUser(newUser));
  };
};

export const saveUserAsync = (
  updatedUser: IUser,
): ThunkAction<void, AppState, null, Action<IUser>> => {
  return async (dispatch: IDispatcher, getState: IGetState) => {
    dispatch(saveUser(updatedUser));
  };
};

export const removeUserAsync = (
  id: number,
): ThunkAction<void, AppState, null, Action<number>> => {
  return async (dispatch: IDispatcher, getState: IGetState) => {
    dispatch(removeUser(id));
  };
};

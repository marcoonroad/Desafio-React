import Immutable from 'immutable';
const initialUsers = require('../../../static/users.json');

import {
  IUser,
  IUsersState,
  IUserAction,
  ADD_USER,
  SAVE_USER,
  REMOVE_USER,
} from '../../types';

const emptyMap: Immutable.Map<number, IUser> = Immutable.fromJS({});

let initialState: IUsersState = {
  users: emptyMap,
};

initialUsers.forEach((user: IUser) => {
  initialState.users = initialState.users.set(user.id, Immutable.fromJS(user));
});

const usersReducer = (
  state = initialState,
  action: IUserAction
): IUsersState => {
  switch (action.type) {
    case ADD_USER:
      if (!state.users.get(action.data.id)) {
        const updated = state.users.set(
          action.data.id,
          Immutable.fromJS(action.data)
        );
        return {users: updated};
      }
      return state;

    case SAVE_USER:
      if (state.users.get(action.data.id)) {
        const updated = state.users.set(
          action.data.id,
          Immutable.fromJS(action.data)
        );
        return {users: updated};
      }
      return state;

    case REMOVE_USER:
      if (state.users.get(action.data.id)) {
        const updated = state.users.remove(action.data.id);
        return {users: updated};
      }
      return state;

    default:
      return state;
  }
};

export default usersReducer;

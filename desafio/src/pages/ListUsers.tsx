import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import UsersList from '../components/UsersList';
import {AppState} from '../store';
import {removeUserAsync} from '../store/users/thunks';
import '../styles/buttons.css';
import '../styles/tables.css';

const mapState = (state: AppState) => ({
  users: Object.values(state.users.users.toJS()),
});

const mapDispatch = (dispatch: any, ownProps: any) => ({
  removeUser: (id: number) => {
    // FIXME: only for test purposes, drop away from production
    if (Math.random() * 5 <= 2) {
      return Promise.reject('Unexpected error while removing user!');
    }
    return dispatch(removeUserAsync(id));
  },
});

const ConnectedUsers = connect(mapState, mapDispatch)(UsersList);

interface IListUsers {
  editRoutePrefix: string;
  newUserRoute: string;
}

const ListUsers: React.FC<IListUsers> = ({editRoutePrefix, newUserRoute}) => {
  return (
    <div className="list-users-page">
      <ConnectedUsers editRoutePrefix={editRoutePrefix} />
      <NavLink
        to={newUserRoute}
        title="Add new user"
        className="link-as-button positive-button-color">
        New User
      </NavLink>
    </div>
  );
};

export default ListUsers;

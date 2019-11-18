import React from 'react';
import {connect} from 'react-redux';

import UserForm from '../components/UserForm';
import {IUser} from '../store/types';
import {saveUserAsync} from '../store/users/thunks';
import {AppState} from '../store';
import '../styles/forms.css';

interface IUserFilter {
  afterSubmitRoute: string;
  userId: number;
  users: IUser[];
  saveUser: (updatedUser: IUser) => any;
}

const UserFilter: React.FC<IUserFilter> = ({
  afterSubmitRoute,
  userId,
  users,
  saveUser,
}) => {
  const user = users.filter(user => user.id === userId)[0];
  const differentUsers = users.filter(user => user.id !== userId);
  const otherUserIds = differentUsers.map(user => user.id);

  return (
    <UserForm
      user={user}
      otherUserIds={otherUserIds}
      handleUserSubmit={saveUser}
      afterSubmitRoute={afterSubmitRoute}
    />
  );
};

const mapState = (state: AppState) => ({
  users: Object.values(state.users.users.toJS()),
});

const mapDispatch = (dispatch: any, ownProps: any) => ({
  saveUser: (updatedUser: IUser) => dispatch(saveUserAsync(updatedUser)),
});

const ConnectedUserFilter = connect(mapState, mapDispatch)(UserFilter);

interface IMatchId {
  afterSubmitRoute: string;
  match: {
    params: {
      id: string;
    };
  };
}

const EditUser: React.FC<IMatchId> = ({match, afterSubmitRoute}) => {
  const id = Number.parseInt(match.params.id, 10);

  return (
    <div className="user-form-page">
      <ConnectedUserFilter userId={id} afterSubmitRoute={afterSubmitRoute} />
    </div>
  );
};

export default EditUser;

import {connect} from 'react-redux';

import UserForm from '../components/UserForm';
import {IUser} from '../store/types';
import {addUserAsync} from '../store/users/thunks';
import {AppState} from '../store';

const mapState = (state: AppState) => {
  const users = Object.values(state.users.users.toJS());

  return {
    otherUserIds: users.map(user => user.id),
  };
};

const mapDispatch = (dispatch: any, ownProps: any) => ({
  handleUserSubmit: (newUser: IUser) => dispatch(addUserAsync(newUser)),
});

const ConnectedUserForm = connect(mapState, mapDispatch)(UserForm);

export default ConnectedUserForm;

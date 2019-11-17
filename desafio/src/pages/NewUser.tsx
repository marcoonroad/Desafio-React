import {connect} from 'react-redux';

import UserForm from '../components/UserForm';
import {IUser} from '../store/types';
import {addUserAsync} from '../store/users/thunks';
import {AppState} from '../store';

interface INewUser {
  afterSubmitRoute: string;
  addUser: (newUser: IUser) => any;
}

const mapState = (state: AppState) => ({});

const mapDispatch = (dispatch: any, ownProps: any) => ({
  handleUserSubmit: (newUser: IUser) => dispatch(addUserAsync(newUser)),
});

const ConnectedUserForm = connect(mapState, mapDispatch)(UserForm);

export default ConnectedUserForm;

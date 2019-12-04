import React from 'react';

import {ScrollView} from 'react-native';

import Header from '../components/Header';
import Form from '../components/Form';
import {connect} from 'react-redux';
import {IUser} from '../store/types';
import {addUserAsync} from '../store/users/thunks';
import {AppState} from '../store';

interface INewUser {
  otherUserIds: number[];
  handleUserSubmit: (newUser: IUser) => Promise<any>;
}

const NewUser: React.FC<INewUser> = ({otherUserIds, handleUserSubmit}) => {
  return (
    <ScrollView
      style={{
        backgroundColor: '#ffffff',
      }}
      contentInsetAdjustmentBehavior="automatic"
      nestedScrollEnabled={true}>
      <Header title="New User" />

      <Form otherUserIds={otherUserIds} handleUserSubmit={handleUserSubmit} />
    </ScrollView>
  );
};

const mapState = (state: AppState) => {
  const users = Object.values(state.users.users.toJS());

  return {
    otherUserIds: users.map(user => user.id),
  };
};

const mapDispatch = (dispatch: any) => ({
  handleUserSubmit: (newUser: IUser) => {
    // FIXME: testing, remove on production
    if (Math.round(Math.random() * 10) <= 1) {
      return Promise.reject('Unexpected error while registering new user!');
    }
    return dispatch(addUserAsync(newUser));
  },
});

const ConnectedNewUser = connect(
  mapState,
  mapDispatch,
)(NewUser);

export default ConnectedNewUser;

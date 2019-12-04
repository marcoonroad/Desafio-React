import React from 'react';

import {
SafeAreaView,
StyleSheet,
ScrollView,
View,
Button,
Text,
StatusBar,
Dimensions,
} from 'react-native';

import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

import {connect} from 'react-redux';

import {IUser} from '../store/types';
import {saveUserAsync} from '../store/users/thunks';
import {AppState} from '../store';

interface IEditUser {
  users: IUser[];
  handleUserSubmit: (updatedUser: IUser) => Promise<any>;
}

const EditUser: React.FC<IEditUser> = ({ users, handleUserSubmit }) => {
  const {width, height} = Dimensions.get('window');

  const { goBack } = useNavigation();
  const userId = Number.parseInt(useNavigationParam('userId'), 10);

  const user = users.filter(user => user.id === userId)[0];
  const differentUsers = users.filter(user => user.id !== userId);
  const otherUserIds = differentUsers.map(user => user.id);

  const handleRegister = () => {
    goBack();
  };

  const handleCancel = () => {
    goBack();
  };

  return (
    <ScrollView style={{
      backgroundColor: '#ffffff',
    }}
    contentInsetAdjustmentBehavior="automatic"
    nestedScrollEnabled={true}>
    <Header title='New User'/>

    <Form handleUserSubmit={handleUserSubmit} user={user}
      otherUserIds={otherUserIds} />

    </ScrollView>
  );
};


//


const mapState = (state: AppState) => ({
  users: Object.values(state.users.users.toJS()),
});

const mapDispatch = (dispatch: any, ownProps: any) => ({
  handleUserSubmit: (updatedUser: IUser) => {
    // FIXME: only for test purposes
    if (Math.round(Math.random() * 10) <= 1) {
      return Promise.reject('Unexpected error while saving user!');
    }

    return dispatch(saveUserAsync(updatedUser));
  },
});

const ConnectedEditUser = connect(mapState, mapDispatch)(EditUser);

export default ConnectedEditUser;
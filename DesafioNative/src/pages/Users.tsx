import React from 'react';
import {connect} from 'react-redux';

import {ScrollView, View, Button, Dimensions} from 'react-native';

import Header from '../components/Header';
import Table from '../components/Table';

import {useNavigation} from 'react-navigation-hooks';

import {AppState} from '../store';
import {removeUserAsync} from '../store/users/thunks';
import {IUser} from '../store/types';

interface IUsers {
  users: IUser[];
  removeUser: (id: number) => Promise<any>;
}

const Users: React.FC<IUsers> = ({users, removeUser}) => {
  const {width} = Dimensions.get('window');
  const {navigate} = useNavigation();

  const handleNewUser = () => {
    navigate('NewUser');
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
      }}
      contentInsetAdjustmentBehavior="automatic"
      nestedScrollEnabled={true}>
      <Header title="Users List" />

      <Table users={users} removeUser={removeUser} />

      <View
        style={{
          width: width * 0.3,
          backgroundColor: '#ffffff',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: width * 0.05,
        }}>
        <Button title="New User" onPress={handleNewUser} color="#4f5d73" />
      </View>
    </ScrollView>
  );
};

const mapState = (state: AppState) => ({
  users: Object.values(state.users.users.toJS()),
});

const mapDispatch = (dispatch: any) => ({
  removeUser: (id: number) => {
    // FIXME: only for test purposes, drop away from production
    if (Math.round(Math.random() * 10) <= 1) {
      return Promise.reject('Unexpected error while removing user!');
    }
    return dispatch(removeUserAsync(id));
  },
});

const ConnectedUsers = connect(
  mapState,
  mapDispatch,
)(Users);

export default ConnectedUsers;

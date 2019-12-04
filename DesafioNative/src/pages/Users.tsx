import React from 'react';

import {
SafeAreaView,
StyleSheet,
ScrollView,
View,
Text,
StatusBar,
Button,
Dimensions,
} from 'react-native';

import Header from '../components/Header';
import Table from '../components/Table';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks';

const Users : React.FC = () => {
  const {width, height} = Dimensions.get('window');
  const {navigate} = useNavigation();

  const handleNewUser = () => {
    navigate('NewUser');
  };

  return (
    <ScrollView style={{
      backgroundColor: '#ffffff',
      flex: 1,
      //height: height,
      //width: width,
    }}
    contentContainerStyle={{
      // flexGrow: 1,
      // flex: 1,
    }}
    contentInsetAdjustmentBehavior="automatic"
    nestedScrollEnabled={true}
    >

      <Header title='Users List'/>

      <Table />

      <View style={{
        width: width * 0.3,
        backgroundColor: '#ffffff',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: width * 0.05,
      }}>
        <Button title="New User" onPress={handleNewUser}
          color='#4f5d73' />
      </View>

    </ScrollView>
  );
};

export default Users;
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

import {
LearnMoreLinks,
Colors,
DebugInstructions,
ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Header from '../components/Header';
import Table from '../components/Table';

const Users : React.FC = () => {
  const {width} = Dimensions.get('window');

  return (
    <ScrollView style={{
      backgroundColor: '#ffffff',
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
        <Button title="New User" onPress={() => null}
          color='#4f5d73' />
      </View>

    </ScrollView>
  );
};

export default Users;
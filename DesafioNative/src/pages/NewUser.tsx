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

import {
LearnMoreLinks,
Colors,
DebugInstructions,
ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Header from '../components/Header';
import Table from '../components/Table';

import { useNavigation, useNavigationParam } from 'react-navigation-hooks'

const NewUser: React.FC = () => {
  const {width, height} = Dimensions.get('window');

  const { goBack } = useNavigation();

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

    <View style={{
        width: width * 0.7,
        backgroundColor: '#ffffff',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: width * 0.05,
        marginTop: width * 0.05,
        flex: 1,
        flexDirection: 'row',
    }}>
        <View style={{
          width: width * 0.3,
          marginRight: width * 0.025,
        }}>
          <Button title="Register" onPress={handleRegister}
            color='#4f5d73' />
        </View>

        <View style={{
          width: width * 0.3,
          marginLeft: width * 0.025,
        }}>
          <Button title="Cancel" onPress={handleCancel}
            color="#777777"/>
        </View>
    </View>
    </ScrollView>
  );
};

export default NewUser;

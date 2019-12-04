/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

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

import FlexWrapper from './src/components/FlexWrapper';
import Users from './src/pages/Users';
import NewUser from './src/pages/NewUser';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const UsersScreen = FlexWrapper(Users);
const NewUserScreen = FlexWrapper(NewUser);

const MainNavigator = createStackNavigator({
  Users: {screen: UsersScreen, navigationOptions: { title: 'Users List'} },
  NewUser: {screen: NewUserScreen, navigationOptions: { title: 'New User'}},
}, {
  initialRouteName: 'Users',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#4f5d73',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const Content = createAppContainer(MainNavigator);

const App = () => {
  const {width, height} = Dimensions.get('window');

  return (
    <View style={{width, height, flex: 1}}>
      <StatusBar backgroundColor="#282c34" barStyle="light-content" />
      <SafeAreaView style={{
        backgroundColor: '#ffffff',
        flex: 1,
      }}>
        <Content />
      </SafeAreaView>
    </View>
  );
};

export default App;

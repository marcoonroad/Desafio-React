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

import Users from './src/pages/Users';

const App = () => {
  const {width} = Dimensions.get('window');

  return (
    <>
      <StatusBar backgroundColor="#282c34" barStyle="light-content" />
      <SafeAreaView style={{
        backgroundColor: '#ffffff'
      }}>
        <Users />
      </SafeAreaView>
    </>
  );
};

export default App;

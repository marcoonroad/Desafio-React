import React from 'react';
import {View, Dimensions} from 'react-native';

const FlexWrapper : (Component : React.FC) => React.FC = Component => {
  return () => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Component />
      </View>
    );
  };
};

export default FlexWrapper;

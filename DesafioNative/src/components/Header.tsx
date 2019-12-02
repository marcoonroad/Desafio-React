import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

const Header : React.FC = () => {
  const {width} = Dimensions.get('window');

  return (
    <View style={{
      width: width,
      backgroundColor: '#282c34',
    }}>
      <Image
        source={require('../static/circle-icon-profile.png')}
        style={{
          width: width * 0.3,
          height: width * 0.3,
          marginTop: width * 0.05,
       // marginBottom: width * 0.05,
          marginLeft: 'auto',
          marginRight: 'auto',
        }} />
      <View style={{
        marginTop: width * 0.05,
        marginBottom: width * 0.05,
      }}>
        <Text style={{
            color: '#ffffff',
            fontSize: 22,
            textAlign: 'center',
        }}>Users list</Text>
      </View>
    </View>
  );
};

export default Header;

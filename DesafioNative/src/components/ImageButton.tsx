import React from 'react';
import {View, TouchableOpacity, Image, ImageSourcePropType, Dimensions} from 'react-native';

interface IImageButton {
  sourcePath: ImageSourcePropType,
  onPress: () => void,
}

const ImageButton : React.FC<IImageButton> = ({ sourcePath, onPress }) => {
  const {width} = Dimensions.get('window');

  return (
    <View style={{
      width: 16,
      height: 16,
      marginHorizontal: width * 0.01
    }}>
      <TouchableOpacity onPress={onPress} style={{
        width: 16,
        height: 16,
      }}>
        <Image source={sourcePath} style={{
          width: 16,
          height: 16,
          resizeMode: 'center',
        }}/>
      </TouchableOpacity>
    </View>
  );
};

export default ImageButton;
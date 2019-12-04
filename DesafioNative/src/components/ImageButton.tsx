import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';

interface IImageButton {
  sourcePath: ImageSourcePropType;
  onPress: () => void;
  size?: number;
}

const ImageButton: React.FC<IImageButton> = ({sourcePath, onPress, size}) => {
  const {width} = Dimensions.get('window');

  const WIDTH = size || 20;
  const HEIGHT = size || 20;

  return (
    <View
      style={{
        width: WIDTH,
        height: HEIGHT,
        marginHorizontal: width * 0.02,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: WIDTH,
          height: HEIGHT,
        }}>
        <Image
          source={sourcePath}
          style={{
            width: WIDTH,
            height: HEIGHT,
            resizeMode: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ImageButton;

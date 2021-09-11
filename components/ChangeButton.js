import React from 'react';
import {TouchableOpacity, View, Dimensions} from 'react-native';

function ChangeButton({onPress, style}) {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        height: Dimensions.get('window').height - 100,
        width: Dimensions.get('window').width / 2,
        zIndex: 1000,
        ...style,
      }}
      onPress={onPress}>
      <View
        style={{
          position: 'absolute',
          height: Dimensions.get('window').height - 100,
          width: Dimensions.get('window').width / 2,
          zIndex: 1000,
          ...style,
        }}></View>
    </TouchableOpacity>
  );
}

export default ChangeButton;

import React from 'react';
import {
  Modal,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';

import close from '../src/icons/close.png';

function ShowStory({storyModal, appData, setStoryModal}) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {
        setStoryModal(false);
      }}
      visible={storyModal}>
      {console.log(appData)}
      <View
        style={{
          position: 'relative',
        }}>
        <TouchableOpacity
          onPress={() => setStoryModal(false)}
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 100,
          }}>
          <Image
            source={close}
            style={{height: 24, width: 24, tintColor: '#FFF'}}
          />
        </TouchableOpacity>
        <Image
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          }}
          source={{uri: appData.uri}}
        />

        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.55)',
            height: 50,
            width: Dimensions.get('window').width,
            position: 'absolute',
            bottom: '10%',
            paddingHorizontal: 20,
            fontSize: 32,
          }}>
          <Text style={{textAlign: 'center', fontWeight: '600', fontSize: 32}}>
            {appData.caption}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

export default ShowStory;

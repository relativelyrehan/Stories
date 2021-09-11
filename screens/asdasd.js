import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import send from '../src/icons/send.png';
import close from '../src/icons/close.png';
import Video from 'react-native-video';

function Story() {
  return (
    <View style={styles.modalContainer}>
      {1 > 0.02 ? (
        <Image style={styles.modalImage} source={{uri: val[0]?.uri}} />
      ) : (
        <View
          style={{
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Video
            style={{minHeight: 500, width: 500}}
            repeat={true}
            source={{uri: val[0]?.uri}}
          />
        </View>
      )}
      <TouchableOpacity onPress={() => setPickModal(!pickModal)}>
        <Image style={styles.closeIcon} source={close} />
      </TouchableOpacity>
      <View style={styles.modalInputContainer}>
        <TextInput
          placeholderText={'Describe your story'}
          val={storyData.caption}
          onChangeText={event =>
            setStoryData({...storyData, caption: event, uri: val[0].uri})
          }
          style={styles.modalInput}
          placeholder="add to your story"
        />
        <TouchableOpacity onPress={handleStoryUpload}>
          <Image style={styles.sendIcon} source={send} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    position: 'relative',
  },
  modalImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    zIndex: -100,
  },
  modalInputContainer: {
    position: 'absolute',
    top: '60%',
  },
  modalInput: {
    width: Dimensions.get('screen').width,
    height: 50,
    backgroundColor: 'rgba(240, 240, 240, 0.4)',
    fontSize: 20,
    fontWeight: '700',
  },
  closeIcon: {
    marginLeft: 12,
    marginTop: 12,
    height: 36,
    width: 36,
    tintColor: '#FFF',
  },
  sendIcon: {
    position: 'absolute',
    top: -45,
    right: 10,
    height: 40,
    width: 40,
  },
});

export default Story;

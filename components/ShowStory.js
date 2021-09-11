import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import Video from 'react-native-video';

import close from '../src/icons/close.png';
import ChangeButton from './ChangeButton';

function ShowStory({storyModal, appData, setStoryModal, index}) {
  const [data, setData] = useState();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (appData[index + counter] !== undefined) {
      setData(appData[index + counter]);
    }
  }, [counter]);
  // const data = appData[index];
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
        {/* -- Click to change --*/}
        <ChangeButton
          onPress={() => {
            if (counter > 0) {
              setCounter(counter - 1);
            } else if (index > 0) {
              setCounter(counter - 1);
            } else if (index === 0) return;
          }}
          style={{top: 100, left: 0}}
        />
        <ChangeButton
          onPress={() => {
            if (counter < appData.length - 1) {
              setCounter(counter + 1);
            }
          }}
          style={{top: 0, right: 0}}
        />
        {/* ---------- */}
        {data?.uri.includes('video') ? (
          <View
            style={{
              height: Dimensions.get('screen').height,
              width: Dimensions.get('screen').width,
            }}>
            <Video
              onEnd={() => setStoryModal(false)}
              style={{
                minHeight: 650,
                width: 500,
              }}
              repeat={true}
              source={{uri: data?.uri}}
            />
          </View>
        ) : (
          <Image
            style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
            source={{uri: data?.uri}}
          />
        )}
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
            {data?.caption}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

export default ShowStory;

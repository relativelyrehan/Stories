import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import send from '../src/icons/send.png';
import close from '../src/icons/close.png';
import add from '../src/icons/add.png';
import camera from '../src/icons/camera.png';
import Post from '../components/Post';
import ShowStory from '../components/ShowStory';
import Video from 'react-native-video';

export default function Story() {
  const [val, setVal] = useState([]);
  const [isVideo, setVideo] = useState(false);
  const [storyModal, setStoryModal] = useState(false);
  const [appData, setAppData] = useState([]);
  const [index, setIndex] = useState();
  const [storyData, setStoryData] = useState({
    uri: '',
    caption: '',
  });
  const [pickModal, setPickModal] = useState(false);
  const pickImage = () => {
    launchImageLibrary(
      {
        title: 'You can choose one image',
        mediaType: 'mixed',
        selectionLimit: 1,
      },
      res => {
        if (res.didCancel) {
          return;
        } else {
          console.log('I am asset -->>', res.assets);
          setVal([...val, res.assets[0]]);
          setVideo(res.assets[0].duration > 0);
          setPickModal(!pickModal);
        }
      },
    );
  };

  const pickFromCamera = () => {
    launchCamera(
      {
        title: 'You can choose one image',
        mediaType: 'photo',
        selectionLimit: 1,
      },
      res => {
        if (res.didCancel) {
          return;
        } else {
          console.log('I am response', res);
          setVal([...val, res.assets[0]]);
          setVideo(res.assets[0].duration > 0);
          setPickModal(!pickModal);
        }
      },
    );
  };

  const handleStoryUpload = () => {
    setVal([]);
    setAppData([...appData, storyData]);
    setPickModal(false);
  };

  // video:28

  return (
    <ScrollView style={styles.layout}>
      <View style={styles.header}>
        <Text style={styles.heading}>Stories</Text>
      </View>
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.rowContainer}>
          <TouchableOpacity onPress={() => pickImage()}>
            <Image source={add} style={{...styles.profile, margin: 6}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickFromCamera()}>
            <Image source={camera} style={{...styles.profile, margin: 6}} />
          </TouchableOpacity>
          {appData.map((value, key) => {
            return (
              <View key={key}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    setStoryModal(true);
                    setIndex(key);
                  }}>
                  {console.log('key', key)}
                  <View
                    style={{
                      backgroundColor: '#A12568',
                      padding: 3,
                      margin: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 1000,
                    }}>
                    <Image
                      source={{
                        uri: `https://source.unsplash.com/1600x900/?girl?id=${
                          key * 3
                        }`,
                      }}
                      style={styles.profile}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}

          {storyModal && (
            <ShowStory
              storyModal={storyModal}
              appData={appData}
              setStoryModal={setStoryModal}
              index={index}
            />
          )}
        </ScrollView>
      </View>
      <Post />
      <Post />
      <Modal
        animationType="slide"
        onRequestClose={() => {
          setPickModal(false);
        }}
        visible={pickModal}>
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
              placeholderTextColor={'#B4B4B4'}
              val={storyData.caption}
              onChangeText={event =>
                setStoryData({...storyData, caption: event, uri: val[0].uri})
              }
              style={styles.modalInput}
              placeholder="add to your story"
            />
            <TouchableOpacity
              style={styles.sendIcon}
              onPress={handleStoryUpload}>
              <Image
                style={{height: 36, width: 36, tintColor: '#FFF'}}
                source={send}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    fontSize: 24,
    fontWeight: '700',
    paddingLeft: 15,
    color: '#FFF',
  },
  closeIcon: {
    marginLeft: 16,
    marginTop: 16,
    height: 30,
    width: 30,
    tintColor: '#FFF',
  },
  sendIcon: {
    position: 'absolute',
    top: 7,
    right: 15,
    height: 40,
    width: 40,
    zIndex: 100,
  },

  container: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },

  profile: {
    height: 60,
    width: 60,
    borderRadius: 1000,
  },

  rowContainer: {
    flexDirection: 'row',
    maxWidth: Dimensions.get('window').width,
    overflow: 'scroll',
  },
  header: {
    width: '100%',
    paddingVertical: 4,
    elevation: 1,
  },
  heading: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#112031',
    fontSize: 32,
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: '#FFF',
  },
  buttons: {
    position: 'absolute',
    bottom: 16,
    right: 8,
  },
});

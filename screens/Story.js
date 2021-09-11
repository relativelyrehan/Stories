import React, {useState, useEffect} from 'react';
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
import ImagePicker, {
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
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
        <View
          style={{
            position: 'relative',
          }}>
          <TouchableOpacity
            onPress={() => setPickModal(!pickModal)}
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
          {isVideo ? (
            <View
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}>
              <Video
                style={{
                  height: Dimensions.get('window').height,
                  width: Dimensions.get('window').width,
                }}
                source={{uri: val[0]?.uri}}
              />
            </View>
          ) : (
            <Image
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
              source={{uri: val[0]?.uri}}
            />
          )}

          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              height: 50,
              width: Dimensions.get('window').width,
              position: 'absolute',
              bottom: '50%',
              paddingHorizontal: 20,
              fontSize: 32,
            }}>
            <TextInput
              val={storyData.caption}
              onChangeText={event =>
                setStoryData({...storyData, caption: event, uri: val[0].uri})
              }
              style={{fontSize: 24}}
              placeholder="add to your story"
            />
            <TouchableOpacity
              onPress={handleStoryUpload}
              style={styles.buttons}>
              <Image style={{...styles.icon}} source={send} />
            </TouchableOpacity>
            {console.log('--', appData)}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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

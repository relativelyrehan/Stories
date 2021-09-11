import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import metro from '../src/images/metro.jpeg';

function Post() {
  return (
    <View>
      <View style={{...styles.rowContainer, margin: 10}}>
        <Image
          source={{uri: 'https://source.unsplash.com/random'}}
          style={{...styles.profile, height: 40, width: 40}}
        />
        <View>
          <Text style={{fontSize: 14, lineHeight: 20, fontWeight: '800'}}>
            dmrc__metro
          </Text>
          <Text style={{fontSize: 14, lineHeight: 20, color: '#0b0b0c'}}>
            1d ago
          </Text>
        </View>
      </View>
      <Image
        style={{width: Dimensions.get('window').width, height: 300}}
        source={{uri: 'https://source.unsplash.com/random/?nature?id=3'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    height: 60,
    width: 60,
    borderRadius: 1000,
    marginRight: 8,
  },
  rowContainer: {
    flexDirection: 'row',
  },
});

export default Post;

import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

function StoryContainer({onPress, val}) {
  return (
    <View style={styles.storyContainer}>
      {val.map(() => {
        return (
          <TouchableOpacity onPress={onPress}>
            <Image
              source={{uri: 'https://source.unsplash.com/random'}}
              style={styles.profile}
            />
          </TouchableOpacity>
        );
      })}
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

  storyContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
});

export default StoryContainer;

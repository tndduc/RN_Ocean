import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Easing,
} from 'react-native';
import Video from 'react-native-video';
// import { VideoModel } from './videosData';
import { VideoModel } from '../data/postdata';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils';

// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function VideoItem({
  data,
  isActive,
}: {
  data: VideoModel;
  isActive: boolean;
}) {
  const { uri, caption, channelName, musicName, likes, comments, avatarUri } =
    data;
  const avatarDefault = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
  function setIsActive() {
    isActive = false
  }
  const bottomTabHeight = useBottomTabBarHeight();
  // const statusBarHeight = StatusBar.currentHeight || 0;
  return (
    <View
      style={[
        styles.container,
        { height: WINDOW_HEIGHT - bottomTabHeight },
      ]}
    >
      <StatusBar barStyle={'light-content'} />


      <Video

        source={{ uri }}
        style={styles.video}
        resizeMode="cover"
        paused={!isActive}
        repeat
      />


      <View style={styles.bottomSection}>
        <View style={styles.bottomLeftSection}>
          <Text style={styles.channelName}>{channelName}</Text>
          <Text style={styles.caption}>{caption}</Text>

        </View>
        <View style={styles.bottomRightSection}>
          <Animated.Image
            source={require('../assets/images/floating-music-note.png')}
            style={[styles.floatingMusicNote]}
          />
          <Animated.Image
            source={require('../assets/images/floating-music-note.png')}
            style={[styles.floatingMusicNote]}
          />
          <Animated.Image
            source={require('../assets/images/disc.png')}
            style={[styles.musicDisc]}
          />
        </View>
      </View>

      <View style={styles.verticalBar}>
        <View style={[styles.verticalBarItem, styles.avatarContainer]}>
          {avatarUri ? (
            <Image style={styles.avatar} source={{ uri: avatarUri }} />
          ) : (
            <Image style={styles.avatar} source={{ uri: avatarDefault }} />
          )}

          <View style={styles.followButton}>
            <Image
              source={require('../assets/images/plus-button.png')}
              style={styles.followIcon}
            />
          </View>
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require('../assets/images/heart.png')}
          />
          <Text style={styles.verticalBarText}>{likes}</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require('../assets/images/message-circle.png')}
          />
          <Text style={styles.verticalBarText}>{comments}</Text>
        </View>
        <View style={styles.verticalBarItem}>
          <Image
            style={styles.verticalBarIcon}
            source={require('../assets/images/reply.png')}
          />
          <Text style={styles.verticalBarText}>Share</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomLeftSection: {
    flex: 4,
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  channelName: {
    color: 'white',
    fontWeight: 'bold',
  },
  caption: {
    color: 'white',
    marginVertical: 8,
  },
  musicNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicNameIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  musicName: {
    color: 'white',
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
  verticalBar: {
    position: 'absolute',
    right: 8,
    bottom: 72,
  },
  verticalBarItem: {
    marginBottom: 24,
    alignItems: 'center',
  },
  verticalBarIcon: {
    width: 32,
    height: 32,
  },
  verticalBarText: {
    color: 'white',
    marginTop: 4,
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  followButton: {
    position: 'absolute',
    bottom: -8,
  },
  followIcon: {
    width: 21,
    height: 21,
  },
  floatingMusicNote: {
    position: 'absolute',
    right: 40,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: 'white',
  },
});

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '../authentication/AuthContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CommentView from './CommentView';
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
  FlatList,
} from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';
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
  const { id, uri, caption, channelName, avatarUri } =
    data;
  const avatarDefault = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
  function setIsActive() {
    isActive = false
  }
  const [user, setUser]: any = useAuth()
  const [textComment, setTextComment] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const bottomTabHeight = useBottomTabBarHeight();
  const [comments, setComments] = useState();

  const closeComment = () => {
    setModalVisible(false);
    console.log("Close");
  }


  const opentComment = () => {
    console.log("Begin opent cmt list")
    console.log(user.token.accessToken);
    console.log("id: " + id);;
    setModalVisible(true);
    axios({
      method: "GET",
      url: "https://ocean-apis.onrender.com/api/comment?postId=" + id,
      headers: {
        Accept: '*/*',
        Authorization: 'Bearer ' + user.token.accessToken,
        'Content-Type': 'application/json',
      },

    }).then((res) => {
      console.log("cmt ss")
      console.log(res.data);
      setComments(res.data);
    }).catch((e) => {

      console.log(e.message);
    }).finally(() => {
    });

  };
  const handleSendCmt = () => {
    console.log("Begin cmt")
    console.log(user.token.accessToken);
    console.log("text: " + textComment);
    console.log("id: " + id);;

    axios({
      method: "POST",
      url: "https://ocean-apis.onrender.com/api/comment",
      headers: {
        Accept: '*/*',
        Authorization: 'Bearer ' + user.token.accessToken,
        'Content-Type': 'application/json',
      },
      data: {
        content: textComment,
        post: id,
        parentComment: 0,
      },
    }).then((res) => {
      console.log("cmt ss")
      console.log(res.data);
    }).catch((e) => {
      console.log(e.message);
    }).finally(() => {
    });
  };
  const CommentView = (data: any) => {
    if (!data || !data.items || data.items.length === 0) {
      return (
        <Text>No comments available</Text>
      );
    }
    return (
      <View style={styles.container}>

        <FlatList
          data={data.items} // Assuming 'comments' is an object with an 'items' property
          keyExtractor={(comment) => comment.id.toString()}
          renderItem={({ item }) => (
            <View >
              <Text style={{ color: 'black', }}>
                {item.user.fullName}
              </Text>
              <Text style={{ color: 'black', }}>{item.content}</Text>
            </View>
          )}
        />

      </View>
    );
  };
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



        </View>
        <View style={styles.verticalBarItem}>
          <TouchableOpacity onPress={() => opentComment()}>
            <Image
              style={styles.verticalBarIcon}
              source={require('../assets/images/message-circle.png')}
            />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeComment}
        >
          {/* Render your Login component as a modal */}
          <View style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
            <TouchableOpacity onPress={closeComment} style={{ width: '100%', height: '40%' }}>
            </TouchableOpacity>
            <View style={{ width: '100%', height: '60%', backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
              {
                CommentView(comments)
              }
              <View style={{
                flexDirection: 'row', width: '100%', margin: 10, height: 45,
                position: 'absolute',
                bottom: 0,
              }}>
                <TextInput
                  style={{ width: '70%', marginHorizontal: 10, borderWidth: 2, borderColor: 'black', borderRadius: 10 }}
                  value={textComment}
                  onChangeText={setTextComment}
                />
                <View style={{ margin: 5, }}>
                  <Button title='Send |>' onPress={handleSendCmt} />
                </View>
              </View>
            </View>

          </View>
        </Modal >

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
  verticalBar: {
    position: 'absolute',
    right: 0,
    bottom: '30%',
    backgroundColor: 'rgba(255,255,255, 0.2);',
    padding: 5,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
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

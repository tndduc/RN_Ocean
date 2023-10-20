import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import axios from 'axios';
import {
    createBottomTabNavigator,
    useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import VideoPlayer from '../views/VideoPlayer';
import { WINDOW_HEIGHT } from '../utils';
import { VideoModel } from '../data/postdata';
const BottomTab = createBottomTabNavigator();
const HomeScreen = () => {
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [videoList, setvideoList] = useState();
    const bottomTabHeight = useBottomTabBarHeight();

    const getVideoData = async () => {
        axios.get('https://ocean-apis.onrender.com/api/post')
            .then(response => {
                const apiData = response.data.items;

                const videoData = apiData.map((item: any) => ({
                    id: item.id,
                    channelName: item.creator.fullName,
                    uri: item.url[0],
                    caption: item.title,
                    musicName: '',
                    likes: 0,
                    comments: 0,
                    avatarUri: item.creator.picture,
                }));
                videoData.sort((a: VideoModel, b: VideoModel) => b.id - a.id);
                setvideoList(videoData);
                console.log(videoData);
            })
            .catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        getVideoData(); // Gọi hàm khi component được mount
    }, []);
    return (
        <FlatList
            data={videoList}

            renderItem={({ item, index }) => (
                <VideoPlayer data={item} isActive={activeVideoIndex === index} />
            )}
            onScroll={e => {
                const index = Math.round(
                    e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - bottomTabHeight),
                );
                setActiveVideoIndex(index);
            }}
        />
    );
};
export default HomeScreen;
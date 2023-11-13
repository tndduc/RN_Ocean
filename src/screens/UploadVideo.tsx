import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import Video from 'react-native-video';
import { Camera } from 'react-native-vision-camera';
import { useAuth } from '../authentication/AuthContext';

const UploadVideoScreen = () => {
    const [selectedVideo, setSelectedVideo] = useState<DocumentPickerResponse | any>();
    const [title, setTitle] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser]: any = useAuth()
    const pickVideo = async () => {
        try {
            const res: any = await DocumentPicker.pick({
                type: [DocumentPicker.types.video],
            });
            setSelectedVideo(res);
            setIsModalVisible(true);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, handle accordingly
            } else {
                // Handle other errors
            }
        }
    };



    const uploadVideo = async () => {
        if (!selectedVideo) {
            return; // No video selected, handle this case as needed
        }

        const video = selectedVideo[0];
        const endpoint = 'https://ocean-apis.onrender.com/api/post';
        const authorizationHeader = 'Bearer ' + user.token.accessToken;

        // Create a FormData object and append data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', {
            uri: video.uri,
            type: video.type,
            name: video.name,
        });

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': authorizationHeader,
                },
            });

            if (response.ok) {
                // Handle successful upload response
                const result = await response.json();
                console.log('Upload successful:', result);
            } else {
                // Handle upload error
                console.error('Upload failed:', response.status, response.statusText);
            }
        } catch (err) {
            // Handle network or other errors
            console.error('Error:', err);
        }
    };

    return (
        <View>

            <View style={{ width: '100%', height: 570, marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                </View>
                {selectedVideo && (
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={isModalVisible}
                        >
                            <Video
                                source={{ uri: selectedVideo[0].uri }}
                                style={{ flex: 1 }}
                                controls={true}
                            />
                            <Text style={{ color: 'black', marginHorizontal: 20 }}>Tiêu đề : </Text>
                            <TextInput
                                placeholder="nhập tiêu đề"
                                placeholderTextColor="#000"
                                value={title}
                                onChangeText={setTitle}
                                style={{
                                    marginHorizontal: 20,
                                    marginVertical: 5,
                                    color: '#333',
                                    backgroundColor: 'white',
                                }}
                            />
                            {/* <Text style={{ color: 'black', marginHorizontal: 10 }}>Selected video: {selectedVideo[0].name}</Text> */}
                            <Button title="Upload" onPress={uploadVideo} color={'green'} />
                            <Button title="Close" onPress={() => setIsModalVisible(false)} />
                        </Modal>
                    </View>
                )}
            </View>

            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 20, paddingBottom: 0, }}>
                <View style={{ width: 100, height: 60 }}>
                    <Button title="Pick Video" onPress={pickVideo} color={'black'} />
                </View>

            </View>
        </View>
    );
};

export default UploadVideoScreen;

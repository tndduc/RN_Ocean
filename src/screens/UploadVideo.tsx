import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import Video from 'react-native-video';

const UploadVideoScreen = () => {
    const [selectedVideo, setSelectedVideo] = useState<DocumentPickerResponse | any>();
    const [title, setTitle] = useState('');

    const pickVideo = async () => {
        try {
            const res: any = await DocumentPicker.pick({
                type: [DocumentPicker.types.video],
            });
            setSelectedVideo(res);
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
        const authorizationHeader = 'Bearer 6a4b3a2c43c923591286b89888015e84e11221f4f86a87ef8552238f1c525438de70f196ec12ceb3bf1c69a50ff404fdcda91b3dd952d46b64db5d0f3a6deb1d92b2bd213fe78e5862814f0276ceb5a2484da4d876e83b3c5d7c200f1b8bdcf4b312a0327a42e045f0';

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
            <View style={{ width: '100%', height: 570, marginBottom: 20 }}>
                {selectedVideo && (
                    <View >
                        <Video
                            source={{ uri: selectedVideo[0].uri }}
                            style={{ width: '100%', height: 570, justifyContent: 'center', alignItems: 'center' }}
                            controls={true}
                        />
                        <Text style={{ color: 'black', marginHorizontal: 10 }}>Selected video: {selectedVideo[0].name}</Text>
                    </View>
                )}
            </View>

            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 20, paddingBottom: 0, }}>
                <View style={{ width: 100, height: 60 }}>
                    <Button title="Pick Video" onPress={pickVideo} color={'black'} />
                </View>
                <View style={{ width: 80, height: 60 }}>
                    {selectedVideo && (
                        <View >
                            <Button title="Upload" onPress={uploadVideo} color={'green'} />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default UploadVideoScreen;

import axios from 'axios';

export interface VideoModel {
  id: number;
  channelName: string;
  uri: string;
  caption: string;
  musicName: string;
  likes: number;
  comments: number;
  avatarUri: string;
  id_user: number;
}

// const getVideoData = async () => {
//   const response = await axios.get('https://ocean-apis.onrender.com/api/post');
//   const apiData = response.data.items;
//   // Create the video data array
//   const videoData: VideoModel[] = apiData.map((item: any) => ({
//     id: item.id,
//     channelName: item.creator.fullName,
//     uri: item.url[0],
//     caption: item.title,
//     musicName: '',
//     likes: 0,
//     comments: 0,
//     avatarUri: item.creator.picture,
//   }));
//   videoData.sort((a, b) => b.id - a.id);
//   return videoData;
// };

// export default getVideoData();
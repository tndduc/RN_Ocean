import * as firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDyRZoEjdm_eozJctN5-SGKFzlRgmk1bvk",
    authDomain: "cloud-4b240.firebaseapp.com",
    projectId: "cloud-4b240",
    storageBucket: "cloud-4b240.appspot.com",
    messagingSenderId: "997675344595",
    appId: "1:997675344595:web:011987f2b145a40df72a26"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;

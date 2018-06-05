## Pre-packaged APK files
[Ionic Angular client](https://firebasestorage.googleapis.com/v0/b/letsconnect-835cf.appspot.com/o/LetsConnect.apk?alt=media&token=9e63f89e-5f63-45a4-a706-a70da85251ba)

[Android Viewer client](https://firebasestorage.googleapis.com/v0/b/letsconnect-835cf.appspot.com/o/LetsConnectViewer.apk?alt=media&token=2ff3712f-676a-4e9d-8ec0-61b695b9625a) - [Source](https://github.com/theslof/LetsConnectViewer)

## Setup

* npm install
 
## Firebase
Create the file `src/lib/firebaseConfig.ts` and fill it with the following data:
```
export const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
};
```
Fill out the variables according to your Firebase project.

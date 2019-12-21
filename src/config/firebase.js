import firebase from 'firebase'
const config = {
    apiKey: process.env.REACT_APP_Firebase_apiKey,
    authDomain: process.env.REACT_APP_Firebase_authDomain,
    databaseURL: process.env.REACT_APP_Firebase_databaseURL,
    projectId:process.env.REACT_APP_Firebase_projectId,
    storageBucket: process.env.REACT_APP_Firebase_storageBucket,
    messagingSenderId: process.env.REACT_APP_Firebase_messagingSenderId,
    APPId: process.env.REACT_APP_Firebase_APPId,
    measurementId: process.env.REACT_APP_Firebase_measurementId
  };
   const fire=firebase.initializeApp(config);
   export default fire;

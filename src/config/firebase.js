import firebase from 'firebase'
/*const config = {
    apiKey: process.env.React_App_Firebase_apiKey,
    authDomain: process.env.React_App_Firebase_authDomain,
    databaseURL: process.env.React_App_Firebase_databaseURL,
    projectId:process.env.React_App_Firebase_projectId,
    storageBucket: process.env.React_App_Firebase_storageBucket,
    messagingSenderId: process.env.React_App_Firebase_messagingSenderId,
    appId: process.env.React_App_Firebase_appId,
    measurementId: process.env.React_App_Firebase_measurementId
  };*/
  const config = {
    apiKey: "AIzaSyDn0dCL3Ey1r4GFEJaTB0eT0wdR6Rcna1U",
    authDomain: "fundoonotes-c21bb.firebaseapp.com",
    databaseURL: "https://fundoonotes-c21bb.firebaseio.com",
    projectId: "fundoonotes-c21bb",
    storageBucket: "fundoonotes-c21bb.appspot.com",
    messagingSenderId: "780516019049",
    appId: "1:780516019049:web:69d1cbbb70ec2780d3cbf8",
    measurementId: "G-569Z7L381S"
  };
  const fire=firebase.initializeApp(config);
  export default fire;

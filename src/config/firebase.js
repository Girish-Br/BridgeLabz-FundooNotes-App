import firebase from 'firebase'
/*const config = {
    apiKey: process.env.REACT_APP_Firebase_apiKey,
    authDomain: process.env.REACT_APP_Firebase_authDomain,
    databaseURL: process.env.REACT_APP_Firebase_databaseURL,
    projectId:process.env.REACT_APP_Firebase_projectId,
    storageBucket: process.env.REACT_APP_Firebase_storageBucket,
    messagingSenderId: process.env.REACT_APP_Firebase_messagingSenderId,
    APPId: process.env.REACT_APP_Firebase_APPId,
    measurementId: process.env.REACT_APP_Firebase_measurementId
  };*/
 const config = {
    apiKey: "AIzaSyDn0dCL3Ey1r4GFEJaTB0eT0wdR6Rcna1U",
    authDomain: "fundoonotes-c21bb.firebaseAPP.com",
    databaseURL: "https://fundoonotes-c21bb.firebaseio.com",
    projectId: "fundoonotes-c21bb",
    storageBucket: "fundoonotes-c21bb.APPspot.com",
    messagingSenderId: "780516019049",
    APPId: "1:780516019049:web:69d1cbbb70ec2780d3cbf8",
    measurementId: "G-569Z7L381S"
  };
  const fire=firebase.initializeApp(config);
  export default fire;

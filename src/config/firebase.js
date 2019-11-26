import fire from 'firebase'
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
  class firebase{
      constructor(){
          fire.initializeApp(config);
          this.auth=fire.auth();
          this.db=fire.firestore();
  }
async login(email,password){
    await this.auth.signInWithEmailAndPassword(email,password)
    return  ( this.db.collection('user').add({
        email:email,
        password:password
      })
      .then(response => {
        console.log('logged in')
      })
    )
}
async register(firstname,lastname,email,password){
    await this.auth.createUserWithEmailAndPassword(email,password)
    
    return ( this.db.collection('user').add({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password
      })
      .then(response => {
        console.log('Registered')
      })
     )
}
}
export default new firebase();

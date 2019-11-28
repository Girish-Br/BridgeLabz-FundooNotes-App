import firebase from 'firebase'
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
  /*class firebase{
      constructor(){
          
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
async register(user,res){
    await this.auth.createUserWithEmailAndPassword(user.email,user.password)
        return ( this.db.collection('user').add({
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        password:user.password
      })
    
      .catch(response=>{console.log('not registered')})
     )
}
}
export default new firebase();*/

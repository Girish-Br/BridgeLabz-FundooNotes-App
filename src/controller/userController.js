import authServices from '../services/userServices';
import fire from '../config/firebase'
import firebase from 'firebase'
import axios from 'axios'
const db=fire.firestore();
export async function register (req){
    try{
    await firebase.auth().createUserWithEmailAndPassword(req.email, req.password)
          db.collection('user').doc(firebase.auth().currentUser.uid).set({
          firstname: ""+req.firstname,
          lastname: ""+req.lastname
        })
        firebase.auth().currentUser.sendEmailVerification()
        return 'success';
      }
      catch(error) {
        console.log(error)
        return error.message
      }
  }
  export async function login(req){
      try{
   await fire.auth().signInWithEmailAndPassword(req.email, req.password)
   return 'success';
      }
    catch(error){
      console.log(error);
      return error.message;
    }
}
export function  forgotPwd(user,res){
        var data = {
            email: user.email,
        }
        return axios.post(authServices.forgotPwd, data).then(response => {
            console.log("response--" + JSON.stringify(response));
            if (response.status === 200) {
                console.log("key mailed")
            }
        })
            .catch(error => {
                console.log("forgot pwd failed", error);
            })
    }
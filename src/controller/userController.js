/******************************************************************************
 *  @Purpose        : to build complete fundooNotes App
 *  @file           : userController.js
 *  @author         : GIRISH B R
 *  @since          : 27-11-2019
 *******************************************************************************/
import authServices from '../services/userServices';
import fire from '../config/firebase'
import jwt from 'jsonwebtoken';
import firebase from 'firebase'
import axios from 'axios'
import { EventEmitter } from 'events';
const db=fire.firestore();
//async function
export async function register (req){
    try{
      const data={
        email:req.email,
        password:req.password,
        firstname:req.firstname,
        lastname:req.lastname
      }
    await firebase.auth().createUserWithEmailAndPassword(req.email, req.password)
          db.collection('user').doc(firebase.auth().currentUser.uid).set(data)
        const emitter=new EventEmitter();
        function emailVerification() {
          firebase.auth().currentUser.sendEmailVerification()
        }
       emitter.on('email verification',emailVerification);
       emitter.emit('email verification');
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
   var userData = db.collection("users").doc(firebase.auth().currentUser.uid)
   await userData.get().then(function (doc) {
     const payload = {
       email: firebase.auth().currentUser.email,
       first_name: doc.data().first_name,
       last_name: doc.data().last_name
     }
     let token = jwt.sign(payload, firebase.auth().currentUser.uid, {
       expiresIn: 1440
     })
     localStorage.setItem('usertoken', token)
   })
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
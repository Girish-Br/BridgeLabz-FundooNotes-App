/******************************************************************************
 *  @Purpose        : to build complete fundooNotes App
 *  @file           : userController.js
 *  @author         : GIRISH B R
 *  @since          : 27-11-2019
 *******************************************************************************/
import fire from '../config/firebase'
import serviceConstant from '../const.js'
import jwt from 'jsonwebtoken';
import { EventEmitter } from 'events';
import servicesConstant from '../const.js';
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
    await serviceConstant.firebaseAuthorization.createUserWithEmailAndPassword(req.email, req.password)
          servicesConstant.firestore.collection('user').doc(serviceConstant.firebaseAuthorization.currentUser.uid).set(data)
        const emitter=new EventEmitter();
        function emailVerification() {
          serviceConstant.firebaseAuthorization.currentUser.sendEmailVerification()
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
   await serviceConstant.firebaseAuthorization.signInWithEmailAndPassword(req.email, req.password)
   var userData = db.collection("users").doc(serviceConstant.firebaseAuthorization.currentUser.uid)
   await userData.get().then(function (doc) {
     const payload = {
       email: serviceConstant.firebaseAuthorization.currentUser.email,
       first_name: doc.data().first_name,
       last_name: doc.data().last_name
     }
     let token = jwt.sign(payload, serviceConstant.firebaseAuthorization.currentUser.uid, {
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
/*export function  forgotPwd(user,res){
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
    }*/
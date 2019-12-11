/******************************************************************************
 *  @Purpose        : to build complete fundooNotes App
 *  @file           : userController.js
 *  @author         : GIRISH B R
 *  @since          : 27-11-2019
 *******************************************************************************/
import jwt from 'jsonwebtoken';
import { EventEmitter } from 'events';
import servicesConstant from '../const.js';
/*
* @Purpose :Register the validated user details
*/
export async function register(req) {
  try {
    const data = {
      email: req.email,
      password: req.password,
      firstname: req.firstname,
      lastname: req.lastname
    }
const details=await servicesConstant.firebaseAuthorization.createUserWithEmailAndPassword(req.email, data.password)
 servicesConstant.firestore.collection('user').doc(details.user.uid).set(data)
 const emitter = new EventEmitter();
    function emailVerification() {
      servicesConstant.firebaseAuthorization.currentUser.sendEmailVerification()
    }
    emitter.on('email verification', emailVerification);
    const result=emitter.emit('email verification');
    return result;
  }
  catch (error) {
    console.log(error)
    return error.message
  }
}
export async function login(req){
  try {
    let loginDetails = await servicesConstant.firebaseAuthorization.signInWithEmailAndPassword(req.email, req.password);
   
    let data = await servicesConstant.firestore.collection("user").doc(loginDetails.user.uid)
   console.log(data)
  await data.get().then(function (doc) {
      const payload = {
        email: servicesConstant.firebaseAuthorization.currentUser.email,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname
      }
      let token = jwt.sign(payload, servicesConstant.firebaseAuthorization.currentUser.uid, {
        expiresIn: 1440
      })
      localStorage.setItem('usertoken', token)
      //console.log(JSON.stringify(userData))
     
    })
    return loginDetails
  }
  catch (error) {
    console.log(error);
    return error.message;
  }
}
/*
* @Purpose :Sending the reset password link to the mail
*/
export async function forgotpassword(email) {
  try {
    await servicesConstant.firebaseAuthorization.sendPasswordResetEmail(email)
    return 'success';
  }
  catch (error) {
    console.log(error)
    return error.message;
  }
}
/*
* @Purpose :Sign out of the user
*/
export async function logout(){
 try{
  await servicesConstant.firebaseAuthorization.signOut();
  localStorage.removeItem('usertoken')
  }
  catch(err){
    console.log(err);
  }
}
export async function CreateNote(notes) {
  try {
   await servicesConstant.firestore.collection('notes').doc().set(notes)
    return 'success';
  }
  catch (error) {
    console.log(error)
    return error.message;
  }
}
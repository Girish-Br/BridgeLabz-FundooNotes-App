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
const db = fire.firestore();
//async function
export async function register(req) {
  try {
    const data = {
      email: req.email,
      password: req.password,
      firstname: req.firstname,
      lastname: req.lastname
    }
    await serviceConstant.firebaseAuthorization.createUserWithEmailAndPassword(req.email, req.password)
    serviceConstant.firestore.collection('user').doc(serviceConstant.firebaseAuthorization.currentUser.uid).set(data)
    const emitter = new EventEmitter();
    function emailVerification() {
      serviceConstant.firebaseAuthorization.currentUser.sendEmailVerification()
    }
    emitter.on('email verification', emailVerification);
    emitter.emit('email verification');
    return 'success';
  }
  catch (error) {
    console.log(error)
    return error.message
  }
}
export async function login(req) {
  try {
    await serviceConstant.firebaseAuthorization.signInWithEmailAndPassword(req.email, req.password)
    var userData = db.collection("user").doc(serviceConstant.firebaseAuthorization.currentUser.uid)
    await userData.get().then(function (doc) {
      console.log(doc.data())
      const payload = {
        email: serviceConstant.firebaseAuthorization.currentUser.email,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname
      }
      let token = jwt.sign(payload, serviceConstant.firebaseAuthorization.currentUser.uid, {
        expiresIn: 1440
      })
      localStorage.setItem('usertoken', token)
    })
    return 'success';
  }
  catch (error) {
    console.log(error);
    return error.message;
  }
}
export async function forgotpassword(email) {
  try {
    console.log(email)
    await serviceConstant.firebaseAuthorization.sendPasswordResetEmail(email)
    return 'success';
  }
  catch (error) {
    console.log(error)
    return error.message;
  }
}
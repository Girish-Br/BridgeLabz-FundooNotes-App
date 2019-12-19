/******************************************************************************
 *  @Purpose        : to build complete fundooNotes App
 *  @file           : userController.js
 *  @author         : GIRISH B R
 *  @since          : 27-11-2019
 *******************************************************************************/
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode'
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
        lastname: doc.data().lastname,
        user_id:loginDetails.user.uid
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
    console.log(notes)
    const Notesdetails={
      title:notes.title,
      description:notes.description,
      color:notes.color,
      archive:notes.archive,
      pin:notes.pin,
      user_id:servicesConstant.firebaseAuthorization.currentUser.uid,
      remainder:notes.remainder
    }
   await servicesConstant.firestore.collection('notes').doc().set(Notesdetails)
    return 'success';
  }
  catch (error) {
    console.log(error)
    return error.message;
  }
}
export  async function GetNote(){
  try{
    const token=localStorage.usertoken
    const decodedJwt=jwt_decode(token)
    var notes=[];
    await servicesConstant.firestore.collection("notes").where("user_id","==", decodedJwt.user_id).where("pin","==",false).where("archive","==",false)
    .get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        notes.push(doc)
      });
      })
console.log(notes);
return(notes)
  }
  catch(error){
    return error.message
  }
}
export  async function GetNoteForNotPinned(){
  try{
    const token=localStorage.usertoken
    const decodedJwt=jwt_decode(token)
    var notes=[];
    await servicesConstant.firestore.collection("notes").where("user_id","==", decodedJwt.user_id).where("archive","==",false).where("pin","==",true)
    .get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        notes.push(doc)
      });
      })
console.log(notes);
return(notes)
  }
  catch(error){
    return error.message
  }
}
export async function getArchivedNotes(){
  try{
    const token=localStorage.usertoken
    const decodedJwt=jwt_decode(token)
    var notes=[];
    await servicesConstant.firestore.collection("notes").where("user_id","==", decodedJwt.user_id).where("archive","==",true)
    .get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        notes.push(doc)
      });
      })
console.log(notes);
return(notes)
  }
  catch(error){
    return error.message
  }
}
export async function noteUpdate(data){
  console.log()
  await servicesConstant.firestore.collection("notes").doc(data.id).update({
    "title":data.title,
    "description":data.description,
    "id":data.id,
    "color":data.color,
    "archive":data.archive,
    "pin":data.pin
    
 })
.then(res=>{
  res=true;
  return res
})
.catch(error=>{
  return error.message
})
}
export default async function DeleteNote(data){
await servicesConstant.firestore.collection("notes").doc(data.doc_id).delete()
.then(res=>{
  res=true;
  return res
})
.catch(error=>{
return error.message
})
}
export async function archiveData(data){
  await servicesConstant.firestore.collection("notes").doc(data.id).update({
   "archieve":true
}).then(res=>{
 return res
}).catch(error=>{
 return error.message
})
}
export async function notePinned(data){
  await servicesConstant.firestore.collection("notes").doc(data.id).update({
   "pinned":data.pinned
}).then(res=>{
 return res
}).catch(error=>{
 return error.message
})
}

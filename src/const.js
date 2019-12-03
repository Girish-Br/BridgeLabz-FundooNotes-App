import fire from './config/firebase.js'
 var servicesConstant={
    firebaseAuthorization:fire.auth(),
    firestore:fire.firestore(),
}
export default servicesConstant;
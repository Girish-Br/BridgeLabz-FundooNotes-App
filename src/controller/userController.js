//import authServices from '../services/userServices';
import fire from '../config/firebase'
import firebase from 'firebase'
const db=fire.firestore();
export async function register (newUser,res){
    try{
    await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
          db.collection('user').doc(firebase.auth().currentUser.uid).set({
          first_name: ""+newUser.first_name,
          last_name: ""+newUser.last_name
        })
        res='success';
        return res;
      }
      catch(error) {
        console.log(error)
        return error
      }
  }
  export async function login(user,res){
    fire.auth().signInWithEmailAndPassword(user.email, user.password)
   /* var userData = db.collection("users").doc(firebase.auth().currentUser.uid)
    userData.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  })*/
    .catch((err) => {
      return err;
    })
}
/*var controller = {
    register(firstName, lastName, email, password) {
       fire.register(firstName, lastName, email, password)
    },
    login(email, password) {
        var data = {
            email: email,
            password: password
        }
        return axios.post(authServices.login, data).then(response => {
            console.log("response--" + JSON.stringify(response));
            if (response.status === 200) {
                console.log("login sucess")
            }
        })
            .catch(error => {
                console.log("login failed", error);
            })
    },
    forgotPwd(email) {
        var data = {
            email: email,
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
    },
    resetPwd(password, confirmpassword) {
        var data = {
            password: password,
            confirmpassword: confirmpassword
        }
        return axios.post(authServices.resetPwd, data).then(response => {
            console.log("response--" + JSON.stringify(response));
            if (response.status === 200) {
                console.log("reset sucess")
            }
        })
            .catch(error => {
                console.log("reset failed", error);
            })
    },
    getAllUseres() {
        return axios.get(authServices.getAllUsers).then(response => {
            console.log("response----------->>>>>>>>>>>>", response.data);
            if (response.status === 200) {
                console.log("get all useres sucess");
                return response.data;
            }

        })
            .catch(error => {
                console.log("get all useres failed", error);


            })
    },
}*/
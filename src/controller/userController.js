import authServices from '../services/userServices';
import fire from '../config/firebase'
import axios from 'axios';
var controller = {
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
}
export default controller;
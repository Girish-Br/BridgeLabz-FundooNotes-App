/******************************************************************************
 *  @Purpose        : to build complete fundooNotes App
 *  @file           : index.js
 *  @author         : GIRISH B R
 *  @since          : 26-11-2019
 *******************************************************************************/
import React from 'react';
import { login } from '../controller/userController'
import { Card,TextField,Button,Snackbar,IconButton,Toolbar,AppBar,Typography } from '@material-ui/core';
export default class Login extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     email: '',
     password: '',
     snackbarOpen: false,
     snackbarMsg: ''
   }
 }
 //used to display brief message
 snackbarClose = (e) => {
   this.setState({ snackbarOpen: false });
 }
 //function to handle when we click login button
 handleClick = () => {
   //checks email
   if (this.state.email === "") {
     this.setState({ snackbarOpen: true, snackbarMsg: "email cannot be empty" })
   }
   else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
    this.setState({
        snackbarOpen: true,
        snackbarMsg: "Invalid email..!"
    });
} 
else if (this.state.password.length < 6) {
    this.setState({
        snackbarOpen: true,
        snackbarMsg: "password must be of atleast 6 characters long..!"
    });
  }
   else {
     //navigate to controller
     const user = {
      email: this.state.email,
      password: this.state.password
    }
    login(user).then(res => {
      if(res==='success'){
      this.setState({
        snackbarOpen:true,
        snackbarMessage:'login successful'
      })
      this.props.history.push(`/dashboard`);
    }
    else{
      this.setState({
        snackbarOpen:true,
        snackbarMsg:res,
        email:'',
        password:''
      })
    }   
    })
  }
  }
 //function to handle when we click register button http://192.168.1.118:3001/ 
 handleRegisterClick = () => {
   this.props.history.push('/register');
 }
  //function to handle when we click forgot password link
 handleForgotClick = () => {
   this.props.history.push('/forgot');
 }
 //function to store values
 onChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}
//to display
 render() {
   return (
     <div>
       <Card className="lcard">
         <AppBar color="primary">
           <Toolbar>
               <div className="typoclass">
             <Typography>
               Welcome to FundooNotes App
           </Typography>
           </div>
           </Toolbar>
         </AppBar>
         <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center',}}
           open={this.state.snackbarOpen}
           autoHideDuration={6000}
           onClose={this.snackbarClose}
           message={<span id="messege-id">{this.state.snackbarMsg}</span>}
           action={
             <IconButton key="close" arial-label="close"color="inherit"onClick={this.snackbarClose}>
             </IconButton>}/>
         <form className="login">
           <h3><u>Login Page</u></h3>
           <div>
             <TextField
               id="outlined-email-input"
               label="Email"
               type="email"
               name="email"
               autoComplete="off"
               margin="normal"
               variant="outlined"
               value={this.state.email}
               onChange={this.onChange}
             />
           </div>
           <div>
             <TextField
               required
               id="outlined-pass-input"
               label="Password"
               type="password"
               name="password"
               margin="normal"
               variant="outlined"
               value={this.state.password}
               onChange={this.onChange}
             />
           </div>
           <div className="loginButton">
             <Button onClick={this.handleClick} fullwidth variant="contained" color="primary">
               Login
           </Button>
           </div>
           <div className='cbutton'>
             <Button onClick={this.handleRegisterClick} fullwidth variant="contained" color="primary">
               Create Account
           </Button >
           <div className='lfbutton'>
             <Button onClick={this.handleForgotClick} color='secondary' >
               Forgot Password??
           </Button>
           </div>
        </div>
         </form >
       </Card>
     </div>
   );
 }
}
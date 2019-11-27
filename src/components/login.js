import React from 'react';
import Controller from '../controller/userController'
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
   console.log(this.state.email.length)
   console.log(this.state.password)
   //checks email
   if (this.state.email === "") {
     this.setState({ snackbarOpen: true, snackbarMsg: "email cannot be empty" })
   } else if (this.state.password === null || this.state.password.length < 8) {
     this.setState({ snackbarOpen: true, snackbarMsg: "password should be min 8" })
   } else {
     //navigate to controller
     Controller.login(this.state.email, this.state.password);
     localStorage.setItem('Sender', this.state.email);
   }
 }
 //function to handle when we click register button
 handleRegisterClick = () => {
   this.props.history.push('/register');
 }
  //function to handle when we click forgot password link
 handleForgotClick = () => {
   this.props.history.push('/forgotpwd');
 }
 //function to store values
 onChangeEmail = (e) => {
   var Email = e.target.value;
   this.setState({
     email: Email
   })
 }
 onChangePassword = (e) => {
   var Password = e.target.value;
   this.setState({
     password: Password
   })
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
               WELCOME TO LOGIN PAGE
           </Typography>
           </div>
           </Toolbar>
         </AppBar>
         <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'left',}}
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
               autoComplete="email"
               margin="normal"
               variant="outlined"
               value={this.state.email}
               onChange={this.onChangeEmail}
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
               onChange={this.onChangePassword}
             />
           </div>
           <div className="loginButton">
             <Button onClick={this.handleClick} variant="contained" color="primary">
               Login
           </Button>
           </div>
           <div className='cbutton'>
             <Button onClick={this.handleRegisterClick} variant="contained" color="primary">
               Create Account
           </Button >
           <div className='lbutton'>
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
/******************************************************************************
 *  @Purpose        : to build Registration page for fundooNotes App
 *  @file           : registration.js
 *  @author         : GIRISH B R
 *  @since          : 26-11-2019
 *******************************************************************************/
import React from 'react';
import { Card, Button, TextField, Snackbar, IconButton } from '@material-ui/core';
import { register } from '../controller/userController'
import '../App.css'
import EventEmitter from 'promise-events'
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      snackbarOpen: false,
      snackbarMsg: '',
    }
  }
  //snackbar will be close at first
  snackbarClose = (e) => {
    this.setState({ snackbarOpen: false });
  }
//function to handle log in button
  handleClick = () => {
    this.props.history.push('/login');
  }
  //function to store values
onChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}
//function to handle submit button
handleSubmit = () => {
  //validation for all the inputs
  const eventEmitter=new EventEmitter()
  if (this.state.firstName === null || this.state.firstName.length < 1) {
    this.setState({ snackbarOpen: true, snackbarMsg: "firstname cannot be empty" })
  } else if (this.state.lastName === null || this.state.lastName.length < 1) {
    this.setState({ snackbarOpen: true, snackbarMsg: "lastname cannot be empty" })
  }
  else if (this.state.password === null || this.state.password.length < 8) {
    this.setState({ snackbarOpen: true, snackbarMsg: "password should be min 8" })
  }
  else if (this.state.email === null || this.state.email.length < 1) {
    this.setState({ snackbarOpen: true, snackbarMsg: "email cannot be empty" })
  }
  //if the validation is correct we will proceed the details to controller
  else {
        eventEmitter.on('validation',emailValidation=>{
      if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)){
        this.setState({snackbarOpen:true,snackbarMsg:"invalid email address"})
        return 'error';
      }
      });
    eventEmitter.emit('validation').then(result=>{
      if(result[0]!=='error'){
        const user = {
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        }
        register(user)
          .then(res => {
            if (res ===true) {
              this.setState({
                snackbarMsg: 'Registration Successs' + res,
                snackbarOpen: true
              })
              this.props.history.push(`/login`)
            }
            else {
              this.setState({
                snackbarMsg: res,
                snackbarOpen: true
              })
              this.setState({
                email: '',
                password: ''
              });
            }
          })
      }
    })
  }
}
  //to display
  render() {
    return (
      <div>
        <form className="register">
          <Card className="rcard">
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={this.state.snackbarOpen}
              autoHideDuration={6000}
              onClose={this.snackbarClose}
              message={<span id="messege-id"> {this.state.snackbarMsg}</span>}
              action={[
                <IconButton
                  key="close"
                  arial-label="close"
                  color='inherit'
                  onClick={this.snackbarClose}
                >
                </IconButton>
              ]}
            />
            <div className="rname">
              <h1><u>Registration</u></h1>
            </div>
            <div>
              <TextField
                id="firstName"
                label="FirstName"
                type="text"
                margin="normal"
                variant="outlined"
                name="firstName"
                value={this.state.firstName}
                onChange={this.onChange}
              />
            </div>
            <div>
              <TextField
                id="lastName"
                label="lastName"
                type="text"
                name="lastName"
                margin="normal"
                variant="outlined"
                value={this.state.lastName}
                onChange={this.onChange}
              />
            </div>
            <div>
              <TextField
                id="email"
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
                id="password"
                label="Password"
                type="password"
                name="password"
                margin="normal"
                variant="outlined"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="rsbutton">
              <Button onClick={this.handleSubmit} variant="contained" color="primary">
                submit
            </Button>
            </div>
            <div className="rlbutton">
              <a href='/login'>Already have an account?Login</a>
            </div>
          </Card>
        </form >
      </div>
    )
  }
}
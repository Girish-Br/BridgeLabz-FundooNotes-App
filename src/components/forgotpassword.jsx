/****************************************************************************************
 *  @Purpose        : To create a forgot password page to recover the password
                      using mail.
 *  @file           : forgotPassword.jsx       
 *  @author         : Girish B R
 *  @version        : v0.1
 *  @since          : 1-12-2019
 *****************************************************************************************/
import React from 'react';
import { Card, Button, TextField, Snackbar, IconButton } from '@material-ui/core';
import { forgotpassword } from '../controller/userController';
export default class ForgotPwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      snackbarOpen: false,
      snackbarMsg: ''
    }
  }
  handleClick = () => {
    if (this.state.email === "") {
      this.setState({ snackbarOpen: true, snackbarMsg: "email cannot be empty" })
    }
    else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Invalid email..!"
      });
    }
    else {
      forgotpassword(this.state.email).then(res => {
        if (res === 'success') {
          this.setState({
            snackbarOpen: true,
            snackbarMsg: "rest password link sent to your email"
          })
        }
        else {
          this.setState({
            snackbarOpen: true,
            snackbarMsg: res
          })
        }
      })
    }
  }
  //used to display brief message
  snackbarClose = (e) => {
    this.setState({ snackbarOpen: false });
  }
  onChangeEmail = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (

        <Card className="fCard">
          <h1 className="forgotpwd_head">Enter email</h1>
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
            open={this.state.snackbarOpen}
            autoHideDuration={6000}
            onClose={this.snackbarClose}
            message={<span id="messege-id">{this.state.snackbarMsg}</span>}
            action={
              <IconButton key="close" arial-label="close" color="inherit" onClick={this.snackbarClose}>
              </IconButton>} />
              <form>
          <div className="fTextfield">
            <TextField
              id="email"
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
          <div className="fsButton">
            <Button onClick={this.handleClick} variant="contained" style={{ color: "#212121", backgroundColor: "#9fa8da" }}>
              Submit
            </Button>
          </div>
          </form >
        </Card>
     
    );
  }
}
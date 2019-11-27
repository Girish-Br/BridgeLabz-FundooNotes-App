import React from 'react';
import { Card,Button,TextField,Snackbar,IconButton } from '@material-ui/core';
import Controller from '../controller/userController'
import '../App.css'
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
  snackbarClose = (e) => {
    this.setState({ snackbarOpen: false });
  }
  //function to handle submit button
  handleSubmit = () => {
    console.log(this.state.firstName)
    if (this.state.firstName === null || this.state.firstName.length < 1) {
      this.setState({ snackbarOpen: true,snackbarMsg:"firstname cannot be empty" })
    }else if (this.state.lastName === null || this.state.lastName.length < 1) {
      this.setState({ snackbarOpen: true,snackbarMsg:"lastname cannot be empty"  })
    }else if(this.state.email === null || this.state.email.length < 1) {
      this.setState({ snackbarOpen: true,snackbarMsg:"email cannot be empty"  })
    }else if(this.state.password === null || this.state.password.length < 8) {
      this.setState({ snackbarOpen: true,snackbarMsg:"password should be min 8"  })
    }
    else {
      Controller.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
      this.setState({ snackbarOpen: true,snackbarMsg:"successfully registered"  })
      this.props.history.push('/login')
    }
  }
  //function to handle log in button
  handleClick = () => {
   this.props.history.push('/login');
  }
  //function to store values
  onChangeFirstName = (e) => {
    //this.setState({ [e.target.name]: e.target.value });
    var firstName = e.target.value;
    this.setState({
      firstName: firstName
    })
  }
  onChangeLastName = (e) => {
    var LastName = e.target.value;
    this.setState({
      lastName: LastName
    })
  }
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
              name="firstname"
              value={this.state.firstname}
              onChange={this.onChangeFirstName}
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
              value={this.state.lastname}
              onChange={this.onChangeLastName}
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
              onChange={this.onChangeEmail}
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
              onChange={this.onChangePassword}
            />
          </div>
          <div className="rlbutton">
            <Button onClick={this.handleClick} variant="contained" color="primary">
              login
            </Button>
            </div>
            <div className="rsbutton">
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              submit
            </Button>
          </div>
        </Card>
      </form >
      </div>
    );
  }
}
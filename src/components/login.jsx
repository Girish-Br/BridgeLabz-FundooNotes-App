/******************************************************************************
 *  @Purpose        : to build login page for fundoo Notes
 *  @file           : login.jsx
 *  @author         : GIRISH B R
 *  @since          : 26-11-2019
 *******************************************************************************/
import React from "react";
import { login } from "../controller/userController";
import {
  Card,
  TextField,
  Button,
  Snackbar,
  IconButton,
  Toolbar,
  AppBar,
  Typography
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      snackbarOpen: false,
      snackbarMsg: ""
    };
  }
  //used to display brief message
  snackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };
  //function to handle when we click login button
  handleClick = () => {
    //validating email
    if (this.state.email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "email cannot be empty"
      });
    } else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)
    ) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Invalid email..!"
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "password must be of atleast 6 characters long..!"
      });
    } else {
      //navigate to controller
      const user = {
        email: this.state.email,
        password: this.state.password
      };
      login(user).then(res => {
        if (res.user) {
          setTimeout(() => {
            this.setState({
              snackbarOpen: true,
              snackbarMsg: "login Successs"
            });
          }, 2000);
          this.props.history.push(`/dashboard`);
        } else {
          this.setState({
            snackbarMsg: res,
            snackbarOpen: true
          });
          this.setState({
            email: "",
            password: ""
          });
        }
      });
    }
  };
  //function to handle when we click register button
  handleRegisterClick = () => {
    this.props.history.push("/register");
  };
  //function to handle when we click forgot password link
  handleForgotClick = () => {
    this.props.history.push("/forgot");
  };
  //function to store valueshistory
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //to display
  render() {
    return (
      <div className="loginComp">
        <div>
          <AppBar color="primary" position="fixed" className="lAppbar">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
              ></IconButton>
                <p  variant="h6" color="inherit" className="typo">
                WELCOME TO FUNDOO-NOTES
                </p>
            </Toolbar>
          </AppBar>
        </div>
        <div>
        <Card class="lcard">
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={this.state.snackbarOpen}
            autoHideDuration={6000}
            onClose={this.snackbarClose}
            message={<span id="messege-id">{this.state.snackbarMsg}</span>}
            action={
              <IconButton
                key="close"
                arial-label="close"
                color="inherit"
                onClick={this.snackbarClose}
              ></IconButton>
            }
          />
          <div className="login">
            <form>
              <div>
                <p className="loginName">
                  <u>
                LOGIN PAGE
                </u>
                </p>
              </div>
              <div>
                <div className="firsttxtField">
                  <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="on"
                    margin="normal"
                    variant="outlined"
                    value={this.state.email}
                    onChange={this.onChange}
                    className="txtFieldWidth"
                  />
                </div>
                <div className="secondtxtField">
                  <TextField
                    required
                    id="outlined-pass-input"
                    className="txtFieldWidth"
                    label="Password"
                    type="password"
                    name="password"
                    margin="normal"
                    variant="outlined"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="loginButtondiv">
                <Button
                  onClick={this.handleClick}
                  fullwidth
                  variant="contained"
                  color="primary"
                  className="loginButton"
                >
                  Login
                </Button>
              </div>
              <div className="cbutton">
                <Button
                  onClick={this.handleRegisterClick}
                  fullwidth
                  variant="contained"
                  color="primary"
                >
                  Create Account
                </Button>
                <div className="lfbuttondiv">
                  <a
                    href
                    onClick={this.handleForgotClick}
                    className="loginButton"
                  >
                    Forgot Password??
                  </a>
                </div>
              </div>
            </form>
          </div>
        </Card>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);

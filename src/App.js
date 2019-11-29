import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import Login from './components/login';
import './App.css';
import Register from './components/registration';
import forgot from './components/forgotpassword'
class App extends Component {
  render() {
    return (
    <Router>
      <Route path="/login" component={Login}></Route>
      <Route path="/" exact component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/forgot" component={forgot}></Route>
    </Router>
    );
  }
}
export default App;
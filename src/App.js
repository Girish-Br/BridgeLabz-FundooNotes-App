/******************************************************************************
 *  @Purpose        : to build complete fundooNotes App
 *  @file           : App.js
 *  @author         : GIRISH B R
 *  @since          : 26-11-2019
 *******************************************************************************/
import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from "react-router-dom";
import Login from './components/login';
import  Dashboard from '../src/components/dashboard/dashboard'
import './App.css';
import Register from './components/registration';
import forgot from './components/forgotpassword'

//helps to use properties of component
class App extends Component {
  //returns the display contains
  render() {
    return (
    <Router>
      <Route path="/login" component={Login}></Route>
      <Route path="/" exact component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/forgot" component={forgot}></Route>
      <Route path="/dashboard" 
            render={()=>(
              localStorage.getItem('usertoken')===null?<Login/>:<Dashboard/>
            )} />
    </Router>
    );
  }
}
export default App;
//import react component
import React, { Component } from 'react';
////import browser router to create multiple routers sharing one history
import { BrowserRouter as Router,Route } from "react-router-dom";
//import all files from components
import Login from './components/login';
import './App.css';
import Register from './components/registration';
//extending allows to create reusable block of codes
class App extends Component {
  //to display
  render() {
    //return all pages to render
    return (
      //library for react and navigate to pages
    <Router>
      <Route path="/login" component={Login}></Route>
      <Route path="/" exact component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </Router>
    );
  }
}
//export app file
export default App;
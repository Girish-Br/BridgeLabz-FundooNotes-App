//import react library
import React from 'react';
//import ReactDom to js and convert it to html 
import ReactDOM from 'react-dom';
//import app file
import App from './App';
//import css file
import './index.css';
//update existing component of app file to root
ReactDOM.render(<App />,document.getElementById('root')
);
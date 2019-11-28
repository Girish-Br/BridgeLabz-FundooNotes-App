import React from 'react';
import {shallow} from 'enzyme';
import Login from './components/login';
const Enzyme = require('enzyme');
// this is where we reference the adapter package we installed  
// earlier
const EnzymeAdapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });
/**
 * describe what we are testing
 **/
describe('Login Component', () => {
  /**
   * make our assertion and what we expect to happen 
   **/
  it('should render without throwing an error', () => {
    expect(shallow( <Login/> ).exists()).toBe(true)
  })
  /**
   * within the Login components describe function
   **/
  it('renders a email input', () => {
    expect(shallow( <Login/> ).find('#email').length).toEqual(true)
  })
  it('renders a password input', () => {
    expect(shallow( <Login/> ).find('#password').length).toEqual(1)
  })
})
import React from 'react';
//import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import * as enzyme from 'enzyme';
import Login from './components/login'
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter });
//import { login } from './controller/userController';
import {Register} from './components/registration';
describe('Register', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Register/>);
    expect(wrapper.find('div').length).toEqual(2);
  });
});
describe('Login', () => {
  let wrapper;
   beforeEach(() => wrapper = shallow(<Login />));
  it('should render correctly', () => 
  expect(wrapper).toMatchSnapshot());
  
  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });
});
describe('Login Component', () => {
  // within the Login components describe function
  it('renders a email input', () => {
   expect(shallow(<Login />).find('#email').length).toEqual(1)
  })
  it('renders a password input', () => {
   expect(shallow(<Login />).find('#password').length).toEqual(1)})
  });
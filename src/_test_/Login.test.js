import React from 'react';
import { shallow} from 'enzyme';
import Login from '../components/login';
import '../setUpTest'
describe('Login Component', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
        expect(shallow(< Login />).exists()).toBe(true)
    })
    it('renders a email input', () => {
        expect(shallow( < Login /> ).find('#outlined-email-input').length).toEqual(1)
      })
      it('renders a password input', () => {
        expect(shallow( < Login /> ).find('#outlined-pass-input').length).toEqual(1)
      })
})
describe('Email input', () => {
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login /> );
      wrapper.find('#outlined-email-input').simulate('change', {
        target: {
          name: 'email',
          value: 'girishpacchu1427@gmail.com'
        }
      });
      expect(wrapper.state('email')).toEqual('girishpacchu@gmail.com');
    })
  })
  describe('Password input', () => {
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login /> );
      wrapper.find('#outlined-pass-input')
        .simulate('change', {
          target: {
            name: 'password',
            value: 'giri141519'
          }
        });
      expect(wrapper.state('password')).toEqual('giri141519');
    })
  })
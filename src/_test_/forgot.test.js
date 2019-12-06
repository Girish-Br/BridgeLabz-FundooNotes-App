/******************************************************************************
 *  @Purpose        : to test forgot password component with jest and enzyme
 *  @file           : forgot.test.js
 *  @author         : GIRISH B R
 *  @since          : 05-12-2019
 *******************************************************************************/
import React from 'react';
import {
    shallow
} from 'enzyme';
import ForgotPassword from '../components/forgotpassword.jsx';
import '../setupTest'
describe('Email input', () => {
    it('should respond to change event and change the state of the ForgotPassword Component', () => {
        const wrapper = shallow( < ForgotPassword /> );
        wrapper.find('#outlined-email-input').simulate('change', {
            target: {
                name: 'email',
                value: 'girishpacchu1427@gmail.com'
            }
        });
        expect(wrapper.state('email')).toEqual('girishpacchu1427@gmail.com');
    })
})
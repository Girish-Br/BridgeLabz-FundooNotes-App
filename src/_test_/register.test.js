/******************************************************************************
 *  @Purpose        : to test Registration component with jest and enzyme
 *  @file           : register.test.js.js
 *  @author         : GIRISH B R
 *  @since          : 05-12-2019
 *******************************************************************************/
import React from 'react';
import {shallow} from 'enzyme';
import Registration from '../components/registration';
import '../setUpTest'
describe('Registration Component', () => {
  //testing rendering of registration component
    it('should render without throwing an error', () => {
        expect(shallow( < Registration /> )
                .exists())
            .toBe(true)
    })
//testing existence of firstname and lastname
    it('renders a firstName input', () => {
        expect(shallow( < Registration /> ).find('#firstName').length).toEqual(1)
    })
    it('renders a lastName input', () => {
        expect(shallow( < Registration /> ).find('#lastName').length).toEqual(1)
    })
    describe('firstName input', () => {
        //testing given input
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration /> );
            wrapper.find('#firstName').simulate('change', {
                target: {
                    name: 'firstname',
                    value: 'Girish'
                }
            });
            expect(wrapper.state('firstName')).toEqual('Girish');
        })
    })
    describe('lastName input', () => {
        //testing given input
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration /> );
            wrapper.find('#lastName').simulate('change', {
                target: {
                    name: 'lastname',
                    value: 'Br'
                }
            });
            expect(wrapper.state('lastName')).toEqual('Br');
        })
    })
    describe('Email input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration /> );
            wrapper.find('#outlined-email-input').simulate('change', {
                target: {
                    name: 'email',
                    value: 'girishpacchu@gmail.com'
                }
            });
            expect(wrapper.state('email')).toEqual('girishpacchu@gmail.com');
        })
    })
    describe('Password input', () => {
        it('should respond to change event and change the state of the Registration Component', () => {
            const wrapper = shallow( < Registration /> );
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
})
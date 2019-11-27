import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-15';
describe('<App/>',()=>{
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders 1 <App/> component',()=>{
    const component=shallow(<App />);
    Enzyme.configure({ adapter: new Adapter() });
    Expect(component).toHaveLength(1)
  })
})

import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import {shallow} from 'enzyme';
import Phases from '../../components/Phases/Phases';
import {expect} from 'chai';

it('renders without crashing', () => {
  const wrapper = shallow(<Dashboard />)
  expect(wrapper.find(Phases)).to.have.length(1)

});

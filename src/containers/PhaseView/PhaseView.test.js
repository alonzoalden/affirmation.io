import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import PhaseView from './PhaseView'
import PostPreview from '../../components/Phases/Phases';
import {expect} from 'chai';

const props = {
  avatar: 'bob',
  job: 'bill',
  message: 'hello',
  name: 'billyboy',
  title: 'the killer',
}

it('renders without crashing', () => {
  const wrapper = shallow(<PhaseView />)
  expect(wrapper.find('asdfadsf')).to.exist;
  //expect(wrapper.state.posts).to.exist;
});

it('should have props for email and src', function () {
    const wrapper = shallow(<PostPreview />);
    // expect(wrapper.props().pasdfasdfasdfosts).to.be.defined;
});
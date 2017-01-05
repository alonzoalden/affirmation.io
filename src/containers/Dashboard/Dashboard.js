/*
 *
 * Dashboard
 *
 */

import React from 'react';
import WantToLearn from '../../components/Phase/WantToLearn';
import LearningToCode from '../../components/Phase/LearningToCode';
import JobHunt from '../../components/Phase/JobHunt';
import OnTheJob from '../../components/Phase/OnTheJob';


export class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <WantToLearn />
        <LearningToCode />
        <JobHunt />
        <OnTheJob />
      </div>
    );
  }
}

export default Dashboard;

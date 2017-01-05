/**
*
* Phase
*
*/

import React from 'react';
import { Link } from 'react-router';
import './Phases.css'

class Phases extends React.Component {
  render() {
    const floatLeft = {
      float: 'left',
    };
    const flexbox = {
      'display': '-webkit-flex',
      'display': '-ms-flexbox',
      'display': 'flex',
      'overflow': 'hidden'
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    const icon = {
      height: 120,
      width: 120,
      marginTop: 75
    };
    return (
      <div>
        <div className={flexbox}>
          <Link to="/WantToLearn">
            <div className="col-xs-12 col-md-6 Shamrock" style={{ 'height': '50vh' }}>
              <div style={center}>
                <img className='tossing' style={icon} src={require('../../icons/rocket.png')}/>
              </div>
              <div style={center}>
                <h2 className="WhiteFont">I want to learn to code</h2>
              </div>
            </div>
          </Link>
          <Link to="/LearningToCode">
            <div className="col-xs-12 col-md-6 Purple" style={{ 'height': '50vh' }}>
              <div style={center}>
                <img className='tossing' style={icon} src={require('../../icons/pencil.png')}/>
              </div>
              <div style={center}>
                <h2 className="WhiteFont">I am learning to code</h2>
              </div>
            </div>
          </Link>
          <Link to="/JobHunt">
            <div className="col-xs-12 col-md-6 Blue" style={{ 'height': '50vh' }}>
              <div style={center}>
                <img className='tossing' style={icon} src={require('../../icons/briefcase.png')}/>
              </div>
              <div style={center}>
                <h2 className="WhiteFont">I am on the job hunt</h2>
              </div>
            </div>
          </Link>
          <Link to="/OnTheJob">
            <div className="col-xs-12 col-md-6 Orange" style={{ 'height': '50vh' }}>
              <div style={center}>
                <img className='tossing' style={icon} src={require('../../icons/molecule.png')}/>
              </div>
              <div style={center}>
                <h2 className="WhiteFont">I am on the job</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Phases;

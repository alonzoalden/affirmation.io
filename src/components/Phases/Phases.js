/**
*
* Phase
*
*/

import React from 'react';
import { Link } from 'react-router';
import './Phases.css';
import '../Animate.css';

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
    const learn = {
      marginTop: 90,
      fontSize: 34,
      fontWeight: 'bold'
    };
    const lego = {
      height: 50,
      width: 50,
      marginTop: 40
    };
    const text = {
      color: '#3D454D',
      marginTop: 60
    };
    const textLast = {
      color: '#fff',
      marginTop: 60
    };
    return (
      <div>
        <div className={flexbox}>
          <Link to="/WantToLearn">
            <div className="row">
              <div className="col-xs-12">
                <div className="alert light" role="alert">

                  <div className="col-xs-6 col-xs-offset-3"> 
                    <h1 style={text}>I WANT TO LEARN TO CODE</h1>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/LearningToCode">
            <div className="row">
              <div className="col-xs-12">
                <div className="alert grey" role="alert">

                  <div className="col-xs-6 col-xs-offset-3"> 
                    <h1 style={text}>I AM LEARNING TO CODE</h1>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/JobHunt">
            <div className="row">
              <div className="col-xs-12">
                <div className="alert blue" role="alert">

                  <div className="col-xs-6 col-xs-offset-3"> 
                    <h1 style={textLast}>I AM ON THE JOB HUNT</h1>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/OnTheJob">
            <div className="row">
              <div className="col-xs-12">
                <div className="alert darkgrey" role="alert">
                  <div className="col-xs-6 col-xs-offset-3"> 
                    <h1 style={textLast}>I AM ON THE JOB</h1>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Phases;

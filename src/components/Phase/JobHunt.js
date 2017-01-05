/**
*
* Phase
*
*/

import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

class JobHunt extends React.Component {
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
    const col = {
      'flex': 1
    }
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div>
        <div className={flexbox}>
          <div className="col-xs-12 col-md-6 col" style={{ 'background-color': 'cyan', 'height': '50vh' }}>
            Hello World!
          </div>
          <div className="col-xs-12 col-md-6 col" style={{ 'background-color': 'grey', 'height': '50vh' }}>
            Hello World!
          </div>
          <div className="col-xs-12 col-md-6 col" style={{ 'background-color': 'pink', 'height': '50vh' }}>
            Hello World!
          </div>
          <div className="col-xs-12 col-md-6 col" style={{ 'background-color': 'yellow', 'height': '50vh' }}>
            Hello World!
          </div>
        </div>
      </div>
    );
  }
}

export default JobHunt;

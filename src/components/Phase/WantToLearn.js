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

class WantToLearn extends React.Component {
  render() {
    const floatLeft = {
      float: 'left',
    };
    const paperStyle = {
      height: 400,
      width: 300,
      margin: 20,
      overflow: 'auto',
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div style={floatLeft}>
        <h2 style={center}>I want to learn to code</h2>
        <Paper style={paperStyle} zDepth={4}>
          <div style={{ margin: 20 }}>
            <h3 style={{ 'font-style': 'italic' }}>Random Affirmation</h3>
            <div>
              <h4>The Best Advice Ever</h4>
              <p>
                Code. Code. Code. Code. Code. Code.
                Code. Code. Code. Code. Code. Code.
              </p>
              <Link to="/WantToLearn">
                <FlatButton
                  label="Read More"
                  primary={true}
                />
              </Link>
            </div>
            <div style={center}>
              <Link to="/WantToLearn">
                <RaisedButton
                  label="View All Affirmations"
                  primary={true}
                />
              </Link>
            </div>
          </div>
        </ Paper>
      </div>
    );
  }
}

export default WantToLearn;

import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './Home.css';
import './Animate.css';
class Home extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  };

  render() {
    const text = {
      marginTop: 140
    };
    const icon = {
      height: 120,
      width: 120,
      marginTop: 180
    };
    return (
      <div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-info" role="alert">
            <div className="col-xs-4 col-xs-offset-2">
              <h1 style={text}>'Want to learn?'</h1>
              <h3>Lorem ipsum dolor sit amet, mel tacimates mandamus ea, minim dicunt
                mea ne, ei sit principes elaboraret. Purto principes per et, affert feugait
                eu mea. Id mel suas unum definitiones, veritus lucilius an sea.
              </h3>
            </div>
            <div className="col-xs-3 col-xs-offset-1">
              <img className='tossing' style={icon} src={require('./rocket.png')}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-success" role="alert">
            <div className="col-xs-3 col-xs-offset-2">
              <img className='tossing' style={icon} src={require('./pencil.png')}/>
            </div>
            <div className="col-xs-4 col-xs-offset-1">
              <h1 style={text}>'Learning to code?'</h1>
                <h3>Lorem ipsum dolor sit amet, mel tacimates mandamus ea, minim dicunt
                  mea ne, ei sit principes elaboraret. Purto principes per et, affert feugait
                  eu mea. Id mel suas unum definitiones, veritus lucilius an sea.
                </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-info" role="alert">
            <div className="col-xs-4 col-xs-offset-2">
              <h1 style={text}>'Job hunting?'</h1>
                <h3>Lorem ipsum dolor sit amet, mel tacimates mandamus ea, minim dicunt
                  mea ne, ei sit principes elaboraret. Purto principes per et, affert feugait
                  eu mea. Id mel suas unum definitiones, veritus lucilius an sea.
                </h3>
            </div>
            <div className="col-xs-3 col-xs-offset-1">
              <img className='tossing' style={icon} src={require('./briefcase.png')}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-success" role="alert">
            <div className="col-xs-3 col-xs-offset-2">
              <img className='tossing' style={icon} src={require('./molecule.png')}/>
            </div>
            <div className="col-xs-4 col-xs-offset-1">
              <h1 style={text}>'On the job?'</h1>
                <h3>Lorem ipsum dolor sit amet, mel tacimates mandamus ea, minim dicunt
                  mea ne, ei sit principes elaboraret. Purto principes per et, affert feugait
                  eu mea. Id mel suas unum definitiones, veritus lucilius an sea.
                </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default connectProfile(Home);

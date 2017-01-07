import React, {Component} from 'react';
import { connectProfile, newLock } from '../auth';
import Auth0Lock from 'auth0-lock';
import './Home.css';
import './Animate.css';
class Home extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  };
  componentDidMount(){
    newLock();
  };
  render() {
    const text = {
      marginTop: 110
    };
    const icon = {
      height: 120,
      width: 120,
      marginTop: 180
    };
    const mainIcon = {
      height: 120,
      width: 120,
      marginLeft: 135
    };
    const auth = {
      paddingTop: 20
    };
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <div className="alert alert-info main" role="alert">
              <div className="col-xs-4 col-xs-offset-2">
                <h1 style={text}>Affirmation.io</h1>
                <h3>Whether you are exploring, learning, job hunting, or looking to
                  expand your seasoned career, you will inevitably face the unknown.
                  Obtain advice from profound experienced professionalsin the field
                  who have been in your shoes, to help you gain the confidence and
                  skills you need to succeed.
                </h3><img className='tossing' style={mainIcon} src={require('../icons/rocket.png')}/>
              </div>
              <div style={auth} className="col-xs-3 col-xs-offset-2">
                <div id="hiw-login-container"></div>
              </div>
            </div>
          </div>
        </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-success" role="alert">
            <div className="col-xs-4 col-xs-offset-2">
              <h1 style={text}>'Want to learn?'</h1>
              <h3>Lorem ipsum dolor sit amet, mel tacimates mandamus ea, minim dicunt
                mea ne, ei sit principes elaboraret. Purto principes per et, affert feugait
                eu mea. Id mel suas unum definitiones, veritus lucilius an sea unum.
              </h3>
            </div>
            <div className="col-xs-3 col-xs-offset-2">
              <img className='tossing' style={icon} src={require('../icons/molecule.png')}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-info" role="alert">
            <div className="col-xs-3 col-xs-offset-3">
              <img className='tossing' style={icon} src={require('../icons/laptop.png')}/>
            </div>
            <div className="col-xs-4">
              <h1 style={text}>'Learning to code?'</h1>
                <h3>Lorem ipsum dolor sit amet, mel tacimates mandamus ea, minim dicunt
                  mea ne, ei sit principes elaboraret. Purto principes per et, affert feugait
                  eu mea. Id mel suas unum definitiones, veritus lucilius an sea unum.
                </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-success" role="alert">
            <div className="col-xs-4 col-xs-offset-2">
              <h1 style={text}>'Job hunting?'</h1>
                <h3>Lorem ipsum dolor sit amet, mel tacimates mandamus ea, minim dicunt
                  mea ne, ei sit principes elaboraret. Purto principes per et, affert feugait
                  eu mea. Id mel suas unum definitiones, veritus lucilius an sea unum.
                </h3>
            </div>
            <div className="col-xs-3 col-xs-offset-2">
              <img className='tossing' style={icon} src={require('../icons/briefcase.png')}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-info" role="alert">
            <div className="col-xs-3 col-xs-offset-3">
              <img className='tossing' style={icon} src={require('../icons/certification.png')}/>
            </div>
            <div className="col-xs-4">
              <h1 style={text}>'On the job?'</h1>
                <h3>Lorem ipsum dolor sit amet, mel tacimates mandamus ea, minim dicunt
                  mea ne, ei sit principes elaboraret. Purto principes per et, affert feugait
                  eu mea. Id mel suas unum definitiones, veritus lucilius an sea unum.
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

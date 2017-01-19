import React, {Component, PropTypes} from 'react';
import { connectProfile, newLock } from '../auth';
import Auth0Lock from 'auth0-lock';
import './Home.css';
import './Animate.css';
import {isLoggedIn} from '../auth';
import Paper from 'material-ui/Paper';

class Home extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentWillMount() {
    if (isLoggedIn()) {
      this.context.router.push('/dashboard');
    }
  }
  componentDidMount(){
    newLock();
  }
  // <h3>Whether you are exploring, learning, job hunting, or looking to
  //   expand your seasoned career, you will inevitably face the unknown.
  //   Obtain advice from profound experienced professionalsin the field
  //   who have been in your shoes, to help you gain the confidence and
  //   skills you need to succeed.
  // </h3>
  render() {
    const text = {
      marginTop: 50
    };
    const learn = {
      marginTop: 90,
      fontSize: 34,
      fontWeight: 'bold'
    };
    const main = {
      marginTop: 120,
      color: '#fff'
    };
    const icon = {
      height: 100,
      width: 100,
      marginTop: 110
    };
    const iconLast = {
      height: 100,
      width: 100,
      marginTop: 125
    };
    const auth = {
      paddingTop: 80,
      paddingLeft: 15
    };
    const github = {
      color: '#fff',
      textDecoration: 'none'
    };
    const onTheJob = {
      marginTop: 50,
    };
    // const paper = {
    //   height: 300,
    //   width: 500
    // };
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <div className="alert alert-info main" role="alert">
              <div className="col-sm-4 col-sm-offset-2">
                <h4 style={main}>Candid Advice from Experienced Software Engineers</h4>
              </div>
              <div style={auth} className="col-xs-3 col-xs-offset-1">
                <div id="hiw-login-container"></div>
              </div>
            </div>
          </div>
        </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-success learn" role="alert">
            <div className="col-xs-6 col-xs-offset-3">
              <h1 style={learn}>Great advice for great talent</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-success" role="alert">
            <div className="col-xs-4 col-xs-offset-2">
            
              <h1 style={text}>Want to learn?</h1>
              <h3>
                Are you thinking about learning to write code? Does the field of software engineering excite you? We know that it may be challenging to find out where to begin and what path to take. Let the advice from experienced software engineers guide you on the beginning of your journey!
              </h3>
          
            </div>
            <div className="col-xs-3 col-xs-offset-2">
              <img className='tossing' style={icon} src={require('../icons/preview.jpg')}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-info" role="alert">
            <div className="col-xs-3 col-xs-offset-3">
              <img className='tossing' style={icon} src={require('../icons/preview.jpg')}/>
            </div>
            <div className="col-xs-4">
              <h1 style={text}>Learning to code?</h1>
                <h3>
                  Have you taken the plunge to learn to write code? Stuck trying to figure out what resources you should use? There are many detours and rabbit holes one can fall into while learning to code. Let the advice from experienced software engineers help you make the best use of your time and energy!
                </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-success" role="alert">
            <div className="col-xs-4 col-xs-offset-2">
              <h1 style={text}>Job hunting?</h1>
                <h3>
                  Are you looking for your dream job? Have you prepared for the personal and technical challenges that await you in the job hunting process? Let the advice from experienced software engineers help you crush every interview that will come your way!
                </h3>
            </div>
            <div className="col-xs-3 col-xs-offset-2">
              <img className='tossing' style={icon} src={require('../icons/preview.jpg')}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-info last" role="alert">
            <div className="col-xs-3 col-xs-offset-3">
              <img className='tossing' style={iconLast} src={require('../icons/preview.jpg')}/>
            </div>
            <div className="col-xs-4">
              <h1 style={onTheJob}>On the job?</h1>
                <h3>
                  You've made it! But the journey has just begun. Are you curious as to how to effectively navigate the workspace? Would you like to know how to get the most out of this opportunity? Let the advice from experienced software engineers guide you in not only making your employer happy, but also to make sure that your learning never stops!
                </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert grey" role="alert">
            <div className="col-xs-6 col-xs-offset-3">
              <h1 style={learn}></h1>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert blue" role="alert">
            <div className="col-xs-6 col-xs-offset-3">
              <h1 style={learn}></h1>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-info footer" role="alert">
            <div className="col-xs-3 col-xs-offset-3">
              <br/>
              <br/>
              <h5>Alonzo Alden</h5>
              <h5>David Flowers</h5>
              <h5>Diogenis Panagiotis</h5>
              <h5>Luke Golden</h5>
              <h5>Raj Desai</h5>
            </div>
            <div className="col-xs-3 col-xs-offset-1">
              <br/>
              <br/>
              <h5><a style={github} href='https://github.com/alonzoalden'>github.com/alonzoalden</a></h5>
              <h5><a style={github} href='https://github.com/DavFlo-16'>github.com/DavFlo-16</a></h5>
              <h5><a style={github} href='https://github.com/DiogenisPanagiotis'>github.com/DiogenisPanagiotis</a></h5>
              <h5><a style={github} href='https://github.com/DhammaLuke'>github.com/DhammaLuke</a></h5>
              <h5><a style={github} href='https://github.com/RADesai'>github.com/RADesai</a></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default connectProfile(Home);

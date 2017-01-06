import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connectProfile, logout, login } from '../auth';
import './Site.css';
// import logo from '../logo.svg';
// <Avatar src={logo} className="Site-logo" alt="logo" style={logoStyle}/> ----> Spinning React Logo - switch to Lotus??
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import { grey900, blue100, green100 } from 'material-ui/styles/colors';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';
import ActionCompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ImageColorLens from 'material-ui/svg-icons/image/color-lens';
import ImageBrush from 'material-ui/svg-icons/image/brush';
import ImageLooks from 'material-ui/svg-icons/image/looks';
import ImageBlurCircular from 'material-ui/svg-icons/image/blur-circular';

class Site extends Component {
  static propTypes = {
    ...connectProfile.PropTypes,
    children: PropTypes.any
  };

  renderLinks() {
    const {profile} = this.props;
    const nunito = {
      fontFamily: 'Nunito',
      color: '#28D2E4'
    };
    if (profile) {
      return (
        <div>
          <Link to="/createpost">
            <FlatButton primary label="Add Affirmation" style={nunito} icon={<ContentCreate />} />
          </Link>
          <Link to="/dashboard">
            <FlatButton primary label="DASHBOARD" style={nunito} icon={<ActionDashboard />} />
          </Link>
        </div>
      );
    }
  }

  renderStepper() {
    const {profile} = this.props;
    if (profile) {
      return (
        <Stepper linear={false} connector={<ActionCompareArrows color={green100} />}>
          <Step>
            <StepButton icon={<ImageColorLens color={blue100}/>}></StepButton>
          </Step>
          <Step>
            <StepButton icon={<ImageBrush color={blue100}/>}></StepButton>
          </Step>
          <Step>
            <StepButton icon={<ImageBlurCircular color={blue100}/>}></StepButton>
          </Step>
          <Step>
            <StepButton icon={<ImageLooks color={blue100}/>}></StepButton>
          </Step>
        </Stepper>
      );
    }
  }

  renderUserControls() {
    const {profile} = this.props;
    const paddedLeft = {
      paddingLeft: 10,
      backgroundColor: 'grey900'
    };
    const titleStyle = {
      color: '#FFDB77',
      fontFamily: 'Nunito'
    };
    const nunito = {
      fontFamily: 'Nunito',
      color: '#867DCC'
    };
    if (profile) {
      return (
        <ToolbarGroup lastChild={true} style={paddedLeft}>
          <Avatar src={profile.picture}/>
          <Link to="/profile/edit" style={paddedLeft}>
            <FlatButton style={titleStyle}>
              {profile.nickname}
            </FlatButton>
          </Link>
          <FlatButton label="Logout" style={nunito} onClick={logout}/>
        </ToolbarGroup>
      );
    } else {
      return (
        <ToolbarGroup>
          <Link to="/login">
            <FlatButton style={nunito} label="Log In" onClick={login}/>
          </Link>
        </ToolbarGroup>
      );
    }
  }

  render() {
    const barStyle = {
      backgroundColor: grey900
    };
    const paddedTitleStyle = {
      color: 'white',
      paddingLeft: 10,
      paddingBottom: 8
    };
    return (
      <div className="Site">
        <Toolbar style={barStyle}>
          <ToolbarGroup firstChild={true}>
            <h2 style={paddedTitleStyle}>Affirmation.io</h2>
          </ToolbarGroup>
          <ToolbarGroup>
            {this.renderLinks()}
            {this.renderUserControls()}
          </ToolbarGroup>
        </Toolbar>
        <div className="Site-page">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connectProfile(Site);

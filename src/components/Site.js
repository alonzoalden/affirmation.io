import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connectProfile, logout, login } from '../auth';
import logo from '../logo.svg';
import './Site.css';

// FROM NAV ------- ------- \\
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
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
// FROM NAV ------- ------- \\
class Site extends Component {
  static propTypes = {
    ...connectProfile.PropTypes,
    children: PropTypes.any
  };

  render() {
    const barStyle = {
      backgroundColor: grey900
    };
    const paddedTitleStyle = {
      color: blue100,
      padding: 10
    };
    const logoStyle = {
      backgroundColor: grey900
    };
    return (
      <div className="Site">
        <Toolbar style={barStyle}>
          <ToolbarGroup firstChild={true}>
            <Avatar src={logo} className="Site-logo" alt="logo" style={logoStyle}/>
            <ToolbarTitle text="Affirmation.io" style={paddedTitleStyle}/>
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

  renderLinks() {
    const {profile} = this.props;
    const padding = {
      padding: 5
    }
    if (profile) {
      return (
        <div style={padding}>
          <Link to="/createpost">
            <FlatButton primary label="Add Affirmation" icon={<ContentCreate />} />
          </Link>
          <Link to="/dashboard">
            <FlatButton primary label="DASHBOARD" icon={<ActionDashboard />} />
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
      paddingLeft: 10
    };
    const titleStyle = {
      color: blue100
    };
    if (profile) {
      return (
        <ToolbarGroup lastChild={true}>
          <Avatar src={profile.picture}/>
          <Link to="/profile/edit" style={paddedLeft}>
            <FlatButton style={titleStyle}>
              {profile.nickname}
            </FlatButton>
          </Link>
          <FlatButton label="Logout" secondary={true} onClick={logout}/>
        </ToolbarGroup>
      );
    } else {
      return (
        <ToolbarGroup>
          <Link to="/login">
            <FlatButton primary label="Log In" onClick={login}/>
          </Link>
        </ToolbarGroup>
      );
    }
  }
}

export default connectProfile(Site);

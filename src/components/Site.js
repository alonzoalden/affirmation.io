import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connectProfile, logout } from '../auth';
import './Site.css';
// import logo from '../logo.svg';
// <Avatar src={logo} className="Site-logo" alt="logo" style={logoStyle}/> ----> Spinning React Logo - switch to Lotus??
import axios from 'axios';
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
//Menu
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    ...connectProfile.PropTypes,
    children: PropTypes.any
  };

  getUser() {
    axios.get('http://localhost:8000/api/users/' + this.props.profile.email)
    .then((user) => {
      this.setState({ userProfile: user.data })
    })
    .then(() => {
      console.log('state in site.js:', this.state);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  componentWillMount() {
    if (this.props.profile) {
      this.getUser();
    }
  }

  renderLinks() {
    let profile = this.state.userProfile;
    const nunito = {
      fontFamily: 'Nunito',
      color: '#FFDB77',
    };
    const paddedRight = {
      paddingRight: 10
    };
    if (profile) {
      return (
        <div style={paddedRight}>
          <Link to="/createpost">
            <IconButton iconStyle={{color: '#867DCC'}} hoveredStyle={{backgroundColor: '#FFDB77'}} tooltip="Create a Post" tooltipStyles={nunito} touch>
              <ContentCreate />
            </IconButton>

          </Link>
          <Link to="/dashboard">
            <IconButton iconStyle={{color: '#867DCC'}} hoveredStyle={{backgroundColor: '#FFDB77'}} tooltip="Dashboard" tooltipStyles={nunito} touch>
              <ActionDashboard />
            </IconButton>
          </Link>
        </div>
      );
    }
  }

  renderUserControls() {
    if (this.state.userProfile) {
      let profile = this.state.userProfile.user;
      const titleStyle = {
        color: '#FFDB77',
        fontFamily: 'Nunito'
      };
      const nunito = {
        fontFamily: 'Nunito',
        color: '#867DCC'
      };
      return (
        <ToolbarGroup lastChild={true}>
          <ToolbarTitle text={profile.name} style={titleStyle} />
          {this.renderMenu()}
        </ToolbarGroup>
      );
    }
  }

  renderMenu() {
    let profile = this.state.userProfile.user;
    const titleStyle = {
      color: '#FFDB77',
      fontFamily: 'Nunito',
      textDecoration: 'none'
    };
    const menuStyle = {
      backgroundColor: '#867DCC'
    };
    const paddedRight = {
      paddingRight: 10
    };
    return (
      <IconMenu
        iconButtonElement={<Avatar src={profile.avatar}/>}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        listStyle={menuStyle}
        style={paddedRight}
      >
        <Link to="/profile/edit" style={{textDecoration: 'none'}}>
          <MenuItem primaryText="Profile" style={titleStyle}/>
        </Link>

        <Divider />
        <MenuItem primaryText="Logout" style={titleStyle} onClick={logout} />

      </IconMenu>
    );
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
    if (this.props.profile) {
      if (!this.state.userProfile) {
        {this.getUser()}
      }
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
    return (
      <div className="Site">
        <Toolbar style={barStyle}>
          <ToolbarGroup firstChild={true}>
            <h2 style={paddedTitleStyle}>Affirmation.io</h2>
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

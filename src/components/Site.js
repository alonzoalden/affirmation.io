import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connectProfile, logout, isLoggedIn } from '../auth';
import './Site.css';
// import logo from '../logo.svg';
// <Avatar src={logo} className="Site-logo" alt="logo" style={logoStyle}/> ----> Spinning React Logo - switch to Lotus??
import axios from 'axios';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
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
import ReactTooltip from 'react-tooltip';
import Elevator from 'elevator.js';

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    ...connectProfile.PropTypes,
    children: PropTypes.any
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  getUser() {
    axios.get('/api/users/' + this.props.profile.email)
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

  componentDidMount() {
    this.generateElevatorButton();
  }

  generateElevatorButton() {
    new Elevator({
       element: document.querySelector('#elevator-button'),
       duration: 5000,
       startCallback: function() {
         console.log('elevator started');
       },
       endCallback: function() {
         console.log('elevator ended');
       }
   });
  }

  handleLogoClick() {
    if (isLoggedIn()) {
      this.context.router.push('/dashboard');
    } else {
      this.context.router.push('/home');
    }
  }

  renderLinks() {
    let profile = this.state.userProfile;
    const nunito = {
      fontFamily: 'Nunito',
      color: '#fff',
    };
    const paddedRight = {
      paddingRight: 10
    };
    const tooltip = {
      fontFamily: 'Roboto'
    };
    if (profile) {
      return (
        <div style={paddedRight}>
          <Link to="/createpost">
            <IconButton data-tip='Create Post' iconStyle={{color: '#0093FF'}} touch>
              <ContentCreate />
            </IconButton>

          </Link>
          <Link to="/dashboard">
            <IconButton data-tip='Dashboard' iconStyle={{color: '#0093FF'}} touch>
              <ActionDashboard />
            </IconButton>
          </Link>
          <ReactTooltip
            place='bottom'
            style={tooltip}
          />
        </div>
      );
    }
  }

  renderUserControls() {
    if (this.state.userProfile) {
      let profile = this.state.userProfile.user;
      const titleStyle = {
        color: '#0093FF',
        fontFamily: 'Roboto',
        fontSize: 14
      };
      const nunito = {
        fontFamily: 'Nunito',
        color: '#867DCC'
      };
      return (
        <ToolbarGroup lastChild={true}>
          <ToolbarTitle text={profile.name.toUpperCase()} style={titleStyle} />
          {this.renderMenu()}
        </ToolbarGroup>
      );
    }
  }

  renderMenu() {
    let profile = this.state.userProfile.user;
    const titleStyle = {
      color: '#fff',
      fontFamily: 'Roboto',
      fontSize: 14,
      textDecoration: 'none',
      padding: 0,
    };
    const menuStyle = {
      backgroundColor: '#333',
      padding: 0,
    };
    const paddedRight = {
      paddingRight: 10
    };
    const avatar = {
      marginTop: 32
    };
    return (
      <IconMenu
        iconButtonElement={<Avatar style={avatar} src={profile.avatar}/>}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        listStyle={menuStyle}
        style={paddedRight}
      >
        <Link to="/profile" style={{textDecoration: 'none'}}>
          <MenuItem primaryText="Profile" style={titleStyle}/>
        </Link>

        <Divider />
        <MenuItem primaryText="Logout" style={titleStyle} onClick={logout} />

      </IconMenu>
    );
  }

  render() {
    const barStyle = {
      backgroundColor: '#fff',
      height: 70
    };
    const splashBarStyle = {
      backgroundColor: '#0093FF',
      height: 120,
      paddingBottom: 0
    };
    const paddedTitleStyle = {
      fontFamily: 'Roboto',
      fontSize: 17,
      color: '#0093FF',
      paddingLeft: 30,
      paddingBottom: 8
    };
    const splashPaddedTitleStyle = {
      fontFamily: 'Roboto',
      fontSize: 17,
      color: 'white',
      paddingLeft: 60,
      paddingBottom: 8
    };
    if (this.props.profile) {
      if (!this.state.userProfile) {
        {this.getUser()}
      }
      return (
        <div>
          <div className="Site">
            <Toolbar style={barStyle}>
              <ToolbarGroup onClick={this.handleLogoClick.bind(this)} firstChild={true}>
                <h2 data-tip='Go To Dashboard' style={paddedTitleStyle}>AFFIRMATION</h2>
              </ToolbarGroup>
              <ToolbarGroup>
                {this.renderLinks()}
                {this.renderUserControls()}
              </ToolbarGroup>
            </Toolbar>
          <div className='glostick'></div>
            <div className="Site-page">
              {this.props.children}
            </div>
          </div>
          <div id="elevator-button" className="scrollButton">
            <FloatingActionButton />
          </div>
        </div>
      );
    }
    return (
      <div className="Site">
        <Toolbar style={splashBarStyle}>
          <ToolbarGroup firstChild={true}>
            <h2 style={splashPaddedTitleStyle}>AFFIRMATION.io</h2>
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

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connectProfile, logout, isLoggedIn } from '../auth';
import './Site.css';
import axios from 'axios';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Avatar from 'material-ui/Avatar';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ContentCreate from 'material-ui/svg-icons/content/create';
//Menu
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ReactTooltip from 'react-tooltip';
import Elevator from 'elevator.js';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';



class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
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
       duration: 1500,
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
            <IconButton data-tip='Create Affirmation' iconStyle={{ color: '#0093FF' }} iconHoverColor="#867dcc" touch>
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

  // renderUserControls() {
  //   if (this.state.userProfile) {
  //     let profile = this.state.userProfile.user;
  //     const titleStyle = {
  //       color: '#0093FF',
  //       fontFamily: 'Roboto',
  //       fontSize: 14
  //     };
  //     const nunito = {
  //       fontFamily: 'Nunito',
  //       color: '#867DCC'
  //     };
  //     return (
  //       <ToolbarGroup lastChild={true}>
  //         <ToolbarTitle text={profile.name.toUpperCase()} style={titleStyle} />
  //         {this.renderMenu()}
  //       </ToolbarGroup>
  //     );
  //   }
  // }

  renderMenu() {
    if (this.state.userProfile) {
      let profile = this.state.userProfile.user;
      const titleStyle = {
        color: '#0093FF',
        fontFamily: 'Roboto',
        fontSize: 14,
        cursor: 'pointer'
      };
      const itemStyle = {
        color: '#0093FF',
        fontFamily: 'Roboto',
        fontSize: 16,
        textAlign: 'center',
        cursor: 'pointer',
        width: 150,
        marginLeft: 8
      };
      const avatar = {
        marginTop: 32,
        marginRight: 10
      };
      const handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
          open: true,
          anchorEl: event.currentTarget,
        });
      };
      const handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };
      return (
        <div>
         <ToolbarGroup lastChild={true}>
           <Avatar style={avatar} src={profile.avatar}/>
           <ToolbarTitle text={profile.name.toUpperCase()} style={titleStyle} onTouchTap={handleTouchTap} />
           <Popover
             open={this.state.open}
             anchorEl={this.state.anchorEl}
             anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
             targetOrigin={{horizontal: 'left', vertical: 'top'}}
             onRequestClose={handleRequestClose}
             animation={PopoverAnimationVertical}
           >
             <Menu style={{ width: 150 }}>
               <Link to="/profile" style={{textDecoration: 'none'}}>
                  <MenuItem primaryText="Profile" style={itemStyle}/>
                </Link>
                <Divider />
                <MenuItem primaryText="Logout" style={itemStyle} onClick={logout} />
             </Menu>
           </Popover>
         </ToolbarGroup>
       </div>
      );
    }
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
      fontSize: 16,
      color: '#0093FF',
      paddingLeft: 30,
      paddingBottom: 8,
      cursor: 'pointer'
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
        this.getUser();
      }
      return (
        <div>
          <div className="Site">
            <Toolbar style={barStyle}>
              <ToolbarGroup onClick={this.handleLogoClick.bind(this)} firstChild={true}>
                <h2 style={paddedTitleStyle} className="paddedTitleStyle:hover" >AFFIRMATION</h2>
              </ToolbarGroup>
              <ToolbarGroup>
                {this.renderLinks()}
                {this.renderMenu()}
              </ToolbarGroup>
            </Toolbar>
          <div className='glostick'></div>
            <div className="Site-page">
              {this.props.children}
            </div>
          </div>
          <div id="elevator-button">
          {this.context.router.getCurrentLocation().pathname === '/dashboard' ? null :
            <div className="scrollButton">
              <FloatingActionButton backgroundColor="#867dcc">
                <ArrowUpward color="#ffffff"/>
              </FloatingActionButton>
            </div>}
          </div>
        </div>
      );
    }
    return (
      <div className="Site">
        <Toolbar style={splashBarStyle}>
          <ToolbarGroup firstChild={true}>
            <h2 style={splashPaddedTitleStyle}>AFFIRMATION</h2>
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

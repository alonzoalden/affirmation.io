import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {requireAuth} from '../auth';
import Site from './Site';
import Home from './Home';
import Login from './Login';
import EditProfile from './EditProfile';
import CreatePost from './CreatePost/CreatePost';
import SinglePost from '../containers/SinglePost/SinglePost';
import Dashboard from '../containers/Dashboard/Dashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route component={Site}>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route onEnter={requireAuth}>
              {/* Place all authenticated routes here */}
              <Route path="/profile/edit" component={EditProfile} />
              <Route path="/createpost" component={CreatePost} />
              <Route path="/singlepost" component={SinglePost} />
              <Route path="/Dashboard" component={Dashboard} />
            </Route>
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

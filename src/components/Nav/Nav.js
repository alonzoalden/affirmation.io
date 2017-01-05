import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

class Nav extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text="Affirmation.io" />
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton label="Logout" primary={true} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

export default Nav;

/**
*
* PostView
*
*/

import React from 'react';
// import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import SentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import SentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  isHelpful() {
    return (
      <Badge
        badgeContent={5}
        primary={true}
      >
        <SentimentVerySatisfied />
      </Badge>
    );
  }
  isUnhelpful() {
    return (
      <Badge
        badgeContent={5}
        primary={true}
      >
        <SentimentVeryDissatisfied />
      </Badge>
    );
  }
  render() {
    const cardStyle = {
      width: 600,
      margin: 20,
      overflow: 'auto',
    };
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div>
        <div style={center}>
          <div>
            <div style={{ margin: 20 }}>
              <Card
                style={cardStyle}
              >
                <CardHeader
                  title="Sir Testburg"
                  subtitle="Hack Reactor - San Francisco, CA"
                  avatar="https://s-media-cache-ak0.pinimg.com/564x/4d/b7/b7/4db7b7ecb39c4eebc5b8f5358773e4a2.jpg"
                />
                <CardTitle title="Professional button pusher for 15 years - I've made some things" />
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                <CardActions>
                  <FlatButton label="Is Helpful" />
                  {this.isHelpful()}
                  <FlatButton label="Is Unhelpful" />
                  {this.isUnhelpful()}
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostView;

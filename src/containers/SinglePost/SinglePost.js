/*
 *
 * SinglePost
 *
 */

import React from 'react';
import PostView from '../../components/PostView/PostView';
import axios from 'axios';
import {connectProfile} from '../../auth';


export class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  static propTypes = {
    ...connectProfile.PropTypes,
  }

  componentWillMount() {
    this.getCurrentPost();
  }

  getCurrentPost() {
    let path = this.props.location.pathname.toLowerCase();
    return axios.get('https://localhost:8000/api/posts' + path + '/' + this.props.profile.email)
      .then((result) => {
        this.setState({ post: result.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    console.log('state in SinglePost render:', this.state);
    if(this.state.post === undefined || this.state.post.sentiment === undefined) {
      return (<div>Loading Affirmation!...</div>)
    }

    return (
      <div>
        <PostView
          post={this.state.post.post[0]}
          favorites={this.state.post.favorites}
          flags={this.state.post.flags}
          sentiment={this.state.post.sentiment}
        />
      </div>
    )
  }
}

export default connectProfile(SinglePost);

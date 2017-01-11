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
      post: []
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
    return axios.get('http://localhost:8000/api/posts' + path + '/' + this.props.profile.email)
      .then((result) => {
        console.log(result);
        this.setState({ post: result.data.post })
      })
      .catch((error) => {
        console.log(error)
      })
  }


  render() {
    return (
      <div>
        {this.state.post.map((post, index) => {
          return (
            <div>
              <PostView
                post={post}
              />
            </div>
          );
        })};
      </div>
    )
  }
}

export default connectProfile(SinglePost);

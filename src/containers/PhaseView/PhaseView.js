/**
*
* PhaseView
*
*/

import React from 'react';
import axios from 'axios';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import SentimentVerySatisfied from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import SentimentVeryDissatisfied from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import PostPreview from '../../components/PostPreview/PostPreview';
import InfiniteScroll from 'react-infinite-scroller';

class PhaseView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      currentPosts: [],
      postIndexStart: 0,
      postIndexEnd: 3,
      hasMoreItems: true,
    }
  }

  componentDidMount() {
    this.getPreviewPosts();
  }

  getPreviewPosts() {
    let phase = this.props.location.pathname.toLowerCase()
    return axios.get('/api/posts' + phase)
      .then((arr) => {
          arr.data.sort((a,b) => {
            return (a.sentiment < b.sentiment) ? 1 : -1
          })
          this.setState({
            allPosts: arr.data,
            currentPosts: arr.data.slice(0,3),
          })
      })
  }

  loadItems(page, end) {
    //have index in nmber in state
    //slice array based off index #
    //raise index number in state

    let loadedPosts = this.state.currentPosts
    let postSection = this.state.allPosts.slice(0, end)
    console.log(postSection)

    // postSection.map((post, index) => {
    //   loadedPosts.push(post)
    // })

    this.setState({
      currentPosts: postSection,
      // postIndexStart: this.state.postIndexStart + 3,
      postIndexEnd: this.state.postIndexEnd + 1,
    })

    if (this.state.currentPosts.length >= this.state.allPosts.length) {
      this.setState({
        hasMoreItems: false,
      })
    }
}

    //  if (this.state.postIndex >= this.state.allPosts.length-1) {
    //     this.setState({
    //       hasMoreItems: false
    //     })
    //   }
    //   if (index >= this.state.postIndex && index < this.state.postIndex + 3) {
    //      currentPosts.push(post)
    //      console.log(currentPosts, this.state.currentPosts.length, this.state.allPosts.length)

    //      console.log(this.state.currentPosts, "ALL POSTS", this.state.hasMoreItems)
    //   }

    //   if (index === this.state.postIndex+3) {
    //     this.setState({
    //       postIndex: this.state.postIndex+3
    //     })
    //     console.log('POST INDEx' + this.state.postIndex, index, this.state.hasMoreItems)
    //     return
    //   }

    // })
    //}


  render() {

    const loader = <div className="loader"><center>Loading...</center></div>

    let itemViews = []
    this.state.currentPosts.map((post) => {
      itemViews.push( <div><PostPreview post={post} /></div> )
    })
      return (
          <InfiniteScroll
              pageStart={0}
              loadMore={this.loadItems.bind(this, this.state.postIndexEnd)}
              hasMore={this.state.hasMoreItems}
              loader={loader}>

              {itemViews}

          </InfiniteScroll>
      );


    // return (
    //   <div>
    //     {this.state.posts.map((post, index) => {
    //       return (
    //         <div>
    //           <PostPreview
    //             post={post}
    //           />
    //         </div>
    //       )
    //     })}
    //   </div>
    // )
  }
}

export default PhaseView;

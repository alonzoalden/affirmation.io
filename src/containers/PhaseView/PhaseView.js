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
      postIndexEnd: 5,
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
            currentPosts: arr.data.slice(0,5),
          })
      })
      .then(() => {
        //this.loadItems(this)
      })
  }

  loadItems(page, start) {
  if (this.state.allPosts.length === 0) {


    let phase = this.props.location.pathname.toLowerCase()
    return axios.get('/api/posts' + phase)
      .then((arr) => {
          arr.data.sort((a,b) => {
            return (a.sentiment < b.sentiment) ? 1 : -1
          })
          this.setState({
            allPosts: arr.data,
            currentPosts: [],
          })
      })
      // .then(() => {
      //   this.loadItems(this, this.state.postIndexStart, this.state.postIndexEnd)
      // })

    } else {
    let postSection = this.state.allPosts.slice(this.state.postIndexStart, (this.state.postIndexStart+5))

    console.log(postSection, "asdf", start, this.state.currentPosts.length, this.state.allPosts.length)

    let posts = this.state.currentPosts
    postSection.map((post, index) => {
      posts.push(post)
      console.log(this.state.currentPosts)
    })

    this.setState({
      currentPosts: posts,
      postIndexStart: this.state.postIndexStart +5,
      //postIndexEnd: this.state.postIndexEnd +5,
    })

    if (this.state.postIndexStart >= this.state.allPosts.length) {
      this.setState({
        hasMoreItems: false,
      })
      console.log(this.state.hasMoreItems, "LASDFASDF", this.state.currentPosts.length, this.state.allPosts.length)
    }


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
              loadMore={this.loadItems.bind(this, this.state.postIndexStart)}
              hasMore={this.state.hasMoreItems}
              loader={loader}>

              {itemViews}

          </InfiniteScroll>
      );


    // return (
    //   <div>
    //     {this.state.allPosts.map((post, index) => {
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

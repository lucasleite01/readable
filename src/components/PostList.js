import React, { Component } from 'react';
import { ListGroup, Badge } from 'reactstrap';
import * as ReadableAPI from '../api-server/ReadableAPI';
import PostContent from './PostContent.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    ReadableAPI.getCategories().then((data) => {
      this.setState({
        categories: data,
      });
    });
  }

  render() {
    const { postList, detailPostPage } = this.props;
    const { categories } = this.state;
    // console.log(this.props);
    let newCategories = categories.map((category) => {
      return {
        name: category.name,
        path: `/${category.path}`
      };
    });

    return (
      <div>
        <div>Categories:
          {
            newCategories.map((category) => (
              <Link to={category.path} key={category.name}>
                <Badge color="warning">{category.name}</Badge>
              </Link>
            ))
          }
        </div>
        {detailPostPage ?
          <h3>Post Details</h3>
          :
          <h3>Posts</h3>
        }
          <ListGroup>
          {
            postList.map(post => (
              post.deleted && detailPostPage ?
                <div key={post.id}>
                  <h3>
                    Error 404 for <code>{this.props.match.params.url}</code>
                  </h3>
                </div>
              : post.deleted && !detailPostPage ?
                null
              :
                <PostContent
                key={post.id}
                post={post}
                showBodyComments={detailPostPage}>
                </PostContent>
            ))
          }
          </ListGroup>
      </div>
    );
  }
}

function mapStateToProps({post, comment}, props) {
  const { orderBy, match } = props;
  let newPostList = [];

  if (post !== null && post !== undefined) {
    Object.keys(post).forEach((key) => {
      newPostList.push(post[key]);
    });
    /*REMOVING _persist*/
    newPostList.pop();

    /*REMOVING DELETED POSTS FROM VIEW*/
    // newPostList = newPostList.filter((post) => post.deleted !== true);

    /*FILTER BY CATEGORY*/
    if (match.params.category !== null && match.params.category !== undefined) {
      newPostList = newPostList.filter((post) => post.category === match.params.category);
    }

    /*FILTER BY POST ID*/
    if (match.params.post_id !== null && match.params.post_id !== undefined) {
      newPostList = newPostList.filter((post) => post.id === match.params.post_id);
    }

    /*ORDERING POSTS*/
    if (orderBy === 'vote') { //order posts by score
      newPostList.sort((a, b) => {return b.voteScore - a.voteScore;})
    } else if (orderBy === 'date') { //order posts by date
      newPostList.sort((a, b) => {return b.timestamp - a.timestamp;})
    } else if (orderBy === 'comment') { //order posts by comment
      newPostList.sort((a, b) => {return b.commentCount - a.commentCount;})
    }
  }

  return {
    postList: newPostList
  }
}

export default withRouter(connect(mapStateToProps)(PostList));

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Badge, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { connect } from 'react-redux';
import { voteUp } from '../actions';
import * as PostsAPI from '../api-server/PostsAPI';

class PostContent extends Component {

  constructor(props) {
    super();
    this.state = {
      showBody: false,
    };
    this.incrementVote = this.incrementVote.bind(this);
    this.decrementVote = this.decrementVote.bind(this);
  }

  incrementVote(post) {
    const { voteUp } = this.props;

    PostsAPI.incrementVote(post, 'upVote').then((data) => {
      // console.log("incrementVote", data);
      voteUp(data);
    });
  }

  decrementVote(post) {
    const { voteUp } = this.props;
    PostsAPI.incrementVote(post, 'downVote').then((data) => {
      voteUp(data);
    });
  }
  // static propTypes = {
  //   post: PropTypes.Object.isRequired
  // }

  render() {
    const { post, showBody } = this.props;
    // console.log(this.props);
    return (
      <ListGroupItem>
        <ListGroupItemHeading>
        {post.title} <Badge color="info">{post.category}</Badge>
        </ListGroupItemHeading>
        <Badge href="#" color="success" onClick={() => this.incrementVote(post)}>up</Badge>
        <Badge href="#" color="danger" onClick={() => this.decrementVote(post)}>down</Badge>
        <ListGroupItemText>
          Author: {post.author} | Comments: {post.commentCount} | Score: {post.voteScore}
        </ListGroupItemText>
        <ListGroupItemText>
        {showBody ?
          post.body
          :
          null
        }
        </ListGroupItemText>
      </ListGroupItem>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteUp: (data) => dispatch(voteUp(data)),
  }
}

export default connect(null, mapDispatchToProps)(PostContent);

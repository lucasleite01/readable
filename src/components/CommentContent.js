import React, { Component } from 'react';
import { Badge, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { voteUpComment, voteDownComment, deleteComment, editComment } from '../actions';
import { connect } from 'react-redux';
import * as ReadableAPI from '../api-server/ReadableAPI';

class CommentContent extends Component {

  constructor(props) {
    super(props);
    this.incrementVote = this.incrementVote.bind(this);
    this.decrementVote = this.decrementVote.bind(this);
  }

  incrementVote(comment) {
    ReadableAPI.changeVoteComment(comment, 'upVote').then((data) => {
      console.log("commentUp", data);
      this.props.voteUpComment(data);
    });
  }

  decrementVote(comment) {
    ReadableAPI.changeVoteComment(comment, 'downVote').then((data) => {
      console.log("commentDown", data);
      this.props.voteUpComment(data);
    });
  }

  render() {
    console.log(this.props);
    const { comment } = this.props;
    return (
      <ListGroup>
        <ListGroupItem>
          <Badge href="#" color="secondary" onClick={() => this.incrementVote(comment)}>up</Badge>
          <Badge href="#" color="secondary" onClick={() => this.decrementVote(comment)}>down</Badge>
          /
          <Badge href="#" color="info" >edit</Badge>
          <Badge href="#" color="danger" >del</Badge>
          / Score: {comment.voteScore}
          <ListGroupItemHeading>
            {comment.author} says:
          </ListGroupItemHeading>
          <ListGroupItemText>
            {comment.body}
          </ListGroupItemText>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteUpComment: (data) => dispatch(voteUpComment(data)),
    voteDownComment: (data) => dispatch(voteDownComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    editComment: (data) => dispatch(editComment(data))
  }
}

export default connect(null, mapDispatchToProps)(CommentContent);

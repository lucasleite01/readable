import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import CommentContent from './CommentContent.js';
import { connect } from 'react-redux';

class CommentList extends Component {

  render() {
    const { commentList, parentId } = this.props;
    return (
      <ListGroup>
        {
          commentList.filter((comment) => comment.parentId === parentId).map((comment) => (
            <CommentContent
              key={comment.id}
              comment={comment}
            />
          ))
        }
      </ListGroup>
    )
  }
}

function mapStateToProps({post, comment, category}, props) {
  let newCommentList = [];

  if (comment !== null && comment !== undefined) {
    Object.keys(comment).forEach((key) => {
      newCommentList.push(comment[key]);
    });
    /*REMOVING _persist*/
    newCommentList.pop();
  }

  /*REMOVING DELETED COMMENTS FROM VIEW*/
  // console.log("newCommentList", newCommentList);
  newCommentList = newCommentList.filter((cmt) => cmt.deleted !== true);

  return {
    commentList: newCommentList
  }
}

export default connect(mapStateToProps)(CommentList);

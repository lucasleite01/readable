import React, { Component } from 'react';
import { Badge, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { voteUpComment, voteDownComment, deleteComment, editComment } from '../actions';
import { connect } from 'react-redux';
import * as ReadableAPI from '../api-server/ReadableAPI';

class CommentContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      commentBody: ''
    }
    this.incrementVote = this.incrementVote.bind(this);
    this.decrementVote = this.decrementVote.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.returnDate = this.returnDate.bind(this);
  }

  componentDidMount() {
    this.setState({
      commentBody: this.props.comment.body
    });
  }

  incrementVote(comment) {
    ReadableAPI.changeVoteComment(comment, 'upVote').then((data) => {
      this.props.voteUpComment(data);
    });
  }

  decrementVote(comment) {
    ReadableAPI.changeVoteComment(comment, 'downVote').then((data) => {
      this.props.voteUpComment(data);
    });
  }

  removeComment(post) {
    ReadableAPI.deleteComment(post).then((data) => {
      this.props.deleteComment(data);
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleBodyChange(event) {
    this.setState({commentBody: event.target.value});
  }

  updateComment() {
    const { commentBody} = this.state

    let newComment = {
      id: this.props.comment.id,
      timestamp: Date.now(),
      body: commentBody
    }

    ReadableAPI.editComment(newComment).then((data) => {
      this.props.editComment(data);
    });

    this.setState({
      commentBody: ''
    });
    this.toggle();
  }

  returnDate(timestamp) {
    return new Date(timestamp).toGMTString();
  }

  render() {
    const { comment } = this.props;
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            <Badge href="#" color="secondary" onClick={() => this.incrementVote(comment)}>up</Badge>
            <Badge href="#" color="secondary" onClick={() => this.decrementVote(comment)}>down</Badge>
            /
            <Badge href="#" color="info" onClick={this.toggle}>edit</Badge>
            <Badge href="#" color="danger" onClick={() => this.removeComment(comment)}>del</Badge>
            / Score: {comment.voteScore} | Date: {this.returnDate(comment.timestamp)}
            <ListGroupItemHeading>
              {comment.author} says:
            </ListGroupItemHeading>
            <ListGroupItemText>
              {comment.body}
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Comment</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for="postBody" sm={2}>Comment</Label>
                  <Col sm={10}>
                    <Input type="textarea" value={this.state.commentBody} onChange={this.handleBodyChange}/>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateComment}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
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

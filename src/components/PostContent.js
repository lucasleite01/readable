import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Badge, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { voteUp, voteDown, deletePost, editPost } from '../actions';
import * as PostsAPI from '../api-server/PostsAPI';

class PostContent extends Component {

  constructor(props) {
    super();
    this.state = {
      showBody: false,
      modal: false,
      postTitle: '',
      postBody: ''
    };
    this.incrementVote = this.incrementVote.bind(this);
    this.decrementVote = this.decrementVote.bind(this);
    this.removePost = this.removePost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.returnDate = this.returnDate.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.updatePost = this.updatePost.bind(this);
  }

  componentDidMount() {
    const { post } = this.props;
    this.setState({
      postTitle: post.title,
      postBody: post.body
    });
  }

  incrementVote(post) {
    PostsAPI.changeVote(post, 'upVote').then((data) => {
      this.props.voteUp(data);
    });
  }

  decrementVote(post) {
    PostsAPI.changeVote(post, 'downVote').then((data) => {
      this.props.voteDown(data);
    });
  }

  removePost(post) {
    PostsAPI.deletePost(post).then((data) => {
      this.props.deletePost(data);
    });
  }

  editPost(post) {
    PostsAPI.editPost(post).then((data) => {
      console.log(data);
      //this.props.editPost(data);
    });
  }

  returnDate(timestamp) {
    return new Date(timestamp).toGMTString();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      postTitle: this.props.post.title,
      postBody: this.props.post.body
    });
  }

  handleTitleChange(event) {
    this.setState({postTitle: event.target.value});
  }

  handleBodyChange(event) {
    this.setState({postBody: event.target.value});
  }

  updatePost() {
    const { postTitle, postBody} = this.state
    const { post } = this.props;

    let newPost = {
      ...post,
      title: postTitle,
      body: postBody
    }

    PostsAPI.editPost(newPost).then((data) => {
      console.log("data", data);
      this.props.editPost(data);
    });

    this.toggle();
  }
  // static propTypes = {
  //   post: PropTypes.Object.isRequired
  // }

  render() {
    const { post, showBody } = this.props;
    // console.log(this.props);
    return (
      <div>
        <ListGroupItem>
          <ListGroupItemHeading>
          {post.title} <Badge color="warning">{post.category}</Badge>
          </ListGroupItemHeading>
          <Badge href="#" color="secondary" onClick={() => this.incrementVote(post)}>up</Badge>
          <Badge href="#" color="secondary" onClick={() => this.decrementVote(post)}>down</Badge>
          /
          <Badge href="#" color="info" onClick={this.toggle}>edit</Badge>
          <Badge href="#" color="danger" onClick={() => this.removePost(post)}>del</Badge>
          <ListGroupItemText>
            Author: {post.author} | Comments: {post.commentCount} | Score: {post.voteScore} | Date: {this.returnDate(post.timestamp)}
          </ListGroupItemText>
          <ListGroupItemText>
          {showBody ?
            post.body
            :
            null
          }
          </ListGroupItemText>
        </ListGroupItem>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Post</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for="postTitle" sm={2}>Title</Label>
                  <Col sm={10}>
                    <Input type="text" value={this.state.postTitle} onChange={this.handleTitleChange}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="postBody" sm={2}>Body</Label>
                  <Col sm={10}>
                    <Input type="text" value={this.state.postBody} onChange={this.handleBodyChange}/>
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updatePost}>Update</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteUp: (data) => dispatch(voteUp(data)),
    voteDown: (data) => dispatch(voteDown(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    editPost: (data) => dispatch(editPost(data))
  }
}

export default connect(null, mapDispatchToProps)(PostContent);

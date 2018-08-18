import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import * as ReadableAPI from '../api-server/ReadableAPI';
import { connect } from 'react-redux';
import { addComment, editPost } from '../actions';
import { withRouter } from 'react-router';

const uuidv4 = require('uuid/v4');

class AddComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      formBody: '',
      formAuthor: '',
      bodyFilled: true,
      authorFilled: true
    };
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.createComment = this.createComment.bind(this);
    this.resetFormToInicialState = this.resetFormToInicialState.bind(this);
  }

  componentDidMount() {
    this.resetFormToInicialState();
  }

  handleBodyChange(event) {
    this.setState({ formBody: event.target.value});
    if (event.target.value === '') {
      this.setState({ bodyFilled: false })
    } else {
      this.setState({ bodyFilled: true })
    }
  }

  handleAuthorChange(event) {
    this.setState({ formAuthor: event.target.value});
    if (event.target.value === '') {
      this.setState({ authorFilled: false })
    } else {
      this.setState({ authorFilled: true })
    }
  }

  createComment() {
    const { uuid, formBody, formAuthor } = this.state;

    if (formBody === '' || formAuthor === '') {


      if (formBody === '') {
        this.setState({
          bodyFilled: false,
        });
      }
      if (formAuthor === '') {
        this.setState({
          authorFilled: false
        });
      }
    } else { //valid form input

      let newComment = {
        id: uuid,
        timestamp: Date.now(),
        body: formBody,
        author: formAuthor,
        parentId: this.props.match.url.split("/")[2]
      }

      ReadableAPI.addComment(newComment).then((data) => {
        this.props.addComment(data);
        // console.log("addComment", data);

        ReadableAPI.getPosts().then((data) => {
          // console.log("newComment", newComment);
          let post = data.filter((post) => post.id === newComment.parentId);
          // console.log("post", post);

          ReadableAPI.editPost(post[0]).then((data) => {
            // console.log("editPost", data);
            this.props.editPost(data);
          });
        });
      });

      this.resetFormToInicialState();
      this.props.history.goBack();
    } //end else
  }

  resetFormToInicialState() {
    ReadableAPI.getCategories().then((data) => {
      this.setState({
        uuid: uuidv4(),
        formBody: '',
        formAuthor: '',
        bodyFilled: true,
        authorFilled: true
      });
    });
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h3>New Comment</h3>
        <Form>
          <FormGroup row>
            <Label for="postBody" sm={2}>Body</Label>
            <Col sm={10}>
              <Input type="text" value={this.state.formBody} onChange={this.handleBodyChange} invalid={!this.state.bodyFilled}/>
              <FormFeedback>Please, insert a body</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="postAuthor" sm={2}>Author</Label>
            <Col sm={10}>
              <Input type="text" value={this.state.formAuthor} onChange={this.handleAuthorChange} invalid={!this.state.authorFilled}/>
              <FormFeedback>Please, insert an author</FormFeedback>
            </Col>
          </FormGroup>
        </Form>
        <Button color="primary" onClick={this.createComment}>Create comment</Button>
        <Button color="secondary" onClick={history.goBack}>Back</Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (data) => dispatch(addComment(data)),
    editPost:(data) => dispatch(editPost(data))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AddComment));

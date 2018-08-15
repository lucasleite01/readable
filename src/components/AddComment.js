import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import * as ReadableAPI from '../api-server/ReadableAPI';
// import { Row, ListGroup } from 'reactstrap';
// import PostContent from './PostContent.js';
import { connect } from 'react-redux';
import { addComment } from '../actions';
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
    let newComment = {
      id: uuid,
      timestamp: Date.now(),
      body: formBody,
      author: formAuthor,
      parentId: this.props.match.url.split("/")[2]
    }

    ReadableAPI.addComment(newComment).then((data) => {
      this.props.addComment(data);
    });

    this.resetFormToInicialState();
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
    // console.log(uuidv4());
    // console.log(this.props);
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
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (data) => dispatch(addComment(data))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AddComment));

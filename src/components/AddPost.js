import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import * as PostsAPI from '../api-server/PostsAPI';
// import { Row, ListGroup } from 'reactstrap';
// import PostContent from './PostContent.js';
import { connect } from 'react-redux';
import { addPost } from '../actions';

const uuidv4 = require('uuid/v4');

class AddPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      uuid: null,
      formTitle: '',
      formBody: '',
      formAuthor: '',
      formCategory: '',
      titleFilled: true,
      bodyFilled: true,
      authorFilled: true
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.createPost = this.createPost.bind(this);
    this.resetFormToInicialState = this.resetFormToInicialState.bind(this);
  }

  componentDidMount() {
    this.resetFormToInicialState();
  }

  handleTitleChange(event) {
    this.setState({ formTitle: event.target.value});
    if (event.target.value === '') {
      this.setState({ titleFilled: false })
    } else {
      this.setState({ titleFilled: true })
    }
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

  handleCategoryChange(event) {
    this.setState({ formCategory: event.target.value});
  }

  createPost() {
    const { uuid, formTitle, formBody, formAuthor, formCategory } = this.state;
    let newPost = {
      id: uuid,
      timestamp: Date.now(),
      title: formTitle,
      body: formBody,
      author: formAuthor,
      category: formCategory
    }
    console.log("newPost", newPost);
    PostsAPI.addPost(newPost).then((data) => {
      this.props.addPost(data);
    });

    this.resetFormToInicialState();
  }

  resetFormToInicialState() {
    PostsAPI.getCategories().then((data) => {
      this.setState({
        categories: data,
        uuid: uuidv4(),
        formTitle: '',
        formBody: '',
        formAuthor: '',
        formCategory: data[0].name,
        titleFilled: true,
        bodyFilled: true,
        authorFilled: true
      });
    });
  }

  render() {
    // console.log(uuidv4());
    // console.log(this.state);
    return (
      <div>
        <h3>New Post</h3>
        <Form>
          <FormGroup row>
            <Label for="postTitle" sm={2}>Title</Label>
            <Col sm={10}>
              <Input type="text" value={this.state.formTitle} onChange={this.handleTitleChange} invalid={!this.state.titleFilled}/>
              <FormFeedback>Please, insert a title</FormFeedback>
            </Col>
          </FormGroup>
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
          <FormGroup row>
            <Label for="category" sm={2}>Category</Label>
            <Col sm={10}>
              <Input type="select" value={this.state.formCategory} onChange={this.handleCategoryChange}>
              {
                this.state.categories.map((category) => (
                  <option key={category.name} value={category.name}>{category.name}</option>
                ))
              }
              </Input>
            </Col>
          </FormGroup>
        </Form>
        <Button color="primary" onClick={this.createPost}>Create post</Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data))
  }
}

export default connect(null, mapDispatchToProps)(AddPost);

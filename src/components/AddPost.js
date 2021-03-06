import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import * as ReadableAPI from '../api-server/ReadableAPI';
import { connect } from 'react-redux';
import { addPost } from '../actions';
import { withRouter, Redirect } from 'react-router';

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
      authorFilled: true,
      nextPage: null,
      redirect: false
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

    if (formTitle === '' || formBody === '' || formAuthor === ''  ) {

      if (formTitle === '') {
        this.setState({
          titleFilled: false,
        });
      }
      if (formBody === '') {
        this.setState({
          bodyFilled: false
        });
      }
      if (formAuthor === '') {
        this.setState({
          authorFilled: false
        });
      }
    } else { //valid form input
      let newPost = {
        id: uuid,
        timestamp: Date.now(),
        title: formTitle,
        body: formBody,
        author: formAuthor,
        category: formCategory
      }

      ReadableAPI.addPost(newPost).then((data) => {
        this.props.addPost(data);
        this.setState({
          nextPage: `/${formCategory}/${uuid}`,
          redirect: true
        })
      });
    }
  }

  resetFormToInicialState() {
    this.setState({
      categories: this.props.categoryList,
      uuid: uuidv4(),
      formTitle: '',
      formBody: '',
      formAuthor: '',
      formCategory: this.props.categoryList[0].name,
      titleFilled: true,
      bodyFilled: true,
      authorFilled: true,
      nextPage: null,
      redirect: false
    });
  }

  render() {
    const { history } = this.props;
    return (
      <div>
      {this.state.redirect ?
        <Redirect
        to={{
          pathname: this.state.nextPage,
          state: { from: this.props.location }
        }}
        />
        :
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
                this.props.categoryList.map((category) => (
                  <option key={category.name} value={category.name}>{category.name}</option>
                ))
              }
              </Input>
            </Col>
          </FormGroup>
        </Form>
        <Button color="primary" onClick={this.createPost}>Create post</Button>
        <Button color="secondary" onClick={history.goBack}>Back</Button>
        </div>
      }
      </div>
    );
  }
}

function mapStateToProps({post, comment, category}, props) {
  let newCategoryList = []

  Object.keys(category).forEach((key) => {
    newCategoryList.push(category[key]);
  });
  /*REMOVING _persist*/
  newCategoryList.pop();

  return {
    categoryList: newCategoryList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPost));

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import * as ReadableAPI from '../api-server/ReadableAPI';
import { connect } from 'react-redux';
import { addCategory } from '../actions';
import { withRouter } from 'react-router';

class AddCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formName: '',
      formPath: '',
      nameFilled: true,
      pathFilled: true
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePathChange = this.handlePathChange.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.resetFormToInicialState = this.resetFormToInicialState.bind(this);
  }

  componentDidMount() {
    this.resetFormToInicialState();
  }

  handleNameChange(event) {
    this.setState({ formName: event.target.value});
    if (event.target.value === '') {
      this.setState({ nameFilled: false })
    } else {
      this.setState({ nameFilled: true })
    }
  }

  handlePathChange(event) {
    this.setState({ formPath: event.target.value});
    if (event.target.value === '') {
      this.setState({ pathFilled: false })
    } else {
      this.setState({ pathFilled: true })
    }
  }

  createCategory() {
    const { formName, formPath } = this.state;

    if (formName === '' || formPath === '') {

      if (formName === '') {
        this.setState({
          nameFilled: false,
        });
      }
      if (formPath === '') {
        this.setState({
          pathFilled: false
        });
      }
    } else { //valid form input

      let newCategory = {
        name: formName,
        path: formPath,
      }
      // console.log("newCategory", newCategory);
      ReadableAPI.addCategory(newCategory).then((data) => {
        // console.log("addCategory", data);
        this.props.addCategory(data);
      });

      this.resetFormToInicialState();
      this.props.history.goBack();
    } //end else
  }

  resetFormToInicialState() {
    this.setState({
      formName: '',
      formPath: '',
      nameFilled: true,
      pathFilled: true
    });
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h3>New Category</h3>
        <Form>
          <FormGroup row>
            <Label for="categoryName" sm={2}>Name</Label>
            <Col sm={10}>
              <Input type="text" value={this.state.formName} onChange={this.handleNameChange} invalid={!this.state.nameFilled}/>
              <FormFeedback>Please, insert a name</FormFeedback>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="categoryPath" sm={2}>Path</Label>
            <Col sm={10}>
              <Input type="text" value={this.state.formPath} onChange={this.handlePathChange} invalid={!this.state.pathFilled}/>
              <FormFeedback>Please, insert a path</FormFeedback>
            </Col>
          </FormGroup>
        </Form>
        <Button color="primary" onClick={this.createCategory}>Create category</Button>
        <Button color="secondary" onClick={history.goBack}>Back</Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCategory: (data) => dispatch(addCategory(data)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(AddCategory));

import React, { Component } from 'react';
import './App.css';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import PostList from './components/PostList.js'
// import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      orderBy: 'default', //'default', 'vote', 'date', comment
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Container>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Readable</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Order by
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => this.setState({orderBy: 'comment'})}>
                    Comment
                  </DropdownItem>
                  <DropdownItem onClick={() => this.setState({orderBy: 'date'})}>
                    Date
                  </DropdownItem>
                  <DropdownItem onClick={() => this.setState({orderBy: 'vote'})}>
                    Vote
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => this.setState({orderBy: 'default'})}>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <h3>Posts</h3>
        <PostList orderBy={this.state.orderBy}>
        </PostList>
      </Container>
    );
  }
}

export default App;
//export default connect()(App);

import React, { Component, Fragment } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export class Error_Page extends Component {
  render() {
    return (
    <Fragment>
      <Container textAlign="center">
        <Header as="h3">Sorry you have reached this page in 404 error, please logout and login as another user</Header>
        <Link to="/"> Home </Link>
      </Container>
      </Fragment>
    );
  }
}

export default Error_Page;

import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

export class Error_Page extends Component {
  render() {
    return (
      <Container textAlign="center">
        <Header as="h3">Sorry you have reached this page in error, please logout and login as another user</Header>
      </Container>
    );
  }
}

export default Error_Page;

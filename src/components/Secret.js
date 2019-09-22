import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

export class Secret extends Component {
  render() {
    return (
      <Container textAlign="center">
        <Header as="h3">Protected Page</Header>
      </Container>
    );
  }
}

export default Secret;

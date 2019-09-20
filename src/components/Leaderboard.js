import React from 'react';
import { Container, Header, Image, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Leaderboard(props) {
  const { users } = props;

  return (
    <Container>
        <Table basic='very' celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Questions Created</Table.HeaderCell>
              <Table.HeaderCell>Questions Answered</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {users.map((user, index) => (
            <Table.Row key={user.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={user.avatarURL} alt={`${user.name}`} rounded size='mini' />
                  <Header.Content>
                    {user.name}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>{user.questions.length}</Table.Cell>
              <Table.Cell>{Object.keys(user.answers).length}</Table.Cell>
              <Table.Cell>{user.questions.length + Object.keys(user.answers).length}</Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
    </Container>
  );
}
Leaderboard.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = ({ users }) => {
  const userScore = user =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
  }
};

export default connect(mapStateToProps)(Leaderboard)

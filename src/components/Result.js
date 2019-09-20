import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, Segment, Progress, Label, Button } from 'semantic-ui-react';


const YourVoteLabel = () => (
  <Label color='green' attached='top right' mini='mini'>
        Your Vote
  </Label>

);

export class Result extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };
  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];
    const selected = userVote === 'optionOne' ? true : false;


    return (
      <Fragment>
        <Header as="h3">
          Results:
          <Header.Subheader style={{ fontWeight: 'bold' }}>
            Would you rather
          </Header.Subheader>
        </Header>
        {selected === true ? (
          <Fragment>
            <Segment color='blue'>
              {selected && <YourVoteLabel />}
              <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
              <Progress
                percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
                color='blue'
                progress>
                {optionOneVotes} out of {votesTotal} votes
              </Progress>
            </Segment>
            <Segment>
              {!selected && <YourVoteLabel />}
              <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
              <Progress
                percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
                progress>
                {optionTwoVotes} out of {votesTotal} votes
              </Progress>
            </Segment>
          </Fragment>
        ) : (
            <Fragment>
              <Segment>
                {selected && <YourVoteLabel />}
                <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
                <Progress
                  percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
                  progress>
                  {optionOneVotes} out of {votesTotal} votes
                </Progress>
              </Segment>
            <Segment color='blue'>
              {!selected && <YourVoteLabel />}
              <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
              <Progress
                percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
                color='blue'
                progress>
                {optionTwoVotes} out of {votesTotal} votes
              </Progress>
            </Segment>
          </Fragment>
        )}

        <Button fluid onClick={this.handleClick}>
          Back
        </Button>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const user = users[authedUser];
  return {
    user
  };
}

export default withRouter(connect(mapStateToProps)(Result));

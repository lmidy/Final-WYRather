import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from  'prop-types';
import Question from './Question.js';
import Summary from './Summary.js';
import Result from './Result.js';
import { formatDatenoTime } from '../utils/helpers';

const bodyTypes = {
  SUMMARY: 'SUMMARY',
  QUESTION: 'QUESTION',
  RESULT: 'RESULT'
};

const InnerCard = props => {
  const { bodyType, question, votedQuestion } = props;

  switch (bodyType) {
    case bodyTypes.SUMMARY:
      return <Summary question={question} votedQuestion={votedQuestion}/>;
    case bodyTypes.QUESTION:
      return <Question question={question} />;
    case bodyTypes.RESULT:
      return <Result question={question} />;
    default:
      return;
  }
};

export class WouldYouRatherWidget extends Component {
  static propTypes = {
    question: PropTypes.object,
    author: PropTypes.object,
    bodyType: PropTypes.string,
    question_id: PropTypes.string
  };
    render() {
      const {
        author,
        question,
        bodyType,
        errorPage,
        formattedate,
        votedQuestion = null
      } = this.props;

      if (errorPage === true) {
        return <Redirect to="/questions/error_Page" />;
      }

      return (
        <Card.Group centered>
          <Card id='{question_id}'>
           <Card.Content>
            <Image
               src={author.avatarURL}
               floated='right'
               avatar
             />
             <Card.Header>{author.name} asks: </Card.Header>
             <Card.Meta> added {formattedate}
             </Card.Meta>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                 <InnerCard
                  bodyType={bodyType}
                  question={question}
                  votedQuestion={votedQuestion}
                  />
               </Card.Description>
             </Card.Content>
           </Card>
         </Card.Group>
      );
    }
  }


  function mapStateToProps ({users, questions, authedUser},{ match, question_id })
  {
    let question, author, bodyType, timestamp, formattedate, errorPage = false;
  //  const formattedate = formatDate(timestamp);
    if (question_id !== undefined) {
      question = questions[question_id];
      timestamp = questions[question_id].timestamp;
      formattedate = formatDatenoTime(timestamp);
      //console.log(formattedate);
      author = users[question.author];
      bodyType = bodyTypes.SUMMARY;
    } else {
      const { question_id } = match.params;
      question = questions[question_id];
      const user = users[authedUser];

      if (question === undefined) {
        errorPage = true;
      } else {
        author = users[question.author];
        bodyType = bodyTypes.QUESTION;
        if (Object.keys(user.answers).includes(question.id)) {
          bodyType = bodyTypes.RESULT;
      }
    }
  }

  return { errorPage, question, author, bodyType, formattedate
  };
}

export default connect(mapStateToProps)(WouldYouRatherWidget);

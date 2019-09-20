import React, { Component } from 'react';
import { connect } from 'react-redux';
import WouldYouRatherWidget from './WouldYouRatherWidget';
import { Container, Tab, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Home extends Component {
  static propTypes = {
    allQuestions: PropTypes.object.isRequired
  }

 //  addmorequestions() {
 //   if (...allQuestions.unaswered.length) ) {
 //     return <Redirect to='/add' />
 //   }
 // }
  render() {
    const { allQuestions } = this.props;
    const color = 'blue';


    return (
      <Container>
        <Tab widths={2} menu={{color, inverted: true, attached: false, tabular: false }} panes={panes({ allQuestions })} />
      </Container>
    );

  }
}
//TODO: Condition so that when table is empty they are directed to add

  const panes = props => {
  const { allQuestions } = props;

  return [
    {
      menuItem: 'Unaswered Questions',
      render: () => (
        <Tab.Pane attached={false}>
          {allQuestions.unansweredQuestions.map(question => (
            <WouldYouRatherWidget
              key={question.id}
              question_id={question.id}
              votedQuestion={false}
            />
          ))}
          <Segment disabled>Add more questions</Segment>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Answered Questions',
      render: () => (
        <Tab.Pane attached={false}>
            {allQuestions.answeredQuestions.map(question => (
              <WouldYouRatherWidget
                key={question.id}
                question_id={question.id}
                votedQuestion={true}
                />
            ))}
        </Tab.Pane>
      )
    }
  ];
};


function mapStateToProps ({ questions, users, authedUser }){
      const answeredIds = Object.keys(users[authedUser].answers);
       const unansweredQuestions = Object.values(questions)
         .filter(question => !answeredIds.includes(question.id))
         .sort((a, b) => b.timestamp - a.timestamp);
       const answeredQuestions = Object.values(questions)
         .filter(question => answeredIds.includes(question.id))
         .sort((a, b) => b.timestamp - a.timestamp);

  return {
    allQuestions: {
      answeredQuestions,
      unansweredQuestions
    }
  };
}

export default connect(mapStateToProps)(Home)

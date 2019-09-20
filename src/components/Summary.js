import React, { Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';
import PropTypes from  'prop-types';

export class Summary extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    votedQuestion: PropTypes.bool.isRequired,
    };
    state = {
      viewPoll: false
    };
    handleClick = e => {
      this.setState(prevState => ({ viewSummary: !prevState.viewSummary
      }));
    };
    render() {
      const { question, votedQuestion } = this.props;
      const buttonContent = votedQuestion === true ? 'View Voting Results' : 'Select Option';

      if (this.state.viewSummary === true) {
        return <Redirect push to={`/questions/${question.id}`} />;
      }

        return (
          <Fragment>
            <Card.Group centered>
              <Card id='{question.id}'>
                <Card.Content>
                  <Card.Description>
                     <h4>
                      Would you rather?
                     </h4>
                     <ul >
                      <li className='contact-list-item'>
                        {question.optionOne.text}
                        </li>
                        <li className='contact-list-item'>
                          {question.optionTwo.text} </li>
                     </ul>
                   </Card.Description>
                 </Card.Content>
                 <div >
                   <Button
                    color='blue'
                    fluid
                    onClick={this.handleClick}
                    content={buttonContent}
                    >
                    </Button>
                 </div>
             </Card>
           </Card.Group>
         </Fragment>
      );
    }
  }

export default Summary;

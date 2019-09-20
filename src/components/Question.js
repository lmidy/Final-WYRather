import React, { Component , Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Radio, Divider, Header} from 'semantic-ui-react';
import PropTypes from  'prop-types';
import { handleAnswer } from '../actions/shared';


export class Question extends Component {
  static propTypes = {
    authedUser: PropTypes.string.isRequired,
    handleAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
  };
  state = {
    value: ''
  }

    handleChange = (e, { value }) => this.setState({ value });
    handleSubmit = e => {
      e.preventDefault();
      if (this.state.value !== '') {
        const { question, handleAnswer } = this.props;
        handleAnswer(question.id, this.state.value);
      }
    };
    render() {
        const { question } = this.props;
        const disabled = this.state.value === '' ? true : false;

      return (
        <Fragment>
           <h4>
            Would you rather?
           </h4>
           <Form onSubmit={this.handleSubmit}>
              <Form.Group grouped>
                <Radio
                  label= {question.optionOne.text}
                  control='input'
                  type='radio'
                  value='optionOne'
                  name='radioGroup'
                  checked={this.state.value === 'optionOne'}
                  onChange={this.handleChange}
                />
                <Divider horizontal>
                    <Header as='h4'>
                      OR
                    </Header>
                  </Divider>
                <Radio
                  label= {question.optionTwo.text}
                  control='input'
                  type='radio'
                  name='radioGroup'
                  value='optionTwo'
                  checked={this.state.value === 'optionTwo'}
                  onChange={this.handleChange}
              />
              <Form.Field>
                <Button
                  disabled ={disabled}
                  color="blue"
                  fluid
                  content="Submit"
                  />
              </Form.Field>
            </Form.Group>
          </Form>
       </Fragment>
    )
  }
}


function mapStateToProps({ authedUser },{ match })
 {
  return {
     authedUser
  };
}

export default connect(
  mapStateToProps,{ handleAnswer })(Question);

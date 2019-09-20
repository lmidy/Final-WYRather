import React, { Component, Fragment } from 'react';
import {Header, Form, Segment, Grid} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { handleAddQuestion } from '../actions/shared.js';

export class Add extends Component {
  render() {
    return (
      <Fragment>
        <div className='login'>
          <Segment.Group raised padded='true'>
            <QuestionHeader />
            <QuestionGridLayout
              form={<ConnectedQuestionForm />}
            />
          </Segment.Group>
        </div>
      </Fragment>

    );
  }
}

const QuestionHeader = () => (
  <Header as="h4" block attached="top" textAlign="center">
    <Header.Content>Add a new question</Header.Content>
      <Header.Subheader>Would you rather...</Header.Subheader>
  </Header>
);

const QuestionGridLayout = ({ form }) => (
  <div>
    <Grid padded textAlign="center">
      <Grid.Row>
        <Grid.Column width={16}>
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);



class QuestionForm extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    submittedOptionOne: '',
    submittionOptionTwo: '',
    toHome: false
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo} = this.state
    const { dispatch, id} = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo))

    this.setState(() => ({
      optionOne:'',
      optionTwo:'',
      toHome: id ? false : true,
    }))
}

  render() {
    const { optionOne, optionTwo, toHome } = this.state
    const disabled = optionOne === '' || this.optionTwo === '';

    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <Form onSubmit={this.handleSubmit} widths='equal'>
           <Form.Group>
             <Form.Input
               placeholder='Enter Option One'
               name='optionOne'
               value={optionOne}
               onChange={this.handleChange}
             />
           </Form.Group>
           <span> or </span>
           <Form.Group>
             <Form.Input
               placeholder='Enter Option Two'
               name='optionTwo'
               value={optionTwo}
               onChange={this.handleChange}
             />
             </Form.Group>
             <Form.Group>
             <Form.Button
               color='blue'
               fluid
               disabled={disabled}
               content='Submit' />
           </Form.Group>
      </Form>
    );
  }
}

const ConnectedQuestionForm = connect(mapStateToProps)(QuestionForm);
Add.propTypes = {
  authedUser: PropTypes.string,
  addQuestion: PropTypes.func.isRequired,
};

function mapStateToProps({ authedUser }) {
  //console.log('what is available in props ' +authedUser)
  return {
    authedUser
  };
}
function mapDispatchToProps(dispatch) {
    return {
      addQuestion: (optionOne, optionTwo) => {
        dispatch(handleAddQuestion(optionOne, optionTwo))
      }
    }
  }


export default connect(null, mapDispatchToProps)(Add);

import React, { Component, Fragment } from 'react';
import {Header, Form, Segment, Dimmer, Loader, Grid} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAuthedUser } from '../actions/authedUser';


export class Login extends Component {
  state = {
    loading: false
  };
  handleLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    return (
      <Fragment>
        <div className='login'>
          <Segment.Group raised compact>
            <LoginHeader />
            <LoginGridLayout
              form={<ConnectedLoginForm onLoading={this.handleLoading} />}
              loading={this.state.loading}
            />
          </Segment.Group>
        </div>
      </Fragment>

    );
  }
}

const LoginHeader = () => (
  <Header as="h4" block attached="top" textAlign="center">
    <Header.Content>Welcome to the Would You Rather App!</Header.Content>
    <Header.Subheader>Please sign in to continue</Header.Subheader>
  </Header>
);

const LoginGridLayout = ({ form, loading }) => (
  <div>
    <Grid padded textAlign="center">
      <Grid.Row>
        <Grid.Column width={16}>
          {loading === true && (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          )}
          <br />
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);


class LoginForm extends Component {
  static propTypes = {
    onLoading: PropTypes.func.isRequired
  };
  state = {
    value: ''
  };
  onChange = (e, { value }) => {
    this.setState({ value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { onLoading, setAuthedUser}  = this.props;
    const authedUser = this.state.value;
    //console.log('calling after submit' +authedUser)

    new Promise((res, rej) => {
      onLoading();
      setTimeout(() => res(), 500);
    }).then(() => setAuthedUser(authedUser));

  };
  generateDropdownData = () => {
    const { users } = this.props;

    return users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
    }));
  };
  render() {
    const { value } = this.state;
    const disabled = value === '' ? true : false;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Header>
          Sign In
        </Header>
        <Form.Dropdown
          placeholder="Select a User"
          fluid
          selection
          scrolling
          options={this.generateDropdownData()}
          value={value}
          onChange={this.onChange}
          required
        />
        <Form.Button
          color='blue'
          content="Login"
          disabled={disabled}
          fluid
        />
      </Form>
    );
  }
}

const ConnectedLoginForm = connect(mapStateToProps,{ setAuthedUser })(LoginForm);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (id) => {
      dispatch(setAuthedUser(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component, Fragment } from 'react';
//mport { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import PrivateApp from './PrivateApp';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
  		const { authedUser, loadingBar } = this.props;

  		if (loadingBar.default === undefined || loadingBar.default === 1) {

  			return (
  				<div>
  					<Loader active>
  						Loading ...
              </Loader>

  				</div>
  			);
  		} else {
  			return <Fragment>{!authedUser ? <Login /> : <PrivateApp />}</Fragment>;
  		}
  	}
  }


function mapStateToProps ({authedUser}) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(App);

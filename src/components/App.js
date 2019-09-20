import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Nav from './Nav'
import Home from './Home'
import Add from './Add';
import Error_Page from './Error_Page'
import WouldYouRatherWidget from './WouldYouRatherWidget'
import Leaderboard from './Leaderboard'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  redirection() {
   if (!this.props.authedUser) {
     return <Redirect to='/' />
   }
 }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div align='center'>
         {this.redirection()}
            {authedUser === null ? (
              <Route
                render={() => (
                  <AppGrid>
                    <Login />
                  </AppGrid>
                )}
              />
            ) : (
                <Fragment>
                  <Nav />
                  <AppGrid>
                    <Switch>
                      <Route exact path="/" component={ Home } />
                      <Route exact path="/questions/:question_id" component={ WouldYouRatherWidget } />
                      <Route exact path="/questions/" component={ Error_Page } />
                      <Route exact path="/add" component={ Add } />
                      <Route exact path="/leaderboard" component={ Leaderboard} />
                    </Switch>
                  </AppGrid>
                </Fragment>
            )}
        </div>
      </Router>
    );
  }
}

const AppGrid = ({ children }) => (
  <Grid columns={1} mobile={16} tablet={8} computer={4} centered>
    <Grid.Row>
      <Grid.Column>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

function mapStateToProps ({authedUser}) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(App);

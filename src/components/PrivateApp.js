import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import Nav from './Nav'
import Home from './Home'
import Add from './Add';
import Error_Page from './Error_Page'
import WouldYouRatherWidget from './WouldYouRatherWidget'
import Leaderboard from './Leaderboard'

class PrivateApp extends Component {
    render() {
      return (
        <Router>
          <div align='center'>
            <Fragment>
              <Nav />
              <AppGrid>
                <Switch>
                  <Route path="/" exact component={withRouter(Home) } />
                  <Route path="/questions/:question_id" component={ WouldYouRatherWidget } />
                  <Route path="/questions/error_Page" component={ Error_Page } />
                  <Route path="/add" component={ Add } />
                  <Route path="/leaderboard" component={ Leaderboard} />
                  <Route component={ Error_Page } />
                </Switch>
              </AppGrid>
            </Fragment>
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

export default PrivateApp;

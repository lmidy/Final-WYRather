import React , { Component, Fragment } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect} from 'react-redux'
import { setAuthedUser, unsetAuthedUser } from '../actions/authedUser';
import { Image, Menu, Responsive, Grid, Icon, Button, Container } from 'semantic-ui-react'


class Nav extends Component {

  handleLogout = e => {
    e.preventDefault();

    const { authedUser } = this.props;
    this.props.unsetAuthedUser(null);
    sessionStorage.clear();
    sessionStorage.removeItem(authedUser);
    sessionStorage.clear();
    this.setState({ redirect: true });
    if (this.props.unsetAuthedUser === null) {
      return <Redirect to='/' />
    }
  };


  render() {
    const { authedUser, users } = this.props;
    const LogoutButton = () => (
      <Button
        icon
        labelPosition="right"
        floated='right'
        color='blue'
        compact
        onClick={this.handleLogout}
        ><Icon name='log out' />Logout
      </Button>
    );

    return (
      <Container>
        <Responsive as={Menu} pointing secondary>
          <Menu.Item name="home" as={NavLink} to="/" exact />
          <Menu.Item name="add" as={NavLink} to="/add" />
          <Menu.Item name="leaderboard" as={NavLink} to="/leaderboard" />
          <Menu.Menu position="right">
            <Menu.Item>
              <span>
                <Image
                  src={users[authedUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authedUser].name}
              </span>
            </Menu.Item>
            <Menu.Item>
              <LogoutButton />
            </Menu.Item>
          </Menu.Menu>
        </Responsive>
        <Responsive as={Fragment} minWidth={375} maxWidth={650}>
          <Grid columns={2} padded="vertically">
            <Grid.Row>
              <Grid.Column>
                <Image
                  src={users[authedUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authedUser].name}
              </Grid.Column>
              <Grid.Column verticalAlign="bottom" textAlign="right">
                <LogoutButton />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name="home" as={NavLink} to="/" exact />
                  <Menu.Item name="add" as={NavLink} to="/add" />
                  <Menu.Item
                    name="leaderboard"
                    as={NavLink}
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive as={Fragment} maxWidth={374}>
          <Grid padded="vertically" columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Image
                  src={users[authedUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authedUser].name}
                <LogoutButton />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name="home" as={NavLink} to="/" exact />
                  <Menu.Item name="add" as={NavLink} to="/add" />
                  <Menu.Item
                    name="leaderboard"
                    as={NavLink}
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </Container>
    );
  }
}


function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect( mapStateToProps, { setAuthedUser ,unsetAuthedUser})(Nav);

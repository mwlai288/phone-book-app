import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { clearAuthTokens } from '../util/SessionHeaderUtil';

class NavBar extends Component {
  state = {
    user: {},
    loggedIn: false
  };

  componentWillMount() {
    this._isLoggedIn();
  }
  componentWillReceiveProps() {
    this._isLoggedIn();
  }

  _isLoggedIn = async () => {
    const response = await axios.get('/auth/validate_token');
    this.setState({
      user: response.data.data,
      loggedIn: response.data.success
    });
  };

  signOut = async (event) => {
    try {
      event.preventDefault();
      await axios.delete('/auth/sign_out');
      clearAuthTokens();
      this.setState({ signedIn: false });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <Header>
          <Link to="/allcontacts">
            <div>PB</div>
          </Link>
          <div>
            <EmailName> Signed In As: {this.state.user.email} </EmailName>
            <a href to="/" onClick={this.signOut}>
              Sign Out
            </a>
          </div>
        </Header>
      );
    }
    return (
      <Header>
        <Link to="/">
          <div>PB</div>
        </Link>
        <div>
          <Link to="/signup">Sign Up</Link>
        </div>
      </Header>
    );
  }
}

export default NavBar;

const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5%;
  background-color: #800000;
  a {
    text-decoration: none;
    margin: 0 5px;
    &:visited {
      color: white;
    }
  }
`;

const EmailName = styled.span`
  color: white;
`;

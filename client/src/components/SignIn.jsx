import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import setAxiosHeaders from '../util/SessionHeaderUtil';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    redirect: false
  };

  signIn = (event) => {
    event.preventDefault();
    this.props.signIn(this.state.email, this.state.password);
  };

  handleChange = (event) => {
    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/allcontacts" />;
    }
    return (
      <div>
        <form onSubmit={this.signIn}>
          <div>
            <label htmlFor="email">E-mail: </label>
            <input
              onChange={this.handleChange}
              type="text"
              name="email"
              value={this.state.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              onChange={this.handleChange}
              type="password"
              name="password"
              value={this.state.password}
            />
          </div>
          <button>Sign In</button>
          <div>
            <h3>Create An Account</h3>
            <Link to="/signUp">
              <button>Sign Up</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;

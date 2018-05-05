import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import setAxiosHeaders from '../util/SessionHeaderUtil';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    redirect: false
  };

  signUp = (event) => {
    event.preventDefault();
    this.props.signUp(
      this.state.email,
      this.state.password,
      this.state.password_confirmation
    );
  };

  _signIn = (e) => {
    e.preventDefault();
    this.setState({ redirect: true });
  };

  _handleChange = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form onSubmit={this.signUp}>
          <div>
            <label htmlFor="email">E-mail: </label>
            <input
              onChange={this._handleChange}
              type="text"
              name="email"
              value={this.state.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              onChange={this._handleChange}
              type="password"
              name="password"
              value={this.state.password}
            />
          </div>
          <div>
            <label htmlFor="password">Confirm Password: </label>
            <input
              onChange={this._handleChange}
              type="password"
              name="password_confirmation"
              value={this.state.password_confirmation}
            />
          </div>
          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;

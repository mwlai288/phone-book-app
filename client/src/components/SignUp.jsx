import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import setAxiosHeaders from '../util/SessionHeaderUtil';
import styled from 'styled-components';

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
      <BackgroundStyle>
        <BoxView>
          <h2>Create an Account</h2>
          <form onSubmit={this.signUp}>
            <div>
              <input
                onChange={this._handleChange}
                type="text"
                name="email"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                onChange={this._handleChange}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                onChange={this._handleChange}
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
              />
            </div>
            <ButtonStyle>Sign Up</ButtonStyle>
          </form>
          <Link to="/">Already have an account?</Link>
        </BoxView>
      </BackgroundStyle>
    );
  }
}

export default SignUp;

const BackgroundStyle = styled.div`
  align-items: center;
  background: #dddddd;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const BoxView = styled.div`
  background-color: white;
  padding: 2.4rem;
  text-align: center;
  width: 25rem;
`;

const ButtonStyle = styled.button`
  background-color: #800000;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.2;
  padding: 1rem;
  margin-top: 0.5rem;
  text-transform: uppercase;
`;

export const FormView = styled.form`
  display: flex;
  flex-direction: column;
`;

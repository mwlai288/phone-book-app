import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import setAxiosHeaders from '../util/SessionHeaderUtil';
import styled from 'styled-components';

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
      <BackgroundStyle>
        <BoxView>
          <h2>Sign In to Phonebook</h2>
          <form onSubmit={this.signIn}>
            <div>
              <input
                onChange={this.handleChange}
                type="text"
                name="email"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <ButtonStyle>Sign In</ButtonStyle>
            <div>
              <h3>Create An Account</h3>
              <Link to="/signup">Don't have an account?</Link>
            </div>
          </form>
        </BoxView>
      </BackgroundStyle>
    );
  }
}

export default SignIn;

const BackgroundStyle = styled.div`
  align-items: center;
  background: #dddddd;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const BoxView = styled.div`
  background-color: white;
  padding: 2.4rem;
  text-align: center;
  width: 24rem;
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

const FormView = styled.form`
  display: flex;
  flex-direction: column;
`;

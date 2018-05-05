import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AllContacts from './components/AllContacts';
import {
  clearAuthTokens,
  saveAuthTokens,
  setAxiosDefaults,
  userIsLoggedIn
} from './util/SessionHeaderUtil';
import Contact from './components/Contact';
import EditContact from './components/EditContact';
import AddContact from './components/AddContact';
import NavBar from './components/NavBar';

class App extends Component {
  state = {
    signedIn: false
  };

  async componentWillMount() {
    try {
      const signedIn = userIsLoggedIn();

      if (signedIn) {
        setAxiosDefaults();
      }
      this.setState({
        signedIn
      });
    } catch (error) {
      console.log(error);
    }
  }

  signUp = async (email, password, password_confirmation) => {
    try {
      const payload = {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      };
      const response = await axios.post('/auth', payload);
      saveAuthTokens(response.headers);

      this.setState({
        signedIn: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  signIn = async (email, password) => {
    try {
      const payload = {
        email,
        password
      };
      const response = await axios.post('/auth/sign_in', payload);
      saveAuthTokens(response.headers);
      this.setState({
        signedIn: true
      });
    } catch (error) {
      console.log(error);
    }
  };

  // signOut = async (event) => {
  //   try {
  //     event.preventDefault();

  //     await axios.delete('/auth/sign_out');

  //     clearAuthTokens();

  //     this.setState({ signedIn: false });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  render() {
    const SignInComponent = () => <SignIn signIn={this.signIn} />;

    const SignUpComponent = () => <SignUp signUp={this.signUp} />;

    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" render={SignInComponent} />
            <Route path="/signUp" render={SignUpComponent} />
            <Route path="/allcontacts" component={AllContacts} />
            <Route exact path="/contact/:id" component={Contact} />
            <Route path="/contact/:id/edit" component={EditContact} />
            <Route exact path="/newcontact" component={AddContact} />
          </Switch>
          {/* If user is signed in, redirect to their contacts. */}
          {this.state.signedIn ? (
            <Redirect to="/allcontacts" />
          ) : (
            <Redirect to="/" />
          )}
        </div>
      </Router>
    );
  }
}

export default App;

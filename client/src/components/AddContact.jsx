import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

class AddContact extends Component {
  state = {
    contacts: {
      phone: '',
      email: '',
      address: '',
      group: ''
    },
    redirect: false
  };

  addInfo = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const payload = this.state.contacts;
    console.log(payload);
    try {
      await axios.post(`/contacts/`, payload);
      this.setState({ redirect: true });
    } catch (err) {
      console.log(err);
    }
  };

  _handleChange = (e) => {
    const newState = { ...this.state.contacts };
    newState[e.target.name] = e.target.value;
    this.setState({ contacts: newState });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/allcontacts/'} />;
    } else {
      return (
        <div>
          <form onSubmit={this.addInfo}>
            <FormGroup controlId="formInlineName">
              <ControlLabel>
                <WarningBox>
                  First Name: <Warning>(Must be filled in)</Warning>
                </WarningBox>
              </ControlLabel>
              <FormControl
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={this._handleChange}
              />
              <ControlLabel>Last Name:</ControlLabel>
              <FormControl
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={this._handleChange}
              />
              <ControlLabel>Avatar:</ControlLabel>
              <FormControl
                type="text"
                name="avatar"
                placeholder="Photo Url"
                onChange={this._handleChange}
              />

              <FormGroup controlId="formInlineName">
                <ControlLabel>Phone:</ControlLabel>
                <FormControl
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={this._handleChange}
                />
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Address:</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    type="text"
                    name="address"
                    placeholder="Home Address"
                    onChange={this._handleChange}
                  />
                </FormGroup>
                <ControlLabel>Email:</ControlLabel>
                <FormControl
                  type="text"
                  name="email"
                  placeholder="Email address"
                  onChange={this._handleChange}
                />
                <ControlLabel>Group:</ControlLabel>
                <FormControl
                  type="text"
                  name="group"
                  placeholder="Family, Friends, Work"
                  onChange={this._handleChange}
                />
                <input type="submit" value="Create Contact" />
              </FormGroup>
            </FormGroup>
          </form>
        </div>
      );
    }
  }
}
export default AddContact;

const Warning = styled.p`
  color: red;
  display: flex;
`;

const WarningBox = styled.div`
  display: flex;
  flex-direction: row;
`;

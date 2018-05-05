import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

class EditContact extends Component {
  state = {
    contacts: {},
    redirect: false
  };

  componentWillMount() {
    this.getContact();
  }

  getContact = async () => {
    const id = this.props.match.params.id;
    try {
      const res = await axios.get(`/contacts/${id}`);
      await this.setState({ contacts: res.data });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  editContact = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const payload = this.state.contacts;
    try {
      axios.patch(`/contacts/${id}`, payload);
      this.setState({ redirect: true });
    } catch (err) {
      console.log(err);
    }
  };

  deleteContact = async (e) => {
    const id = this.props.match.params.id;
    try {
      await axios.delete(`/contacts/${id}`);
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
    const id = this.props.match.params.id;
    if (this.state.redirect) {
      return <Redirect to={`/allcontacts`} />;
    } else {
      return (
        // Value's are not showing but will still save correct information. Don't need to fill out every form for Edit.
        <div>
          <form>
            <FormGroup controlId="formInlineName">
              <ControlLabel>First Name:</ControlLabel>
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
                <ControlLabel>Phone: </ControlLabel>
                <FormControl
                  onChange={this._handleChange}
                  type="text"
                  name="phone"
                  placeholder={this.state.contacts.phone}
                />
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Address:</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    type="text"
                    name="address"
                    placeholder={this.state.contacts.address}
                    onChange={this._handleChange}
                  />
                </FormGroup>
                <label>Email: </label>
                <FormControl
                  onChange={this._handleChange}
                  type="text"
                  name="email"
                  placeholder={this.state.contacts.email}
                />
                <ControlLabel>Group: </ControlLabel>
                <FormControl
                  onChange={this._handleChange}
                  type="text"
                  name="group"
                  placeholder={this.state.contacts.group}
                />
              </FormGroup>
            </FormGroup>
          </form>
          <ButtonSpacing>
            <Button
              bsSize="small"
              bsStyle="primary"
              onClick={this.editContact}
              className="default-button"
            >
              Edit
            </Button>

            <Button
              bsSize="small"
              bsStyle="danger"
              onClick={this.deleteContact}
            >
              Delete
            </Button>
          </ButtonSpacing>
        </div>
      );
    }
  }
}
export default EditContact;

const ButtonSpacing = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
`;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem
  // MenuItem,
  // SplitButton
} from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

class AllContacts extends Component {
  state = {
    contacts: [],
    search: '',
    error: ''
  };

  async componentWillMount() {
    try {
      const res = await axios.get('/contacts');
      await this.setState({ contacts: res.data });
      return res.data;
    } catch (err) {
      await this.setState({ error: err.message });
      return err.message;
    }
  }

  updateSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    let filteredContacts = this.state.contacts.filter((contact) => {
      return (
        contact.firstname
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    // let sortedGroups = this.state.contacts.filter((contact) => {
    //   return contact.group;
    // });

    return (
      <div>
        <Title>Phone Book</Title>
        <div>
          <input
            type="text"
            placeholder="Search by First Name"
            value={this.state.search}
            onChange={this.updateSearch}
          />
        </div>

        {/* Component To make dropdown menu to sort */}
        {/* <SplitButton
          title="Dropdown right"
          pullRight
          id="split-button-pull-right"
        >
          <MenuItem eventKey="1">Action</MenuItem>
          <MenuItem eventKey="2">Another action</MenuItem>
          <MenuItem eventKey="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4">Separated link</MenuItem>
        </SplitButton> */}

        <h1>
          <Link to="/newcontact">New Contact</Link>
        </h1>
        {filteredContacts.map((contact) => {
          return (
            <div key={contact.id}>
              <h1>
                <Link to={`/contact/${contact.id}`}>
                  <ListGroup>
                    <ListGroupItem>
                      {contact.firstname} {contact.lastname}
                    </ListGroupItem>
                  </ListGroup>
                </Link>
              </h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AllContacts;

const Title = styled.h1`
  font-family: 'Goudy Bookletter 1911', serif;
`;

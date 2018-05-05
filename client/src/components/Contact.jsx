import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import { Col, Image } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

class Contact extends Component {
  state = {
    contacts: [],
    redirect: false
  };

  async componentWillMount() {
    const id = this.props.match.params.id;
    try {
      const contactResponse = await axios.get(`/contacts/${id}`);
      await this.setState({
        contacts: contactResponse.data
      });
    } catch (error) {
      await this.setState({ error: error.message });
    }
  }

  deleteUser = () => {
    const id = this.props.match.params.id;
    axios.delete(`/contacts/${id}`);
    this.setState({ redirect: true });
    window.location.reload();
  };

  render() {
    console.log(this.state.contacts.length);
    if (this.state.redirect) {
      return <Redirect to={'/'} />;
    }
    return (
      <div>
        <Name>
          {this.state.contacts.firstname} {this.state.contacts.lastname}
        </Name>
        <AddLink>
          {/* {this.state.contacts.length === 0 ? (
            <Link to={`/person/${personId}/newcontact`}>
              Add contact information
            </Link>
          ) : null} */}
        </AddLink>
        <ContactBox>
          <ContactInfo>
            <BoxedView>
              <img src={this.state.contacts.avatar} alt="Picture Unavailable" />
              <div>
                <div>Phone Number: {this.state.contacts.phone}</div>
                <div>Email: {this.state.contacts.email}</div>
                <div>Current Address: {this.state.contacts.address}</div>
                <div>Group: {this.state.contacts.group}</div>
              </div>
              <div>
                <Link to={`/contact/${this.state.contacts.id}/edit`}>
                  <button>Edit Contact</button>
                </Link>
              </div>
            </BoxedView>
          </ContactInfo>
        </ContactBox>
        );
      </div>
    );
  }
}

export default Contact;

const AddLink = styled.div`
  display: flex;
  justify-content: center;
`;

const BoxedView = styled.div`
  background-color: white;
  padding: 2.4rem;
  text-align: center;
  width: 24rem;
`;

const ContactBox = styled.div`
  align-items: center;
  background: #dddddd;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Goudy Bookletter 1911', serif;
  font-size: 24px;
`;

const Name = styled.h1`
  display: flex;
  justify-content: space-around;
  font-family: 'Goudy Bookletter 1911', serif;
`;

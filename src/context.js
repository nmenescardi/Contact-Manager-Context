import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        //contacts: state.contacts.concat(action.payload)
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    const res = await axios.get(
      'http://localhost/blackbird/wp-json/wp/v2/clients_contact'
    );

    //console.log('res.data', res.data);
    const contacts = res.data.map(contact => {
      return {
        name: contact.title.rendered,
        email: contact.acf.email,
        phone: contact.acf.phone,
        description: contact.acf.description,
        id: contact.id
      };
    });
    this.setState({
      contacts: contacts
    });

    // testing token
    const credentials = {
      username: 'admin',
      password: 'admin'
    };

    const resToken = await axios.post(
      'http://localhost/blackbird/wp-json/jwt-auth/v1/token',
      credentials
    );

    this.setState({
      token: resToken.data.token
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

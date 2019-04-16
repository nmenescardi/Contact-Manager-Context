import React, { Component } from 'react';

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
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'Carlos Smith',
        email: 'algodon@gmail.com',
        phone: '3052216632'
      },
      {
        id: 2,
        name: 'Karen Busca Rueda',
        email: 'kbr@gmail.com',
        phone: '7784216632'
      },
      {
        id: 3,
        name: 'Pancho Salmarina',
        email: 'ps@hotmail.com',
        phone: '9997555441'
      }
    ],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

/*
 deleteContact = id => {
    const { contacts } = this.state;

    this.setState({
      contacts: contacts.filter(contact => contact.id !== id)
    });
  };
   */

import React, { Component } from 'react';
import Contact from './Contact';

export default class Contacts extends Component {
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
    ]
  };
  render() {
    const { contacts } = this.state;

    return (
      <div>
        {contacts.map(contact => (
          <Contact key={contact.id} {...contact} />
        ))}
      </div>
    );
  }
}

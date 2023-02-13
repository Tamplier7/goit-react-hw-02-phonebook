import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import css from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  updateContactsList = (newContactName, newContactNumber) => {
    this.checkExistingContact(newContactName)
      ? alert(`${newContactName} is already in contacts!`)
      : this.setState(prevState => {
          return {
            contacts: [
              {
                id: nanoid(),
                name: newContactName,
                number: newContactNumber,
              },
              ...prevState.contacts,
            ],
          };
        });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  checkExistingContact = newName => {
    const normalizedNewName = newName.toLowerCase();

    return this.state.contacts.some(
      ({ name }) => name.toLowerCase() === normalizedNewName
    );
  };

  render() {
    const normilizedFilter = this.state.filter.toLowerCase();

    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm updateContactsList={this.updateContactsList} />

        <h2>Contacts</h2>
        <Filter
          inputValue={this.state.filter}
          onInputChange={this.onInputChange}
        />
        <ContactList
          contacts={visibleContacts}
          handleDeleteBtn={this.deleteContact}
        />
      </div>
    );
  }
}

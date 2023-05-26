import { Container } from './App.styled';
import PhoneBook from 'components/Phonebook/Phonebook';
import { useEffect, useState } from 'react';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import PropTypes from 'prop-types';
const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts') ?? [])
  );
  const [filter, setFilter] = useState('');

  const checkNameRepeat = name => {
    return contacts
      .map(item => item.name.toLowerCase())
      .includes(name.toLowerCase());
  };
  const addContact = newContact => {
    if (checkNameRepeat(newContact.name)) {
      alert(`${newContact.name} is already in contacts!`);
    } else {
      setContacts(prevState => [...prevState, newContact]);
    }
  };
  const deleteContact = index => {
    setContacts(contacts.filter(element => element.id !== index));
  };

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  const layOutFilteredContact = () => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Container>
      <h2>PhoneBook</h2>
      <PhoneBook addContact={addContact} />
      <h2>Contacts</h2>
      <Filter handleChangeFilter={handleChangeFilter} value={filter} />
      <ContactList
        contacts={layOutFilteredContact()}
        deleteContact={deleteContact}
      />
    </Container>
  );
};

export default App;
App.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.array,
  layOutFilteredContact: PropTypes.func,
  handleChangeFilter: PropTypes.func,
  checkNameRepeat: PropTypes.bool,
  deleteContact: PropTypes.func,
  addContact: PropTypes.func,
};

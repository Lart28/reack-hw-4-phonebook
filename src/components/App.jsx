import { useState, useEffect} from "react";
import Contacts from "./Contacts";
import Filter from "./Filter";
import Form from "./Form";
import { nanoid } from "nanoid";
import { Title, Title2 } from "./App.styled";

const LS_KEY = 'phonebook-contacts';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(LS_KEY)) ?? []);
  const [filter, setFilter] = useState('');

  // const changeFilter = (e) => {
  //   setFilter(e.currentTarget.value);
  // }

  const formSubmitHandler = (data) => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    }
    const contactNames = contacts.map(contact => contact.name);
    contactNames.includes(data.name) ?
      alert(`${data.name} is already in contacts.`) :
      setContacts([newContact, ...contacts]);
  }

    const deleteContact = contactId => {
      setContacts(contacts.filter(contact => contact.id !== contactId));
  }

  useEffect(() => {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts])
  
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

  return (
      <>
        <Title>Phonebook</Title>
        <Form onSubmit={formSubmitHandler} />
        <Title2>Contacts</Title2>
        <Filter value={filter} onChange={setFilter}/>
        <Contacts contacts={filteredContacts} onDeleteContact={deleteContact} />
      </>
    )
}

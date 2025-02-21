import { Contact } from './Contacts/Contacts';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
export const App = () => {
  return (
    <div>
      <h1>Phone book</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <Contact />
    </div>
  );
};

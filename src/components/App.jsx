import { Route } from 'react-router-dom';
import { Register } from './Register/Register';
import { Login } from './Login/Login';
import { Routes } from 'react-router-dom';
import { Nav } from './Nav/Nav';
import { Forbidden } from './Forbidden/Forbidden';
import { UserMenu } from './UserMenu/UserMenu';
import { Contact } from './Contacts/Contacts';
export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="contacts" element={<Forbidden comp={<Contact />} />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Forbidden comp={<UserMenu />} />} />
        </Route>
      </Routes>
    </>
  );
};

import logo from './logo.svg';
import './App.css';
import './output.css';
import Nav from './components/Nav';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import UserState from './context/Users/UserState'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Account from './components/Account';
import Profile from './components/Profile';
import Logout from './components/Logout';
import PlacesPage from './components/PlacesPage';
import Place from './components/Places';
import Addplace from './components/Addplace';
import Bookings from './components/Bookings';
import PlaceReserve from './components/PlaceReserve';


function App() {
  return (
    <>
      <UserState>
        <Router>

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />.

            <Route path="/register" element={<Register />} />

            <Route path="/account" element={<Account />} />


            <Route path="/account/places" element={<Place />} />
            <Route path="/account/places/new" element={<Addplace />} />
            <Route path="/places/:id" element={<PlacesPage />} />
            <Route path="/places/reserve/:id" element={<PlaceReserve />} />

            <Route path="/account/bookings" element={<Bookings />} />
            <Route path="/account/bookings/:id" element={<Bookings />} />
            {/* <Route path="/account/:subpage/:id" element={<Account />} /> */}

            <Route path="/logout" element={<Logout />} />


            {/* <Route path="/profile" element={<Profile /> } /> */}


          </Routes>
        </Router>
      </UserState>
    </>
  );
}

export default App;

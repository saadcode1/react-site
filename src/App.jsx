import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/userContext';
import Loginpage from './components/Loginpage';
import Signin from './components/Signin';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Post from './components/Post';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Loginpage />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/post" element={<Post/>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
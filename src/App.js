// WRITTEN BY MEHMET BARAN ÖZDENİZ @ozdeniz.mb

import React from 'react';
import { Route, Routes, Navigate, HashRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Home from './views/Home/Home';
import About from './views/About/About';
import SignUp from './views/SignUp/SignUp';
import TopBar from './components/TopBar';
import Contact from './views/Contact/Contact'
import UserPage from './views/UserPage/UserPage';
import Login from './views/Login/Login';
import UserUpdateProfile from './components/UserUpdateProfile';
import Project from './views/Project/Project';
import ProjectDetail from './views/ProjectDetail/ProjectDetail';
import ProjectCreate from './components/ProjectCreate';
import ContactMessage from './components/ContactMessage';
import ProjectUpdate from './components/ProjectUpdate';
import Privacy from './views/Privacy/Privacy';

const App = () => {

  const { isLoggedIn } = useSelector(store => {
    return {
      isLoggedIn : store.isLoggedIn
    }
  });

  return(
    <div>

      <HashRouter>

        <TopBar />

        <Routes>
          <Route exact path="/" element={<Home />}/>

          {!isLoggedIn && (
            <Route path="/login" element={<Login />}/>
          )}

          <Route path="/signup" element={<SignUp />} />

          <Route path="/about" element={<About />} />

          <Route path="/projects" element={<Project />} />

          <Route path="/project/detail/:id" element={<ProjectDetail />} />

          <Route path="/project/create" element={<ProjectCreate />} />

          <Route path="/project/update/:id" element={<ProjectUpdate />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/contact/message" element={<ContactMessage />} />

          <Route path="/profile/:email" element={<UserPage />} />

          <Route path="/profile/update/:email" element={<UserUpdateProfile />} />

          <Route path="/privacy-policy" element={<Privacy />} />

          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>

      </HashRouter>

    </div>
  );

}

export default App;
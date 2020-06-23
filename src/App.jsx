import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navbar from 'components/Navbar';
import Authroute from 'tools/Authroute';

import Register from 'pages/Register';
import LogIn from 'pages/Login';
import Home from 'pages/Home';
import About from 'pages/About';
import Profile from 'pages/Profile';
import NotFound from 'pages/NotFound';
import Playlist from 'pages/Playlist';
import NewPlaylist from 'pages/NewPlaylist';

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Authroute exact path="/new-playlist" component={NewPlaylist} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/about" component={About} />
            <Authroute
              exact
              path="/playlist/:playlistId"
              component={Playlist}
            />
            <Authroute exact path="/profile" component={Profile} />
            <Home exact path="/" component={Home} />
            <Route path="*" component={NotFound} status={404} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;

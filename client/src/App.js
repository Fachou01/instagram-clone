import React from 'react';
import Landing from './components/main/Landing';
import Login from './pages/Login/Login';
import Registre from './pages/Register/Registre';
import Profile from './components/profile/Profile';
import Error  from './pages/Error/Error';
import MainChat from './components/chat/MainChat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/main">
          <div className="lg:mx-48">
            <Landing />
          </div>
        </Route>
        <Route exact path="/registre">
          <div className="lg:mx-48">
            <Registre />
          </div>
        </Route>
        <Route exact path="/">
          <div className="lg:mx-48">
            <Login />
          </div>
        </Route>
        <Route path="/profile">
          <div className="lg:mx-48">
            <Profile />
          </div>
        </Route>
        <Route path="/chat">
          <div className="lg:mx-48 ">
            <MainChat />
          </div>
        </Route>
        <Route path="*">
          <div className="lg:mx-48 h-screen">
            <Error />
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App

import React from 'react'
import Landing from './components/main/Landing'
import Login from './components/login/Login'
import Registre from './components/registre/Registre'
import Profile from './components/profile/Profile'
import Error from './components/Error/Error'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/main">
          <div className="lg:mx-48">
            <Landing />
          </div>
        </Route>
        <Route exact path="/">
          <div className="lg:mx-48">
            <Registre />
          </div>
        </Route>
        <Route exact path="/login">
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
          <div className="lg:mx-48 "></div>
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

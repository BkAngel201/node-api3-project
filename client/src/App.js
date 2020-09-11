import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch, useParams, Link} from 'react-router-dom'
import axios from 'axios';
import User from './User';

function App() {
  const [usersToShow, setUsersToShow] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        setUsersToShow(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  },[])

  return (
    <div className="App">
      <Switch>
        <Route path="/user/:user_id">
          <User />
        </Route>
        <Route path="/">
          {
            usersToShow.map(user => (
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            ))
          }
        </Route>
      </Switch>
     
    </div>
  );
}

export default App;

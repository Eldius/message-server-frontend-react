import React, { useState } from "react";

import './App.css';

import './components/Login';
import Login from './components/Login';
import MessageSender from './components/MessageSender';
import MessageList from './components/MessageList';

function App() {
  const [userToken, setUserToken] = useState("");

  const processUserToken = function(token) {
    setUserToken(token);
    console.log(`saving token: ${token}`);
  }

  return (
    <div className="App">
      <h2>Messages App</h2>
      <div className="login-pane">
        <Login
          loginCallback={processUserToken}
          />
        <MessageSender userToken={userToken}/>
        <MessageList userToken={userToken}/>
      </div>
    </div>
  );
}

export default App;

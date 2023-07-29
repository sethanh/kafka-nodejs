import React, { useState, useEffect } from 'react';
import './App.css';
import Notification from './Notification';

import { axiosService } from './services';

export const LoginApi = (payload) => {
  return axiosService.post(`users/signIn`, payload)
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const onSubmit = () => {
    var loginData = {
      email,
      password
    }
    LoginApi(loginData).then(
      res => {
        console.log(res);
        if (res.status === 200) {
          setUser(res.data.user);
        }
      }
    );
  }

  console.log(user);

  return (
    <div className="stats-div">
      {!user &&
        <>
          <input
            style={{marginTop:200}}
            name="email"
            className='input'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            className='input'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='button' onClick={() => onSubmit()}> Login</div>
        </>
      }
      {
        user && <Notification user={user} />
      }
    </div>
  );
}

export default App;
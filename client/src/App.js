import React, { useState, useEffect } from 'react';
import './App.css';
import Notification from './Notification';

import { axiosService } from './services';

export const LoginApi = (payload) => {
  return axiosService.post(`users/signIn`,payload)
}

function App() {
  const [ facts, setFacts ] = useState([]);
  const [count, setCount] = useState(0);
  const [ listening, setListening ] = useState(false);
  const [user, setUser]= useState(null);

  useEffect( () => {
    var loginData = {
      phone: "thanhse001@gmail.com",
      password: "se2012520",
      email: "thanhse123@gmail.com"
    }

    LoginApi(loginData).then(
      res => {
        console.log('x', res);
        setUser(res.data.user);
      }
    );
  }, [listening, facts]);

  console.log(facts.length,facts);

  return (
    <div className="stats-div">
      <div>Đăng nhập</div>
      {
        user && <Notification />
      }
    </div>
  );
}

export default App;
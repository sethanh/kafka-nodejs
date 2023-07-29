import React, { useState, useEffect } from 'react';
import './App.css';
import HeadNotification from './HeadNotification';
import Invoice from './Invoice';

function Notification({user}) {
  const [ facts, setFacts ] = useState([]);
  const [count, setCount] = useState(0);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource(`http://localhost:3001/events/${user.id}`);
      events.onmessage = (event) => {
        var data = event?.data || [];
        const parsedData = JSON.parse(data);
        setFacts(parsedData);
      };

      setListening(true);
    }
  }, [listening, facts]);

  return (
    <div style={{padding:20}}>
      <HeadNotification facts={facts} user={user}/>
      {
        facts.reverse().map((invoice,index)=>(<Invoice invoice={invoice}/>))
      }
    </div>
    
  );
}

export default Notification;
import React, { useState, useEffect } from 'react';
import './App.css';

function Notification() {
  const [ facts, setFacts ] = useState([]);
  const [count, setCount] = useState(0);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/events/2');
      events.onmessage = (event) => {
        console.log(count,event.data);
        const parsedData = JSON.parse(event.data);

        setFacts(parsedData);
        setCount(count+1);
      };

      setListening(true);
    }
  }, [listening, facts]);

  console.log(facts.length,facts);

  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>Fact</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        {/* {
          facts.map((fact, i) =>
            <tr key={i}>
              <td>{fact.info}</td>
              <td>{fact.source}</td>
            </tr>
          )
        } */}
      </tbody>
    </table>
  );
}

export default Notification;
// src/pages/Works.js
import { useEffect, useState } from 'react';

function Works() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetch('/works.json')
      .then(res => res.json())
      .then(data => setWorks(data));
  }, []);

  return (
    <div>
      <h2>実績一覧</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {works.map(work => (
          <div key={work.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <img src={work.image} alt={work.title} style={{ width: '100%' }} />
            <h3>{work.title}</h3>
            <p>{work.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Works;

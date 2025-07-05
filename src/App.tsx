// src/App.tsx

import React, { useState } from 'react';

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = ():void => {
    setCount(prev => prev + 1);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>カウントアップアプリ</h1>
      <p style={{ fontSize: '48px', margin: '20px 0' }}>{count}</p>
      <button 
        onClick={handleIncrement} 
        style={{ padding: '10px 20px', fontSize: '24px', cursor: 'pointer' }}
      >
        カウントアップ
      </button>
    </div>
  );
};

export default App;

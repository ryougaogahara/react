import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('count');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  const AppClick = () => {
    setCount(count + 1);
  };

  const DownClick = () => {
    setCount(count - 1);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  // ここで数字かどうかを判定、数字以外ははいらないように
  const handleSetCount = () => {
    const number = parseInt(inputValue, 10);
    if (!isNaN(number)) {
      setCount(number);
      setInputValue('');
    }
  };

  const handleReset = () => {
    setCount(0);
    localStorage.removeItem('count');
  };

  return (
    <div className='oi'>
      <h1>カウントアップ</h1>
      <h3>カウント: {count}</h3>

      <button onClick={DownClick}>カウントダウン</button>
      <button onClick={AppClick}>カウントアップ</button>
      <button onClick={handleReset}>リセット</button>

      <div style={{ marginTop: '20px' }}>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="スタート値を入力"
        />
        <button onClick={handleSetCount}>この値に設定</button>
      </div>
    </div>
  );
}

export default App;

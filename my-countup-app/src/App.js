import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0); // 状態を0で初期化

  // クリックされたときの動作を定義する
  const handleClick = () => {
    setCount(count + 1); // 状態を更新
  };
  const decrement  = () => {
    setCount(count - 1); // 状態を更新
  };

  return (
    <div>
      <h1>カウントアプリ</h1>
      <p>現在のカウント: {count}</p>
      <button onClick={handleClick}>＋</button>
      <button onClick={decrement}>－</button>
    </div>
  );
}

export default App;
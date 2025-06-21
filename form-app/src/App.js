import React, { useState } from "react";

function App() {
  // 3つの入力フォームのstateをそれぞれ管理
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  // inputの変化を受けてstateを更新する関数
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>フォームアプリ</h1>
      <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        <h2>入力フォーム</h2>
        <label>
          名前: <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="名前を入力"
          />
        </label>
        <br />
        <label>
          メール: <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="メールを入力"
          />
        </label>
        <br />
        <label>
          コメント: <br />
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="コメントを入力"
            rows={4}
          />
        </label>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
        <h2>リアルタイム表示</h2>
        <p>名前: {formData.name}</p>
        <p>メール: {formData.email}</p>
        <p>コメント: {formData.comment}</p>
      </div>
    </div>
  );
}

export default App;

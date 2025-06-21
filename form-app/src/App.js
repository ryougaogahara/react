import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const maxLengths = {
    name: 10,
    email: 30,
    comment: 100,
  };

  // 入力変更時の処理
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= maxLengths[name]) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 表示用テキスト
  const displayText = (text) => (text ? text : "未入力です");

  return (
    <div>
      <h1>フォームアプリ task_2</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          名前:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="名前を入力してください"
          />
          <small>
            {" "}
            ({formData.name.length}/{maxLengths.name})
          </small>
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          メール:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="メールを入力してください"
          />
          <small>
            {" "}
            ({formData.email.length}/{maxLengths.email})
          </small>
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          コメント:
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="コメントを入力してください"
            rows={4}
            cols={30}
          />
          <small>
            {" "}
            ({formData.comment.length}/{maxLengths.comment})
          </small>
        </label>
      </div>

      <hr />

      <div>
        <h2>リアルタイム表示</h2>
        <p>名前: {displayText(formData.name)}</p>
        <p>メール: {displayText(formData.email)}</p>
        <p>コメント: {displayText(formData.comment)}</p>
      </div>
    </div>
  );
}

export default App;

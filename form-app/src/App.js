import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [savedData, setSavedData] = useState([]);

  const maxLengths = {
    name: 10,
    email: 30,
    comment: 100,
  };

  // 入力変更
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= maxLengths[name]) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 保存ボタン押下時
  const handleSave = () => {
    setSavedData((prev) => [...prev, formData]);
    setFormData({ name: "", email: "", comment: "" }); // 入力欄をリセット
  };

  // 未入力チェック表示
  const displayText = (text) => (text ? text : "未入力です");

  return (
    <div>
      <h1>フォームアプリ task_3</h1>

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
          <small> ({formData.name.length}/{maxLengths.name})</small>
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
          <small> ({formData.email.length}/{maxLengths.email})</small>
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
          <small> ({formData.comment.length}/{maxLengths.comment})</small>
        </label>
      </div>

      <button onClick={handleSave}>保存</button>

      <hr />

      <div>
        <h2>リアルタイム表示</h2>
        <p>名前: {displayText(formData.name)}</p>
        <p>メール: {displayText(formData.email)}</p>
        <p>コメント: {displayText(formData.comment)}</p>
      </div>

      <hr />

      <div>
        <h2>保存した一覧</h2>
        {savedData.length === 0 ? (
          <p>保存されたデータはありません。</p>
        ) : (
          <ul>
            {savedData.map((item, index) => (
              <li key={index}>
                <strong>名前:</strong> {displayText(item.name)} |{" "}
                <strong>メール:</strong> {displayText(item.email)} |{" "}
                <strong>コメント:</strong> {displayText(item.comment)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

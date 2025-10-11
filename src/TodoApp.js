import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState("");  // 日付を管理
  const [sortCompleted, setSortCompleted] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);  // 日付で並べ替える状態を管理

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const addTodo = () => {
    const newTask = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      dueDate: dueDate ? new Date(dueDate).toISOString() : "",  // 日付を追加
    };
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setNewTodo("");
    setDueDate("");  // 日付をクリア
  };

  const toggleCompleted = (id) => {
    const updatedTodos = [...todos];
    const todo = updatedTodos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleSortOrder = () => {
    setSortCompleted(!sortCompleted);
  };

  const toggleSortByDate = () => {
    setSortByDate(!sortByDate);  // 日付で並べ替えの状態を切り替え
  };

  // 並べ替え
const sortedTodos = [...todos].sort((a, b) => {
  if (sortByDate) {
    // 日付が無い場合は最後に回す
    const dateA = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000); // 最大日付
    const dateB = b.dueDate ? new Date(b.dueDate) : new Date(8640000000000000);
    return dateA - dateB;
  } else if (sortCompleted) {
    return a.completed - b.completed;
  } else {
    return 0;
  }
});


  // 日付のフォーマット関数（YYYY-MM-DD）
  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("ja-JP", options);
  };

  return (
    <div>
      <h1>TODOアプリ</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="新しいTODO"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)} // 日付の入力を受け取る
      />
      <button onClick={addTodo}>追加</button>

      <button onClick={toggleSortOrder}>
        {sortCompleted ? "未完了優先" : "完了優先"}
      </button>
      <button onClick={toggleSortByDate}>
        {sortByDate ? "日付なし優先" : "日付順"}
      </button>

      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            {todo.text}
            {todo.dueDate && (
              <span> (期限: {formatDate(todo.dueDate)})</span>
            )} {/* 日付表示 */}
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

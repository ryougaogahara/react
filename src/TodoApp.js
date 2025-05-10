import React, { useState, useEffect } from "react";

const TodoApp = () => {
  // 状態管理
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // ローカルストレージからTODOを読み込む
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // TODOを追加
  const addTodo = () => {
    const newTask = {
      id: Date.now(), // ユニークなIDを追加
      text: newTodo,
      completed: false,
    };
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // ローカルストレージに保存
    setNewTodo("");
  };

  // チェックボックスの状態を変更
  const toggleCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // ローカルストレージに保存
  };

  // TODOを削除
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id); // IDでフィルタリングして削除
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // ローカルストレージに保存
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
      <button onClick={addTodo}>追加</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todos.indexOf(todo))}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

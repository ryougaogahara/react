import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [sortCompleted, setSortCompleted] = useState(false); // 並べ替え状態を管理

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
    };
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setNewTodo("");
  };

  const toggleCompleted = (id) => {
    const updatedTodos = [...todos];
    const todo = updatedTodos.find(todo => todo.id === id);  // IDでタスクを見つける
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

  // 並べ替え機能
  const toggleSortOrder = () => {
    setSortCompleted(!sortCompleted);
  };

  const sortedTodos = sortCompleted
    ? [...todos].sort((a, b) => a.completed - b.completed) // 完了しているものを先に並べる
    : todos;

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

      <button onClick={toggleSortOrder}>
        {sortCompleted ? "未完了優先" : "完了優先"}
      </button>

      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}  // IDを渡す
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

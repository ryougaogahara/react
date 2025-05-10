import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newSubTodo, setNewSubTodo] = useState(""); // サブTODOの入力
  const [parentTodoId, setParentTodoId] = useState(null); // 親TODOを選択するためのID

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // TODOを追加
  const addTodo = () => {
    const newTask = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      subTasks: [], // サブTODOの配列
    };
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setNewTodo("");
  };

  // サブTODOを追加
  const addSubTodo = (parentTodoId) => {
    const newSubTask = {
      id: Date.now(),
      text: newSubTodo,
      completed: false,
    };
    const updatedTodos = todos.map(todo => {
      if (todo.id === parentTodoId) {
        todo.subTasks = todo.subTasks ? [...todo.subTasks, newSubTask] : [newSubTask];
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setNewSubTodo(""); // 入力フィールドをクリア
    setParentTodoId(null); // 親TODOのIDをリセット
  };

  // チェックボックスの状態を変更
  const toggleCompleted = (id) => {
    const updatedTodos = [...todos];
    const todo = updatedTodos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // サブTODOのチェック状態を変更
  const toggleSubTaskCompleted = (parentTodoId, subTaskId) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === parentTodoId) {
        const subTask = todo.subTasks.find(sub => sub.id === subTaskId);
        if (subTask) {
          subTask.completed = !subTask.completed;
        }
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // 親TODOのチェック状態を更新
    const parentTodo = updatedTodos.find(todo => todo.id === parentTodoId);
    if (parentTodo && parentTodo.subTasks.every(sub => sub.completed)) {
      parentTodo.completed = true;
    } else {
      parentTodo.completed = false;
    }
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // TODOの削除
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
      <button onClick={addTodo}>TODOを追加</button>

      <h2>サブTODO</h2>
      {/* 親TODOが選択されている場合のみ、サブTODOの入力フォームを表示 */}
      {parentTodoId && (
        <div>
          <input
            type="text"
            value={newSubTodo}
            onChange={(e) => setNewSubTodo(e.target.value)}
            placeholder="新しいサブTODO"
          />
          <button onClick={() => addSubTodo(parentTodoId)}>サブTODOを追加</button>
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
            
            {/* サブTODOが存在する場合に表示 */}
            {todo.subTasks && todo.subTasks.length > 0 && (
              <div style={{ paddingLeft: "20px" }}>
                <h4>サブTODO</h4>
                <ul>
                  {todo.subTasks.map((subTask) => (
                    <li key={subTask.id}>
                      <input
                        type="checkbox"
                        checked={subTask.completed}
                        onChange={() =>
                          toggleSubTaskCompleted(todo.id, subTask.id)
                        }
                      />
                      {subTask.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* サブTODO追加ボタン */}
            <button onClick={() => setParentTodoId(todo.id)}>サブTODO追加</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;

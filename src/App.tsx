import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface Todo {
  //Todo가 가져야 할 속성들을 정의해서 객체로 만들기
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}
const App = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  function handleAddTodo(
    id: number,
    title: string,
    content: string,
    isDone: boolean
  ): void {
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용을 모두 작성해주세요.");
      return;
    }
    const newTodo: Todo = { id, title, content, isDone };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
    setContent("");
  }

  const handleRemoveTodo = (id: number) =>
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  const handleDoneTodo = (id: number) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo))
    );
  const handleCancelTodo = (id: number) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isDone: false } : todo))
    );

  return (
    <div>
      <header>todoList by TypeScript</header>

      <div>
        <input
          className="inputTitle"
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.currentTarget.nodeName === "BUTTON") {
              handleAddTodo(todos.length + 1, title, content, false);
            }
          }}
        />
        <input
          className="inputTodo"
          type="text"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.currentTarget.nodeName === "BUTTON") {
              handleAddTodo(todos.length + 1, title, content, false);
            }
          }}
        />
      </div>
      <div>
        <button
          onClick={() => handleAddTodo(todos.length + 1, title, content, false)}
        >
          추가
        </button>
      </div>
      <h2>Working...</h2>
      {todos
        .filter((todo) => !todo.isDone)
        .map((todo) => (
          <div key={todo.id}>
            <>
              <h3>{todo.id}</h3>
              <h4>{todo.title}</h4>
              <div>{todo.content}</div>

              <button onClick={() => handleRemoveTodo(todo.id)}>삭제</button>
              <button onClick={() => handleDoneTodo(todo.id)}>완료</button>
            </>
          </div>
        ))}
      <h2>Done</h2>
      {todos
        .filter((todo) => todo.isDone)
        .map((todo) => (
          <div key={todo.id}>
            <>
              <h3>{todo.id}</h3>
              <h4>{todo.title}</h4>
              <div>{todo.content}</div>

              <button onClick={() => handleRemoveTodo(todo.id)}>삭제</button>
              <button onClick={() => handleCancelTodo(todo.id)}>취소</button>
            </>
          </div>
        ))}
    </div>
  );
};
export default App;

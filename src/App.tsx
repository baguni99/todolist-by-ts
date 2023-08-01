import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { styled } from "styled-components";
import createGlobalStyle from "styled-components";

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
      <GlobalStyles>
        <Header>TodoList by TypeScript</Header>
        <InputSpace>
          <div className="inputContainer">
            <span className="handEmoji">Write down your tasks!</span>
            <input
              className="inputTitle"
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => {
                if (
                  e.key === "Enter" ||
                  e.currentTarget.nodeName === "BUTTON"
                ) {
                  handleAddTodo(todos.length + 1, title, content, false);
                }
              }}
            />
            <br />
            <input
              className="inputTodo"
              type="text"
              placeholder="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyPress={(e) => {
                if (
                  e.key === "Enter" ||
                  e.currentTarget.nodeName === "BUTTON"
                ) {
                  handleAddTodo(todos.length + 1, title, content, false);
                }
              }}
            />
          </div>
          <div>
            <AddButton
              onClick={() =>
                handleAddTodo(todos.length + 1, title, content, false)
              }
            >
              <PlusImg src="/plus (1).png" alt="add" />
            </AddButton>
          </div>
        </InputSpace>
        <StateTitle>Working...</StateTitle>
        <WorkingSpace>
          {todos
            .filter((todo) => !todo.isDone)
            .map((todo) => (
              <div key={todo.id}>
                <WorkingTodo>
                  <h3>{todo.id}</h3>
                  <h4>{todo.title}</h4>
                  <div>{todo.content}</div>

                  <StyledButton onClick={() => handleRemoveTodo(todo.id)}>
                    삭제
                  </StyledButton>
                  <StyledButton onClick={() => handleDoneTodo(todo.id)}>
                    완료
                  </StyledButton>
                </WorkingTodo>
              </div>
            ))}
        </WorkingSpace>
        <StateTitle>Done</StateTitle>
        <WorkingSpace>
          {todos
            .filter((todo) => todo.isDone)
            .map((todo) => (
              <div key={todo.id}>
                <WorkingTodo>
                  <h3>{todo.id}</h3>
                  <h4>{todo.title}</h4>
                  <div>{todo.content}</div>

                  <StyledButton onClick={() => handleRemoveTodo(todo.id)}>
                    삭제
                  </StyledButton>
                  <StyledButton onClick={() => handleCancelTodo(todo.id)}>
                    취소
                  </StyledButton>
                </WorkingTodo>
              </div>
            ))}
        </WorkingSpace>
      </GlobalStyles>
    </div>
  );
};

const Header = styled.header`
  font-size: 40px;
  line-height: 42px;
  text-align: center;
  color: rgb(217, 217, 217);
  font-weight: 500;
  margin-bottom: 20px;
`;
const InputSpace = styled.div`
  background-color: RGB(217, 217, 217, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  width: 250px;
  margin: 20px auto;
  padding: 15px;
  margin-top: 40px;
  box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.6);

  .handEmoji {
    font-size: 20px;
    white-space: nowrap;
    margin-bottom: 10px;
  }

  .inputContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .inputTitle {
    width: 200px;
    padding: 5px;
    border-radius: 10px;
    border-color: transparent;
    box-sizing: border-box; // Include padding in the width
    border: 1px solid transparent; // Hide the default border
    font-family: inherit; // Inherit the font family
    font-size: inherit; // Inherit the font size
    resize: none; // Disable textarea resizing
    overflow: hidden;
  }
  .inputTodo {
    width: 200px;
    height: 100px;
    padding: 5px;
    border-radius: 10px;
    border-color: transparent;
    overflow-wrap: break-word;
    resize: none;
    box-sizing: border-box;
    border: 1px solid transparent;
    font-family: inherit;
    font-size: inherit;
    overflow: hidden;
    height: auto; // Allow the height to adjust to the content
    min-height: 30px; // Set a minimum height to avoid collapse
    line-height: 1.2em;
  }
`;
const WorkingSpace = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AddButton = styled.button`
  background-color: transparent;
  border-color: transparent;

  margin-top: 10px;
`;
const PlusImg = styled.img`
  width: 35px;
  height: 35px;
`;
const WorkingTodo = styled.div`
  background-color: RGB(217, 217, 217, 0.7);
  border-radius: 20px;
  padding: 20px;
  margin: 10px;
  width: 180px;
  height: 200px;
  box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.6);
  align-items: center;
`;
const StyledButton = styled.button`
  height: 30px;
  width: 70px;
  margin: 10px;
  border-radius: 10px;
  border-color: transparent;
  margin-top: 25px;
  &:hover {
    background-color: gray;
  }
`;
const GlobalStyles = createGlobalStyle.body`
    background-color: RGB(51,51,51,0.9);
    margin: 0;
    padding: 20px;
    padding-right:40px;
    padding-left:40px;
    font-family: 'Raleway', sans-serif;

`;
const StateTitle = styled.div`
  color: rgb(217, 217, 217);
  font-size: 30px;
`;
export default App;

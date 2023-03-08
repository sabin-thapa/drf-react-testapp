import React, { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import FilterTodo from "../components/FilterTodo";
import "../App.css";
import { BASE_URL } from "../config";
import getCookie from "../utils/getCookie";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [activeItem, setActiveItem] = useState({
    id: null,
    taskName: "",
    isCompleted: false,
  });

  const csrftoken = getCookie("csrftoken");

  const fetchTodos = () => {
    fetch(`${BASE_URL}/todos/`)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  const handleChange = (e) => {
    setActiveItem({ ...activeItem, taskName: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(activeItem, "SUBMIT");
    fetch(`${BASE_URL}/todo-create/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(activeItem),
    })
      .then((res) => {
        fetchTodos();
        setActiveItem({ id: null, taskName: "", isCompleted: false });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    console.log(BASE_URL, "BASE");
    fetchTodos(setTodos);
  }, []);

  return (
    <div className="container">
      <div className="form-wrapper">
        <form id="form" onSubmit={handleSubmit}>
          <div className="flex-wrapper">
            <div style={{ flex: 3 }}>
              <input
                className="form-control"
                id="todo"
                name="Todo"
                placeholder="Todo..."
                onChange={handleChange}
                value={activeItem.taskName}
              />
            </div>
            <div style={{ flex: 1 }}>
              <input
                className="btn btn-primary"
                id="submit"
                type="submit"
                name="Add"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="list-wrapper">
        {todos.map((todo, index) => (
          <div key={index} className="task-wrapper flex-wrapper">
            <div style={{ flex: 7 }}>
              <span> {todo.taskName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;

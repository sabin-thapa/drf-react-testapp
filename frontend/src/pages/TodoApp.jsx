import React, { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import FilterTodo from "../components/FilterTodo";
import "../App.css";
import { BASE_URL } from "../config";
import getCookie from "../utils/getCookie";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
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
    // console.log(activeItem, "SUBMIT");
    let fetchUrl;
    {
      !editing
        ? (fetchUrl = `${BASE_URL}/todo-create/`)
        : (fetchUrl = `${BASE_URL}/todo-update/${activeItem.id}`);
    }
    fetch(fetchUrl, {
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

  const handleEdit = (todo) => {
    setActiveItem(todo);
    setEditing(true);
  };

  const handleDelete = (todo) => {
    fetch(`${BASE_URL}/todo-delete/${todo.id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    }).then(res => {
        fetchTodos()
    }).catch(err => {
        console.error(err.message)
    })
  }

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
            <div style={{ flex: 1 }}>
              <button
                className="btn btn-sm btn-outline-info"
                onClick={() => handleEdit(todo)}
              >
                {" "}
                Edit
              </button>
            </div>
            <div style={{ flex: 1 }}>
              <button className="btn btn-sm btn-outline-dark" onClick={() => handleDelete(todo)}> Delete </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;

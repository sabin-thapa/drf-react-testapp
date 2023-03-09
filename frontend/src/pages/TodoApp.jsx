import React, { useEffect, useState } from "react";
import "../App.css";
import { BASE_URL } from "../config";
import getCookie from "../utils/getCookie";
import { FaEdit, FaTrash, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [activeItem, setActiveItem] = useState({
    id: null,
    taskName: "",
    isCompleted: false,
  });

  const csrftoken = getCookie("csrftoken");
  const navigate = useNavigate();

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
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((res) => {
        fetchTodos();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const strikeHandler = (todo) => {
    todo.isCompleted = !todo.isCompleted;
    fetch(`${BASE_URL}/todo-update/${todo.id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        isCompleted: todo.isCompleted,
        taskName: todo.taskName,
      }),
    })
      .then(() => {
        fetchTodos();
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
    <main className="container d-flex flex-column align-items-center">
      <div className="m-4">
        <form id="form" onSubmit={handleSubmit}>
          <div className="flex-wrapper">
            <div style={{ marginRight: "2rem", width: "25rem" }}>
              <input
                className="form-control"
                id="todo"
                name="Todo"
                placeholder="Add Todo..."
                onChange={handleChange}
                value={activeItem.taskName}
              />
            </div>
            <div>
              <input
                className="btn btn-outline-info "
                id="submit"
                name="Add"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>

      <div
        className="card p-4"
        style={{ width: "40rem", borderRadius: "0.8rem" }}
      >
        {todos.map((todo, index) => (
          <div
            key={index}
            className="task-wrapper flex-wrapper mt-3 pb-2 border-bottom border-secondary"
          >
            <div style={{ flex: 7, cursor: "pointer" }}>
              {!todo.isCompleted ? (
                <>
                  <span onClick={() => strikeHandler(todo)}>
                    {" "}
                    {todo.taskName}{" "}
                  </span>
                  <FaLink style={{ height: 10, width: 10, marginLeft: 5 }} onClick={() => navigate(`todo-detail/${todo.id}`)}/>
                </>
              ) : (
                <strike onClick={() => strikeHandler(todo)}> {todo.taskName}</strike>
              )}
            </div>
            <div style={{ flex: 1, mt: 4 }}>
              <FaEdit
                onClick={() => handleEdit(todo)}
                className="text-secondary"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div>
              <FaTrash
                onClick={() => handleDelete(todo)}
                className="text-danger"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TodoApp;

import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import getCookie from "../utils/getCookie";


const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const csrftoken = getCookie("csrftoken");
  const [todoData, setTodoData] = useState([]);

  const fetchTodo = () => {
    fetch(`${BASE_URL}/todo-detail/${id}/`)
      .then((res) => res.json())
      .then((data) => setTodoData(data));
  };

  const handleDelete = (id) => {
    fetch(`${BASE_URL}/todo-delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((res) => {
        navigate(-1);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    console.log(id);
    fetchTodo();
  }, []);
  return (
    <div className="card text-dark d-flex flex-row align-items-center p-3">
      <div>
        <h3> {todoData?.taskName} </h3>
        <p> {todoData?.description} </p>
      </div>
        <FaTrash
          onClick={() => handleDelete(todoData.id)}
          className="text-danger"
          style={{ cursor: "pointer", height: 15, width: 15, marginLeft: '2rem', marginTop: '-1rem' }}
        />
        <FaLongArrowAltLeft style={{position: 'fixed', right: 40, top:80, height: 20, width: 20, cursor: 'pointer'}} onClick={() => navigate(-1)}/>
    </div>
  );
};

export default TodoDetail;

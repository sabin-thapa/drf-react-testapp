import React, { useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";

const AddTodo = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async () => {
    if (!newTodo) return;

    const res = await axios.post(`${BASE_URL}/todo-create/`, {
      todoName: newTodo,
      isCompleted: false,
    });
    console.log(res.data, "Response");
    setTodos([res.data, ...todos]);
    setNewTodo("");
  };
  return (
    <div className="mx-auto text-center content-center">
      <input
        type="text"
        className="input inut-success rounded-l-full w-full max-w-xs m-5"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button
        className="btn btn-success rounded-r-full"
        onClick={handleAddTodo}
      >
        ADD TODO
      </button>
    </div>
  );
};

export default AddTodo;

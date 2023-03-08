import React, { useState } from "react";
import TodoList from "./TodoList";

const FilterTodo = ({ todos, setTodos }) => {
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return todo.active;
    if (filter === "inactive") return todo.inactive;
    return true;
  });

  return (
    <>
      <div className="text-center my-3 space-x-4">
        <button
          className={
            filter === "all"
              ? "btn btn-outline btn-primary btn-active rounded-l-full"
              : "btn btn-outline btn-primary btn-rounded-l-full"
          }
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={
            filter === "active"
              ? "btn btn-outline btn-light btn-active rounded-none"
              : "btn btn-outline btn-light rounded-none"
          }
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={
            filter === "inactive"
              ? "btn btn-outline btn-secondary btn-active rounded-r-full"
              : "btn btn-outline btn-secondary btn-rounded-r-full"
          }
          onClick={() => setFilter("inactive")}
        >
          Inactive
        </button>
      </div>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </>
  );
};

export default FilterTodo;

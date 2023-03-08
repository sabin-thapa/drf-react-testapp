import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import TodoApp from "./pages/TodoApp";

function App() {
  return (
    <div className="container p-4">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<TodoApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

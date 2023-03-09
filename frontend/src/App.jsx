import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoApp from "./pages/TodoApp";
import TodoDetail from "./pages/TodoDetail";

function App() {
  return (
    <div className="container  p-4 bg-dark text-dark mw-100" style={{minHeight: '100vh'}}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<TodoApp />} />
          <Route exact path="/todo-detail/:id" element={<TodoDetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

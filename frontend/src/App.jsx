import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoApp from "./pages/TodoApp";

function App() {
  return (
    <div className="container  p-4 bg-dark text-dark mw-100" style={{minHeight: '100vh'}}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<TodoApp />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

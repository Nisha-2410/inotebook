import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./Context/notes/NoteState";

function App() {
  return (
    <NoteState>
    <Router>
      <Navbar />
      <div className="container">
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;


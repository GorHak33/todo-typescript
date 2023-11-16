import React from "react";
import { Routes, Route } from "react-router";

import Trash from "./components/form/trash/Trash";

import TodoMain from "./components/form/TodoMain/TodoMain";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoMain />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </div>
  );
}

export default App;

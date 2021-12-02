import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TalkList from "./features/talkList/TalkList";
import Talk from "./features/talk/Talk";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<TalkList />} />
          <Route path="/:talkid" element={<Talk />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

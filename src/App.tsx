import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Timeline from "./components/Timeline";
import NoteDetail from "./components/NoteDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

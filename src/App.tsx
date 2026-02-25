import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import NoteDetail from "./components/NoteDetail";
import CreateNote from "./components/CreateNote";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: "0 20px" }}>
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/note/new" element={<CreateNote />} />
          <Route path="/note/:id" element={<NoteDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

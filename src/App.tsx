import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import NoteCardView from "./components/NoteCardView";
import NoteCardEdit from "./components/NoteCardEdit";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/note/new" element={<NoteCardEdit />} />
        <Route path="/note/:id" element={<NoteCardView />} />
        <Route path="/note/:id/edit" element={<NoteCardEdit />} />
      </Routes>
    </Router>
  );
}

export default App;

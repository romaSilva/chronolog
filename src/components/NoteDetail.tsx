import { useParams, Link } from "react-router-dom";
import type { Note } from "../types/note";
import NoteCard from "./NoteCard";
import notesData from "../utils/notes.json";

export default function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const note = notesData.find((n: Note) => n.id === id);

  if (!note) {
    return (
      <div>
        <h2>Note not found</h2>
        <Link to="/">Back to Timeline</Link>
      </div>
    );
  }

  const handleUpdateNote = (updatedNote: Partial<Note>) => {
    // Update the note in your backend/state
    console.log("Updated note:", updatedNote);
  };

  return (
    <div>
      <Link to="/">← Back to Timeline</Link>
      <NoteCard initialNote={note} onUpdate={handleUpdateNote} />
    </div>
  );
}

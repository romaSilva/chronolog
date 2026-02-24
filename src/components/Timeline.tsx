import { useState } from "react";
import type { Note } from "../types/note";
import NoteCard from "./NoteCard";
import notesData from "../utils/notes.json";

export default function Timeline() {
  const [selectedNote, setSelectedNote] = useState<Partial<Note> | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleCloseNote = () => {
    setSelectedNote(null);
  };

  const handleUpdateNote = (updatedNote: Partial<Note>) => {
    // Update the note in your backend/state
    console.log("Updated note:", updatedNote);
    handleCloseNote();
  };

  if (selectedNote) {
    return (
      <div>
        <button onClick={handleCloseNote}>Back to Timeline</button>
        <NoteCard
          initialNote={selectedNote}
          onUpdate={handleUpdateNote}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Timeline</h1>
      <div style={{ paddingLeft: "20px", borderLeft: "2px solid #ccc" }}>
        {notesData.map((note: Note) => (
          <div
            key={note.id}
            style={{
              marginBottom: "30px",
              paddingLeft: "20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "-11px",
                top: "5px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#333",
              }}
            />
            <button
              onClick={() => handleNoteClick(note)}
              style={{
                background: "none",
                border: "none",
                padding: "0",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <h3 style={{ margin: "0 0 5px 0", color: "#0066cc" }}>
                {note.title}
              </h3>
              <p style={{ margin: "0", color: "#666", fontSize: "0.9em" }}>
                {note.date}
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

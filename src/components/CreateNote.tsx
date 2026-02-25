import { Link, useNavigate } from "react-router-dom";
import type { Note } from "../types/note";
import NoteCard from "./NoteCard";
import * as noteService from "../services/noteService";

export default function CreateNote() {
  const navigate = useNavigate();

  const handleSubmitNote = async (noteData: Partial<Note>) => {
    try {
      await noteService.createNote(noteData);
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div>
      <Link to="/">← Back to Timeline</Link>
      <h2>Create New Note</h2>
      <NoteCard onSubmit={handleSubmitNote} />
    </div>
  );
}

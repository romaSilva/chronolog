import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTES } from "../utils/routes";
import type { Note } from "../types/note";
import * as noteService from "../services/noteService";

export default function NoteCardView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadNote = async () => {
      try {
        const fetchedNote = await noteService.readNote(id);
        setNote(fetchedNote);
      } catch (error) {
        console.error("Error loading note:", error);
        setNote(null);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await noteService.deleteNote(id);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return (
      <div>
        <h2>Note not found</h2>
        <Link to={ROUTES.HOME}>← Back to Timeline</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to={ROUTES.HOME}>← Back to Timeline</Link>
      <div style={{ marginTop: "20px" }}>
        <h2>{note.title}</h2>
        <p>
          <strong>Date:</strong> {note.date}
        </p>
        {note.content && (
          <div>
            <strong>Content:</strong>
            <p>{note.content}</p>
          </div>
        )}
        {note.tags && note.tags.length > 0 && (
          <div>
            <strong>Tags:</strong>
            <div>
              {note.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => id && navigate(ROUTES.NOTE_EDIT(id))}
          style={{ marginRight: "10px" }}
        >
          Edit
        </button>
        <button onClick={handleDelete} style={{ color: "red" }}>
          Delete
        </button>
      </div>
    </div>
  );
}

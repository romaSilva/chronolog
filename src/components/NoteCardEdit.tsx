import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTES } from "../utils/routes";
import { readNote, createNote, updateNote } from "../services/noteService";
import { validateNoteForm } from "../utils/validation";
import { useNoteForm } from "../hooks/useNoteForm";
import TagInput from "./TagInput";

export default function NoteCardEdit() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(id ? true : false);

  const navigate = useNavigate();
  const form = useNoteForm();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadNote = async () => {
      try {
        const note = await readNote(id);

        if (!note) {
          alert("Note not found.");
          navigate(ROUTES.HOME);
          return;
        }

        form.setTitle(note.title);
        form.setContent(note.content || "");
        form.setDate(note.date);
        form.setTags(note.tags || []);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const validation = validateNoteForm(form.title, form.date);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    const noteData = form.getFormData();

    if (isEditMode && id) {
      await updateNote(id, noteData);
      navigate(ROUTES.NOTE_VIEW(id));
    } else {
      const createdNote = await createNote(noteData);
      navigate(ROUTES.NOTE_VIEW(createdNote.id));
    }
  };

  const handleCancel = () => {
    if (isEditMode && id) {
      navigate(ROUTES.NOTE_VIEW(id));
    } else {
      navigate(ROUTES.HOME);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to={isEditMode && id ? ROUTES.NOTE_VIEW(id) : ROUTES.HOME}>
        ← Back
      </Link>
      <div style={{ marginTop: "20px" }}>
        <h2>{isEditMode ? "Edit Note" : "Create New Note"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => form.setTitle(e.target.value)}
              placeholder="Enter note title"
            />
          </div>

          <div>
            <label htmlFor="date">Date (YYYY, YYYY-MM, or YYYY-MM-DD)</label>
            <input
              id="date"
              type="text"
              value={form.date}
              onChange={(e) => form.setDate(e.target.value)}
              placeholder="e.g., 2026, 2026-02, 2026-02-24"
            />
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={form.content}
              onChange={(e) => form.setContent(e.target.value)}
              placeholder="Enter note content (optional)"
            />
          </div>

          <TagInput
            tags={form.tags}
            tagInput={form.tagInput}
            onTagInputChange={form.setTagInput}
            onAddTag={form.addTag}
            onRemoveTag={form.removeTag}
          />

          <button type="submit" style={{ marginRight: "10px" }}>
            {isEditMode ? "Save" : "Create"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

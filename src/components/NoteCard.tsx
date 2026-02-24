import { useState } from "react";
import type { Note } from "../types/note";

interface NoteCardProps {
  initialNote?: Partial<Note>;
  onSubmit?: (note: Partial<Note>) => void;
  onUpdate?: (note: Partial<Note>) => void;
}

export default function NoteCard({
  initialNote,
  onSubmit,
  onUpdate,
}: NoteCardProps) {
  // Determine default mode: view if initialNote provided, edit otherwise
  const isCreatingMode = !initialNote;
  const [mode, setMode] = useState<"view" | "edit">(
    isCreatingMode ? "edit" : "view",
  );

  // Form state
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [date, setDate] = useState(initialNote?.date || "");
  const [tags, setTags] = useState(initialNote?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const validateDate = (dateString: string): boolean => {
    const dateRegex = /^(\d{4})(-\d{2})?(-\d{2})?$/;
    return dateRegex.test(dateString);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (!date.trim()) {
      alert("Date is required");
      return;
    }

    if (!validateDate(date)) {
      alert(
        "Date must be in one of these formats: YYYY, YYYY-MM, or YYYY-MM-DD",
      );
      return;
    }

    const noteData = {
      title: title.trim(),
      content: content.trim(),
      date,
      tags,
    };

    // If editing an existing note, call onUpdate; otherwise call onSubmit
    if (initialNote && onUpdate) {
      onUpdate(noteData);
      setMode("view");
    } else if (onSubmit) {
      onSubmit(noteData);
    }
  };

  const handleCancel = () => {
    // Reset form to initialNote values and return to view mode
    setTitle(initialNote?.title || "");
    setContent(initialNote?.content || "");
    setDate(initialNote?.date || "");
    setTags(initialNote?.tags || []);
    setTagInput("");
    setMode("view");
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // View mode: formatted read-only display
  if (mode === "view") {
    return (
      <div>
        <div>
          <h2>{title}</h2>
          <p>
            <strong>Date:</strong> {date}
          </p>
          {content && (
            <div>
              <strong>Content:</strong>
              <p>{content}</p>
            </div>
          )}
          {tags.length > 0 && (
            <div>
              <strong>Tags:</strong>
              <div>
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <button onClick={() => setMode("edit")}>Edit</button>
      </div>
    );
  }

  // Edit mode: form
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
        />
      </div>

      <div>
        <label htmlFor="date">Date (YYYY, YYYY-MM, or YYYY-MM-DD)</label>
        <input
          id="date"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="e.g., 2026, 2026-02, 2026-02-24"
        />
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note content (optional)"
        />
      </div>

      <div>
        <label htmlFor="tagInput">Tags</label>
        <div>
          <input
            id="tagInput"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter a tag"
          />
          <button type="button" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>

        {tags.length > 0 && (
          <div>
            {tags.map((tag) => (
              <span key={tag}>
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  Remove
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button type="submit">{initialNote ? "Save" : "Submit"}</button>
      {initialNote && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

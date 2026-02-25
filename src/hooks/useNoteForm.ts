import { useState, useCallback } from "react";
import type { Note } from "../types/note";

interface NoteFormState {
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export const useNoteForm = (initialNote?: Partial<Note>) => {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [date, setDate] = useState(initialNote?.date || "");
  const [tags, setTags] = useState<string[]>(initialNote?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const getFormData = useCallback((): NoteFormState => {
    return {
      title: title.trim(),
      content: content.trim(),
      date,
      tags,
    };
  }, [title, content, date, tags]);

  const resetForm = useCallback(() => {
    setTitle(initialNote?.title || "");
    setContent(initialNote?.content || "");
    setDate(initialNote?.date || "");
    setTags(initialNote?.tags || []);
    setTagInput("");
  }, [initialNote]);

  const addTag = useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim();
      if (trimmedTag && !tags.includes(trimmedTag)) {
        setTags((prev) => [...prev, trimmedTag]);
        setTagInput("");
      }
    },
    [tags],
  );

  const removeTag = useCallback((tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  }, []);

  return {
    title,
    setTitle,
    content,
    setContent,
    date,
    setDate,
    tags,
    setTags,
    tagInput,
    setTagInput,
    addTag,
    removeTag,
    getFormData,
    resetForm,
  };
};

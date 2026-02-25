import type { Note } from "../types/note";
import notesData from "../utils/notes.json";

/**
 * Creates a new note with an auto-generated ID
 * @param note - Partial note data (without ID)
 * @returns Promise resolving to the created note with ID
 */
export async function createNote(note: Partial<Note>): Promise<Note> {
  // TODO: Implement backend call to create note
  // Should generate ID and return complete note
  console.log("createNote called with:", note);
  throw new Error("Not implemented");
}

/**
 * Retrieves a note by ID
 * @param id - The note ID
 * @returns Promise resolving to the note, or null if not found
 */
export async function readNote(id: string): Promise<Note | null> {
  const note = notesData.find((n: Note) => n.id === id);
  return note || null;
}

/**
 * Updates an existing note
 * @param id - The note ID
 * @param note - Partial note data to update
 * @returns Promise resolving to the updated note
 */
export async function updateNote(
  id: string,
  note: Partial<Note>,
): Promise<Note> {
  // TODO: Implement backend call to update note
  console.log("updateNote called with id:", id, "and note:", note);
  throw new Error("Not implemented");
}

/**
 * Deletes a note by ID
 * @param id - The note ID
 * @returns Promise resolving when note is deleted
 */
export async function deleteNote(id: string): Promise<void> {
  // TODO: Implement backend call to delete note
  console.log("deleteNote called with id:", id);
  throw new Error("Not implemented");
}

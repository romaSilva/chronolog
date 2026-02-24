## Plan: NoteEditor Component (Updated)

**TL;DR:** Create a form component in NoteEditor.tsx that manages note state with required fields for title and date, plus optional content and tags. Accept optional initial note data as props and call an `onSubmit` callback with the note data. Form validation requires both title and date to be filled. Date field accepts flexible formats: full date (YYYY-MM-DD), month-year (YYYY-MM), or year only (YYYY).

**Steps**

1. Import dependencies: `useState` from React, `Note` type from [types/note.ts](./types/note.ts), and define prop types
   - Props: `initialNote?: Partial<Note>` (optional), `onSubmit: (note: Partial<Note>) => void` (callback)

2. Set up state with `useState` for:
   - `title` (string)
   - `content` (string)
   - `date` (string, flexible format: YYYY, YYYY-MM, or YYYY-MM-DD)
   - `tags` (string array)

3. Initialize state from `initialNote` if provided, otherwise use empty defaults (date starts empty)

4. Create form fields:
   - Title input (required, text)
   - Date input (required, text field accepting YYYY, YYYY-MM, or YYYY-MM-DD formats with helpful placeholder/hint)
   - Content textarea (optional)
   - Tags section (optional):
     - Display existing tags with remove buttons
     - Input field + "Add tag" button to add new tags

5. Add form submission handler that:
   - Validates title is filled
   - Validates date is filled and matches one of the three formats (YYYY, YYYY-MM, or YYYY-MM-DD)
   - Calls `onSubmit` with the note data

6. Return JSX with form structure (no styling needed)

**Verification**

- Component renders without errors
- Form fields update state when typing
- Tags can be added and removed
- Form submission is blocked if title or date are empty
- Form submission is blocked if date doesn't match valid formats (YYYY, YYYY-MM, YYYY-MM-DD)
- Form calls callback with correct data when validation passes
- Pre-pop works if initial note is passed
- Date validation accepts all three formats

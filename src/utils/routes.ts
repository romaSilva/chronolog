export const ROUTES = {
  HOME: "/",
  NOTE_NEW: "/note/new",
  NOTE_VIEW: (id: string) => `/note/${id}`,
  NOTE_EDIT: (id: string) => `/note/${id}/edit`,
} as const;

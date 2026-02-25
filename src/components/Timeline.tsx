import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import type { Note } from "../types/note";
import notesData from "../utils/notes.json";

export default function Timeline() {
  return (
    <div>
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
            <Link
              to={ROUTES.NOTE_VIEW(note.id)}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h3 style={{ margin: "0 0 5px 0", color: "#0066cc" }}>
                {note.title}
              </h3>
              <p style={{ margin: "0", color: "#666", fontSize: "0.9em" }}>
                {note.date}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

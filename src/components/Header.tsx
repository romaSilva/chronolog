import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";

export default function Header() {
  return (
    <header
      style={{
        marginBottom: "30px",
        borderBottom: "2px solid #ccc",
        paddingBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Chronolog</h1>
        <Link to={ROUTES.NOTE_NEW}>
          <button>Add Note</button>
        </Link>
      </div>
    </header>
  );
}

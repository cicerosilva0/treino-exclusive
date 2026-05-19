import { useApp } from "../context/AppContext";
import { Home, BookOpen } from "lucide-react";

export default function BottomNav() {
  const { page, setPage } = useApp();

  if (page === "exercicio") return null;

  return (
    <nav className="bottom-nav">
      <button
        className={`nav-btn ${page === "dashboard" || page === "exercicios" ? "active" : ""}`}
        onClick={() => setPage("dashboard")}
      >
        <Home size={22} />
        <span>Treinos</span>
      </button>
      <button
        className={`nav-btn ${page === "biblioteca" ? "active" : ""}`}
        onClick={() => setPage("biblioteca")}
      >
        <BookOpen size={22} />
        <span>Biblioteca</span>
      </button>
    </nav>
  );
}

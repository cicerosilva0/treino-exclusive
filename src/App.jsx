import { AppProvider, useApp } from "./context/AppContext";
import Dashboard from "./components/Dashboard";
import ListaExercicios from "./components/ListaExercicios";
import ExercicioDetalhe from "./components/ExercicioDetalhe";
import Biblioteca from "./components/Biblioteca";
import BottomNav from "./components/BottomNav";
import "./App.css";

function Router() {
  const { page } = useApp();

  return (
    <div className="app-shell">
      <main className="main-content">
        {page === "dashboard" && <Dashboard />}
        {page === "exercicios" && <ListaExercicios />}
        {page === "exercicio" && <ExercicioDetalhe />}
        {page === "biblioteca" && <Biblioteca />}
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

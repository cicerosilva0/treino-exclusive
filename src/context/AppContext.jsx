import { createContext, useContext, useState, useEffect } from "react";
import { treinos } from "../data/treinos";

const AppContext = createContext(null);

const STORAGE_KEY = "treino_exclusive_v1";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function AppProvider({ children }) {
  const [page, setPage] = useState("dashboard"); // dashboard | exercicios | exercicio | biblioteca
  const [selectedTreino, setSelectedTreino] = useState(null); // 'A', 'B', ...
  const [selectedExercicio, setSelectedExercicio] = useState(null); // exercicio object
  const [selectedSemana, setSelectedSemana] = useState(null);

  // Progress data: { treinoKey: { exercicioId: { kg: '', series: [{reps, kg}] } } }
  const [progress, setProgress] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(progress);
  }, [progress]);

  function salvarCarga(treinoKey, exercicioId, serieIdx, dados) {
    setProgress((prev) => {
      const newProg = { ...prev };
      if (!newProg[treinoKey]) newProg[treinoKey] = {};
      if (!newProg[treinoKey][exercicioId]) newProg[treinoKey][exercicioId] = { series: [] };
      const series = [...(newProg[treinoKey][exercicioId].series || [])];
      series[serieIdx] = { ...series[serieIdx], ...dados };
      newProg[treinoKey][exercicioId] = { ...newProg[treinoKey][exercicioId], series };
      return newProg;
    });
  }

  function getCarga(treinoKey, exercicioId) {
    return progress?.[treinoKey]?.[exercicioId] || { series: [] };
  }

  function navegarParaTreino(treinoKey, semana = null) {
    setSelectedTreino(treinoKey);
    setSelectedSemana(semana);
    setPage("exercicios");
  }

  function navegarParaExercicio(exercicio, treinoKey) {
    setSelectedExercicio({ ...exercicio, treinoKey });
    setPage("exercicio");
  }

  function voltar() {
    if (page === "exercicio") {
      setPage("exercicios");
    } else {
      setPage("dashboard");
      setSelectedTreino(null);
      setSelectedSemana(null);
    }
  }

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        selectedTreino,
        selectedExercicio,
        selectedSemana,
        progress,
        salvarCarga,
        getCarga,
        navegarParaTreino,
        navegarParaExercicio,
        voltar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

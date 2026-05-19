import { treinos } from "../data/treinos";
import { getSmartworkoutUrl } from "../data/smartworkoutUrls";
import { useApp } from "../context/AppContext";
import { ArrowLeft, ChevronRight, Dumbbell, ExternalLink, Clock } from "lucide-react";

export default function ListaExercicios() {
  const { selectedTreino, selectedSemana, navegarParaExercicio, voltar, getCarga } = useApp();

  if (!selectedTreino) return null;

  const treino = treinos[selectedTreino];

  function getSeriesFeitas(exercicioId) {
    const carga = getCarga(selectedTreino, exercicioId);
    return (carga.series || []).filter((s) => s && s.kg).length;
  }

  return (
    <div className="lista-page">
      {/* Header */}
      <div className="lista-header" style={{ borderBottom: `3px solid ${treino.cor}` }}>
        <button className="back-btn" onClick={voltar}>
          <ArrowLeft size={20} />
        </button>
        <div className="lista-title">
          <div
            className="treino-badge-lg"
            style={{ background: treino.cor, boxShadow: `0 4px 20px ${treino.cor}66` }}
          >
            {selectedTreino}
          </div>
          <div>
            <h1>{treino.nome}</h1>
            {selectedSemana && <p className="semana-ref">Semana {selectedSemana}</p>}
          </div>
        </div>
      </div>

      {/* Aquecimento note */}
      <div className="aquecimento-banner">
        <Dumbbell size={14} />
        <span>Aquecimento: 1 série × 20 reps (sem carga) antes do 1º exercício</span>
      </div>

      {/* Exercises */}
      <div className="exercicios-lista">
        {treino.exercicios.length === 0 ? (
          <div className="empty-treino">
            <Dumbbell size={40} color="#333" />
            <p>Treino em construção</p>
            <span>Aguarde atualização da ficha</span>
          </div>
        ) : (
          treino.exercicios.map((ex, idx) => {
            const feitas = getSeriesFeitas(ex.id);
            const total = ex.series;
            const completo = feitas >= total;

            return (
              <div
                key={ex.id}
                className={`exercicio-item ${completo ? "completo" : ""}`}
                onClick={() => navegarParaExercicio(ex, selectedTreino)}
              >
                <div className="ex-num" style={{ background: completo ? treino.cor : "#1a1a1a" }}>
                  {completo ? "✓" : idx + 1}
                </div>
                <div className="ex-info">
                  <h3 className="ex-nome">{ex.nome}</h3>
                  <div className="ex-meta">
                    <span className="ex-tag">{ex.series}x</span>
                    <span className="ex-tag">{ex.reps} reps</span>
                    <span className="ex-tag">
                      <Clock size={10} /> Cad {ex.cad || treino.cad}
                    </span>
                  </div>
                  {feitas > 0 && (
                    <div className="progress-bar-mini">
                      <div
                        className="progress-fill-mini"
                        style={{
                          width: `${(feitas / total) * 100}%`,
                          background: treino.cor,
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="ex-actions">
                  <a
                    href={getSmartworkoutUrl(ex.nome)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sw-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} />
                  </a>
                  <ChevronRight size={18} color="#555" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cardio reminder */}
      <div className="cardio-reminder">
        <Clock size={14} />
        <span>Após o treino: 20-30 min de Esteira ou Bicicleta</span>
      </div>
    </div>
  );
}

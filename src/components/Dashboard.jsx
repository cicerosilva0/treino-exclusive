import { useState } from "react";
import { userInfo, planoSemanal, diasSemana, treinos, tipoDescricao } from "../data/treinos";
import { useApp } from "../context/AppContext";
import { Dumbbell, Target, Calendar, ChevronRight, Star, Info } from "lucide-react";

function getSemanaAtual() {
  const hoje = new Date();
  const dataInicio2024 = new Date("2024-05-13");
  const diff = Math.floor((hoje - dataInicio2024) / (7 * 24 * 60 * 60 * 1000));
  return Math.min(Math.max(diff + 1, 1), 14);
}

const corTreino = {
  A: "#2563eb",
  B: "#16a34a",
  C: "#dc2626",
  D: "#9333ea",
  E: "#ea580c",
  F: "#0891b2",
  G: "#be185d",
  H: "#78350f",
};

export default function Dashboard() {
  const { navegarParaTreino } = useApp();
  const semanaAtual = getSemanaAtual();
  const [semanaExpandida, setSemanaExpandida] = useState(semanaAtual);

  return (
    <div className="dashboard">
      {/* Hero Header */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="logo-badge">
            <span className="logo-text">FITNESS</span>
            <span className="logo-exclusive">EXCLUSIVE</span>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              <Dumbbell size={28} color="#0a0a0a" />
            </div>
            <div>
              <p className="user-name">{userInfo.nome}</p>
              <div className="user-meta">
                <Target size={12} />
                <span>{userInfo.objetivo}</span>
              </div>
            </div>
          </div>
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-val">14</span>
              <span className="stat-label">Semanas</span>
            </div>
            <div className="stat-card">
              <span className="stat-val">7</span>
              <span className="stat-label">Treinos</span>
            </div>
            <div className="stat-card accent">
              <span className="stat-val">{semanaAtual}</span>
              <span className="stat-label">Semana Atual</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cardio info */}
      <div className="cardio-banner">
        <Info size={14} />
        <span>Cardio após treino: {userInfo.cardioApos}</span>
      </div>

      {/* Weekly Plan */}
      <div className="section">
        <div className="section-header">
          <Calendar size={18} />
          <h2>Plano Semanal</h2>
        </div>

        <div className="semanas-lista">
          {planoSemanal.map((semana) => {
            const isAtual = semana.semana === semanaAtual;
            const isExpanded = semanaExpandida === semana.semana;
            const tipo = tipoDescricao[semana.tipo];

            return (
              <div
                key={semana.semana}
                className={`semana-card ${isAtual ? "semana-atual" : ""}`}
              >
                <div
                  className="semana-header"
                  onClick={() => setSemanaExpandida(isExpanded ? null : semana.semana)}
                >
                  <div className="semana-left">
                    {isAtual && <Star size={12} className="star-icon" />}
                    <span className="semana-num">Semana {semana.semana}</span>
                    <span className="semana-data">{semana.dataInicio}</span>
                  </div>
                  <div className="semana-right">
                    <span
                      className="tipo-badge"
                      style={{ background: tipo.cor + "22", color: tipo.cor, borderColor: tipo.cor + "44" }}
                    >
                      {tipo.label}
                    </span>
                    <ChevronRight
                      size={16}
                      className={`chevron ${isExpanded ? "rotated" : ""}`}
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="semana-body">
                    <p className="semana-descricao">{semana.descricao}</p>
                    <div className="dias-grid">
                      {diasSemana.map(({ key, label, nome }) => {
                        const treinoKey = semana.dias[key];
                        return (
                          <div key={key} className="dia-col">
                            <span className="dia-label">{nome.slice(0, 3)}</span>
                            {treinoKey ? (
                              <button
                                className="treino-btn"
                                style={{
                                  background: corTreino[treinoKey],
                                  boxShadow: `0 4px 16px ${corTreino[treinoKey]}55`,
                                }}
                                onClick={() => navegarParaTreino(treinoKey, semana.semana)}
                              >
                                {treinoKey}
                              </button>
                            ) : (
                              <div className="dia-vazio">–</div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Intensidade/Volume bars */}
                    <div className="barras">
                      <div className="barra-row">
                        <span>Intensidade</span>
                        <div className="barra-track">
                          <div
                            className="barra-fill intensidade"
                            style={{ width: `${semana.intensidade}%` }}
                          />
                        </div>
                        <span className="barra-val">{semana.intensidade}%</span>
                      </div>
                      <div className="barra-row">
                        <span>Volume</span>
                        <div className="barra-track">
                          <div
                            className="barra-fill volume"
                            style={{ width: `${semana.volume}%` }}
                          />
                        </div>
                        <span className="barra-val">{semana.volume}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

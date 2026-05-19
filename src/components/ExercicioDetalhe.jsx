import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { treinos } from "../data/treinos";
import { getSmartworkoutUrl } from "../data/smartworkoutUrls";
import { parseRepsPorSerie } from "../data/utils";
import { useStopwatch, useCountdown, formatTime } from "../hooks/useTimer";
import {
  ArrowLeft, Play, Pause, RotateCcw, Timer, ExternalLink,
  CheckCircle, Circle, ChevronDown, ChevronUp, Bell,
} from "lucide-react";

export default function ExercicioDetalhe() {
  const { selectedExercicio, voltar, salvarCarga, getCarga } = useApp();

  if (!selectedExercicio) return null;

  const { treinoKey } = selectedExercicio;
  const treino = treinos[treinoKey];
  const cor = treino.cor;

  // Load saved progress
  const saved = getCarga(treinoKey, selectedExercicio.id);
  const totalSeries = selectedExercicio.series;
  const repsPorSerie = parseRepsPorSerie(selectedExercicio.reps, totalSeries);

  const [seriesData, setSeriesData] = useState(() => {
    const base = Array.from({ length: totalSeries }, (_, i) => ({
      reps: "",
      kg: "",
      done: false,
    }));
    if (saved.series) {
      saved.series.forEach((s, i) => {
        if (s && i < base.length) base[i] = { ...base[i], ...s };
      });
    }
    return base;
  });

  const [intervaloSecs, setIntervaloSecs] = useState(treino.intervalo || 60);
  const [showTimer, setShowTimer] = useState(false);

  const stopwatch = useStopwatch();
  const countdown = useCountdown(intervaloSecs);

  function handleSerieChange(idx, field, value) {
    setSeriesData((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  }

  function toggleDone(idx) {
    setSeriesData((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], done: !next[idx].done };
      // auto-save
      salvarCarga(treinoKey, selectedExercicio.id, idx, next[idx]);
      return next;
    });
    // Start rest countdown
    if (!seriesData[idx].done) {
      countdown.reset(intervaloSecs);
      countdown.start();
      setShowTimer(true);
    }
  }

  function saveAll() {
    seriesData.forEach((s, i) => {
      salvarCarga(treinoKey, selectedExercicio.id, i, s);
    });
  }

  // Save on unmount
  useEffect(() => () => saveAll(), []);

  const done = seriesData.filter((s) => s.done).length;
  const percent = (done / totalSeries) * 100;



  const restOptions = [30, 45, 60, 90, 120, 180];

  return (
    <div className="exercicio-page">
      {/* Header */}
      <div className="ex-header" style={{ borderBottom: `3px solid ${cor}` }}>
        <button className="back-btn" onClick={() => { saveAll(); voltar(); }}>
          <ArrowLeft size={20} />
        </button>
        <div className="ex-header-info">
          <h1 className="ex-titulo">{selectedExercicio.nome}</h1>
          <div className="ex-subtags">
            <span style={{ color: cor }}>{treino.nome}</span>
            <span>·</span>
            <span>{totalSeries} séries</span>
            <span>·</span>
            <span>{selectedExercicio.reps} reps</span>
          </div>
        </div>
        <a
          href={getSmartworkoutUrl(selectedExercicio.nome)}
          target="_blank"
          rel="noopener noreferrer"
          className="sw-btn"
          style={{ background: cor + "22", color: cor }}
        >
          <ExternalLink size={14} />
          <span>Ver execução</span>
        </a>
      </div>

      {/* Progress ring */}
      <div className="progress-ring-section">
        <svg className="ring-svg" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1a1a" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="50" fill="none"
            stroke={cor} strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - percent / 100)}`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
          <text x="60" y="55" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700" fontFamily="Barlow Condensed">
            {done}/{totalSeries}
          </text>
          <text x="60" y="72" textAnchor="middle" fill="#888" fontSize="10" fontFamily="Barlow">
            séries
          </text>
        </svg>

        {/* Stopwatch */}
        <div className="stopwatch-box">
          <p className="sw-label">Tempo total</p>
          <p className="sw-time" style={{ color: cor }}>{formatTime(stopwatch.time)}</p>
          <div className="sw-controls">
            <button onClick={stopwatch.toggle} className="sw-ctrl-btn" style={{ background: cor }}>
              {stopwatch.running ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button onClick={stopwatch.reset} className="sw-ctrl-btn ghost">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Rest Timer */}
      <div className="rest-section">
        <div className="rest-header" onClick={() => setShowTimer(!showTimer)}>
          <div className="rest-title">
            <Timer size={16} />
            <span>Descanso entre séries</span>
          </div>
          {showTimer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {showTimer && (
          <div className="rest-body">
            {/* Interval selector */}
            <div className="interval-btns">
              {restOptions.map((s) => (
                <button
                  key={s}
                  className={`interval-btn ${intervaloSecs === s ? "active" : ""}`}
                  style={intervaloSecs === s ? { background: cor, borderColor: cor } : {}}
                  onClick={() => { setIntervaloSecs(s); countdown.reset(s); }}
                >
                  {s < 60 ? `${s}"` : `${s / 60}'`}
                </button>
              ))}
            </div>

            {/* Countdown display */}
            <div className={`countdown-display ${countdown.finished ? "finished" : ""}`}>
              <p
                className="countdown-time"
                style={{ color: countdown.finished ? "#22c55e" : countdown.time < 10 ? "#ef4444" : cor }}
              >
                {formatTime(countdown.time)}
              </p>
              {countdown.finished && (
                <div className="rest-done">
                  <Bell size={20} />
                  <span>Descanso concluído!</span>
                </div>
              )}
            </div>

            <div className="countdown-controls">
              <button onClick={countdown.toggle} className="sw-ctrl-btn" style={{ background: cor }}>
                {countdown.running ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button onClick={() => countdown.reset(intervaloSecs)} className="sw-ctrl-btn ghost">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Series table */}
      <div className="series-section">
        <h2 className="series-title">Registrar Séries</h2>

        <div className="series-header-row">
          <span>Série</span>
          <span>Reps Alvo</span>
          <span>Carga (kg)</span>
          <span>Reps Feitas</span>
          <span>✓</span>
        </div>

        {seriesData.map((serie, idx) => (
          <div
            key={idx}
            className={`serie-row ${serie.done ? "serie-done" : ""}`}
            style={serie.done ? { borderLeft: `3px solid ${cor}` } : {}}
          >
            <span
              className="serie-num"
              style={serie.done ? { background: cor, color: "#000" } : {}}
            >
              {idx + 1}
            </span>
            <span className="serie-alvo">{repsPorSerie[idx]}</span>
            <input
              className="serie-input"
              type="number"
              placeholder="kg"
              value={serie.kg}
              onChange={(e) => handleSerieChange(idx, "kg", e.target.value)}
              onBlur={saveAll}
            />
            <input
              className="serie-input"
              type="number"
              placeholder="reps"
              value={serie.reps}
              onChange={(e) => handleSerieChange(idx, "reps", e.target.value)}
              onBlur={saveAll}
            />
            <button
              className="done-btn"
              onClick={() => toggleDone(idx)}
            >
              {serie.done
                ? <CheckCircle size={24} style={{ color: cor }} />
                : <Circle size={24} color="#333" />
              }
            </button>
          </div>
        ))}
      </div>

      {/* Save button */}
      <button
        className="save-btn"
        style={{ background: cor, boxShadow: `0 4px 20px ${cor}55` }}
        onClick={saveAll}
      >
        Salvar Progresso
      </button>
    </div>
  );
}

import { useState } from "react";
import { treinos } from "../data/treinos";
import { Search, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

const todosExercicios = Object.entries(treinos).flatMap(([key, treino]) =>
  treino.exercicios.map((ex) => ({ ...ex, treinoKey: key, treinoNome: treino.nome, treinoCor: treino.cor }))
);

const grupos = {
  Peito: ["Supino", "Cross", "Voador"],
  Ombro: ["Desenvolvimento", "Elevação Lateral", "Voador Inverso"],
  Tríceps: ["Tríceps", "Pulley", "Testa", "Francês", "Corda"],
  Bíceps: ["Rosca"],
  Costas: ["Remada", "Puxador"],
  Pernas: ["Leg", "Hack", "Extensora", "Flexora", "Afundo", "Agachamento", "Panturrilha", "Sumô"],
  Glúteos: ["Elevação Pélvica", "Abdutora"],
  ABS: ["ABS"],
};

function getGrupo(nome) {
  for (const [grupo, palavras] of Object.entries(grupos)) {
    if (palavras.some((p) => nome.toLowerCase().includes(p.toLowerCase()))) {
      return grupo;
    }
  }
  return "Outros";
}

function getSmartworkoutUrl(nome) {
  const query = encodeURIComponent(nome.replace(/\s*\([^)]+\)/g, "").trim());
  return `https://smartworkout.app/pt/biblioteca-de-exercicios?q=${query}`;
}

export default function Biblioteca() {
  const [busca, setBusca] = useState("");
  const [expandido, setExpandido] = useState(null);

  const filtrados = todosExercicios.filter((ex) =>
    ex.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Group by muscle
  const agrupados = {};
  filtrados.forEach((ex) => {
    const g = getGrupo(ex.nome);
    if (!agrupados[g]) agrupados[g] = [];
    if (!agrupados[g].find((e) => e.nome === ex.nome)) {
      agrupados[g].push(ex);
    }
  });

  return (
    <div className="biblioteca-page">
      <div className="bib-header">
        <h1>Biblioteca</h1>
        <p>Todos os exercícios da sua ficha</p>
      </div>

      <div className="search-box">
        <Search size={16} color="#888" />
        <input
          className="search-input"
          placeholder="Buscar exercício..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grupos-lista">
        {Object.entries(agrupados).map(([grupo, exercicios]) => (
          <div key={grupo} className="grupo-card">
            <div
              className="grupo-header"
              onClick={() => setExpandido(expandido === grupo ? null : grupo)}
            >
              <div className="grupo-title">
                <span className="grupo-nome">{grupo}</span>
                <span className="grupo-count">{exercicios.length}</span>
              </div>
              {expandido === grupo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {expandido === grupo && (
              <div className="grupo-body">
                {exercicios.map((ex) => (
                  <div key={ex.id} className="bib-item">
                    <div className="bib-left">
                      <div
                        className="bib-dot"
                        style={{ background: ex.treinoCor }}
                      />
                      <div>
                        <p className="bib-nome">{ex.nome}</p>
                        <div className="bib-tags">
                          <span
                            className="bib-tag"
                            style={{ color: ex.treinoCor, borderColor: ex.treinoCor + "44" }}
                          >
                            {ex.treinoNome}
                          </span>
                          <span className="bib-tag">{ex.series}x {ex.reps}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={getSmartworkoutUrl(ex.nome)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bib-link"
                    >
                      <ExternalLink size={14} />
                      <span>Ver</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bib-footer">
        <p>Powered by</p>
        <a
          href="https://smartworkout.app/pt/biblioteca-de-exercicios"
          target="_blank"
          rel="noopener noreferrer"
          className="sw-full-link"
        >
          SmartWorkout Biblioteca Completa
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

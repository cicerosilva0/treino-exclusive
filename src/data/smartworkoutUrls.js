// Mapeamento direto dos exercícios para URLs corretas da SmartWorkout
// Base: https://smartworkout.app/pt/biblioteca-de-exercicios/{grupo}/{slug}

const BASE = "https://smartworkout.app/pt/biblioteca-de-exerc%C3%ADcios";

export const smartworkoutUrls = {
  // PEITO
  "Supino Reto (B)":            `${BASE}/peito/supino-reto-deitado`,
  "Supino Inclinado (H)":       `${BASE}/peito/supino-inclinado-halteres`,
  "Voador":                     `${BASE}/peito/crucifixo-maquina`,
  "Cross Over P. (Alta)":       `${BASE}/peito/crossover-polia-alta`,

  // OMBROS
  "Desenvolvimento (H)":        `${BASE}/ombros/desenvolvimento-halteres`,
  "Elevação Lateral (H)":       `${BASE}/ombros/elevacao-lateral-halteres`,
  "Desenvolvimento Art. (Pro)": `${BASE}/ombros/desenvolvimento-maquina`,
  "Voador Inverso":             `${BASE}/ombros/crucifixo-invertido-maquina`,

  // TRÍCEPS
  "Tríceps Corda":              `${BASE}/triceps/triceps-polia-corda`,
  "Tríceps Francês (H)":        `${BASE}/triceps/triceps-frances-halteres`,
  "Tríceps Testa (B)":          `${BASE}/triceps/triceps-testa-barra`,
  "Tríceps Pulley (Pro)":       `${BASE}/triceps/triceps-pulley-polia-alta`,

  // BÍCEPS
  "Rosca Martelo (H)":          `${BASE}/biceps/rosca-martelo-halteres`,
  "Rosca Direta (B)":           `${BASE}/biceps/rosca-direta-barra`,
  "Rosca Scott (B)":            `${BASE}/biceps/rosca-scott-barra`,
  "Rosca Martelo Corda":        `${BASE}/biceps/rosca-martelo-corda`,

  // COSTAS
  "Remada Baixa Art. (N)":      `${BASE}/costas/remada-baixa-maquina-neutra`,
  "Puxador Vertical Art. (Pro)":`${BASE}/costas/puxador-vertical-maquina`,
  "Puxador Alto (N)":           `${BASE}/costas/puxador-vertical-pegada-neutra`,
  "Remada Baixa (Pro)":         `${BASE}/costas/remada-baixa-polia`,
  "Remada Curvada (Pro)":       `${BASE}/costas/remada-curvada-pronada`,
  "Puxador Alto (Pro)":         `${BASE}/costas/puxador-vertical-pronado`,
  "Remada Baixa (N)":           `${BASE}/costas/remada-baixa-polia`,
  "ABS Supra CC":               `${BASE}/abdomen/abdominal-supra`,
  "ABS Remador":                `${BASE}/abdomen/abdominal-remador`,

  // PERNAS
  "Leg Press 45":               `${BASE}/pernas/leg-press-45`,
  "Hack Machine":               `${BASE}/pernas/hack-squat-maquina`,
  "Extensora":                  `${BASE}/pernas/extensora`,
  "Afundo (H)":                 `${BASE}/pernas/afundo-halteres`,
  "Flexora Sentada":            `${BASE}/pernas/flexora-sentada`,
  "Flexora Deitada":            `${BASE}/pernas/flexora-deitada`,
  "Panturrilha Sentada":        `${BASE}/pernas/panturrilha-sentada`,
  "Agachamento no Smith":       `${BASE}/pernas/agachamento-smith`,
  "Hack Squat Dorsal":          `${BASE}/pernas/hack-squat-maquina`,
  "Panturrilha no Smith":       `${BASE}/pernas/panturrilha-smith`,
  "Agachamento Sumô":           `${BASE}/pernas/agachamento-sumo`,
  "Hack Squat Frontal":         `${BASE}/pernas/hack-squat-maquina`,
  "Abdutora":                   `${BASE}/pernas/abdutora-maquina`,
  "Elevação Pélvica":           `${BASE}/pernas/elevacao-pelvica`,
};

// Fallback: página inicial da biblioteca
const FALLBACK = "https://smartworkout.app/pt/biblioteca-de-exerc%C3%ADcios";

export function getSmartworkoutUrl(nomeExercicio) {
  // Tenta o nome exato primeiro
  if (smartworkoutUrls[nomeExercicio]) {
    return smartworkoutUrls[nomeExercicio];
  }
  // Tenta sem o sufixo entre parênteses ex: "Remada Baixa (N)" → "Remada Baixa"
  const semParenteses = nomeExercicio.replace(/\s*\([^)]+\)/g, "").trim();
  const parcial = Object.entries(smartworkoutUrls).find(([k]) =>
    k.replace(/\s*\([^)]+\)/g, "").trim().toLowerCase() === semParenteses.toLowerCase()
  );
  if (parcial) return parcial[1];

  // Fallback para a biblioteca geral
  return FALLBACK;
}

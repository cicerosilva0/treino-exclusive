// Interpreta a string de repetições da ficha e retorna
// a meta individual para cada série.
//
// Exemplos:
//   "15-12-10"   + 3 séries → ["15", "12", "10"]
//   "15-12-10-8" + 4 séries → ["15", "12", "10", "8"]
//   "12 A 15"    + 3 séries → ["12 a 15", "12 a 15", "12 a 15"]
//   "20"         + 4 séries → ["20", "20", "20", "20"]
//   "12x10"      + 3 séries → ["12x10", "12x10", "12x10"]

export function parseRepsPorSerie(repsStr, totalSeries) {
  if (!repsStr) return Array(totalSeries).fill("?");

  // Formato pirâmide: só números separados por hífen ex "15-12-10"
  const partes = repsStr.split("-").map((p) => p.trim());
  const isPiramide = partes.length > 1 && partes.every((p) => /^\d+$/.test(p));

  if (isPiramide) {
    return Array.from(
      { length: totalSeries },
      (_, i) => partes[i] ?? partes[partes.length - 1]
    );
  }

  // Qualquer outro formato: repete o mesmo valor em todas as séries
  return Array(totalSeries).fill(repsStr);
}

import { CATEGORIES, KEYWORD_RULES, MERCHANT_RULES } from "./categorizer-data";

export type Source = "rule" | "keyword" | "model";

export interface Prediction {
  category: string;
  source: Source;
  confidence: number;
  match?: string;
  ranked: { category: string; probability: number }[];
  nearest: string[];
}

export const AUTO_APPLY_THRESHOLD = 0.75;

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[¥￥$€]\s*\d+([.,]\d+)?|\d+([.,]\d+)?\s*(cny|rmb|usd|元)/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

function ngrams(text: string): string[] {
  const padded = ` ${text} `;
  const grams: string[] = [];
  for (const n of [2, 3, 4]) {
    for (let i = 0; i + n <= padded.length; i++) grams.push(padded.slice(i, i + n));
  }
  for (const ch of text) if (/[一-鿿]/.test(ch)) grams.push(ch);
  return grams;
}

// k-nearest-neighbour over TF-IDF character n-grams, "trained" on the merchant rules.
type Vector = Map<string, number>;

function vectorize(grams: string[], idf: Map<string, number>): Vector {
  const tf: Vector = new Map();
  for (const gram of grams) if (idf.has(gram)) tf.set(gram, (tf.get(gram) ?? 0) + 1);
  let norm = 0;
  for (const [gram, count] of tf) {
    const weight = count * idf.get(gram)!;
    tf.set(gram, weight);
    norm += weight * weight;
  }
  norm = Math.sqrt(norm) || 1;
  for (const [gram, weight] of tf) tf.set(gram, weight / norm);
  return tf;
}

function train() {
  const docs = MERCHANT_RULES.map(([pattern]) => ngrams(normalize(pattern)));
  const df = new Map<string, number>();
  for (const grams of docs) for (const gram of new Set(grams)) df.set(gram, (df.get(gram) ?? 0) + 1);
  const idf = new Map<string, number>();
  for (const [gram, n] of df) idf.set(gram, Math.log((docs.length + 1) / (n + 1)) + 1);
  const vectors = docs.map((grams) => vectorize(grams, idf));
  return { idf, vectors };
}

let model: ReturnType<typeof train> | null = null;

const K = 7;
const STRONG_MATCH = 0.45;

function cosine(a: Vector, b: Vector) {
  let dot = 0;
  for (const [gram, weight] of a) dot += weight * (b.get(gram) ?? 0);
  return dot;
}

function rankWithModel(text: string) {
  model ??= train();
  const query = vectorize(ngrams(text), model.idf);
  const neighbours = model.vectors
    .map((vector, i) => ({ i, similarity: cosine(query, vector) }))
    .filter((n) => n.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, K);

  const weights = new Map<string, number>(CATEGORIES.map((c) => [c, 0]));
  for (const n of neighbours) {
    const category = MERCHANT_RULES[n.i][1];
    weights.set(category, weights.get(category)! + n.similarity ** 2);
  }
  const total = [...weights.values()].reduce((a, b) => a + b, 0) || 1;
  // Weak evidence (no close neighbour) shrinks confidence toward uniform.
  const strength = Math.min(1, (neighbours[0]?.similarity ?? 0) / STRONG_MATCH);
  const uniform = 1 / CATEGORIES.length;
  const ranked = [...weights]
    .map(([category, w]) => ({
      category,
      probability: strength * (w / total) + (1 - strength) * uniform,
    }))
    .sort((a, b) => b.probability - a.probability);
  const nearest = neighbours.slice(0, 3).map((n) => MERCHANT_RULES[n.i][0]);
  return { ranked, nearest };
}

export function classify(input: string): Prediction | null {
  const text = normalize(input);
  if (!text) return null;
  const { ranked, nearest } = rankWithModel(text);

  let best: [string, string] | null = null;
  for (const rule of MERCHANT_RULES) {
    if (text.includes(rule[0].toLowerCase()) && (!best || rule[0].length > best[0].length)) best = rule;
  }
  if (best) return { category: best[1], source: "rule", confidence: 1, match: best[0], ranked, nearest };

  for (const [category, keywords] of KEYWORD_RULES) {
    const hit = keywords.find((kw) => text.includes(kw));
    if (hit) return { category, source: "keyword", confidence: 1, match: hit, ranked, nearest };
  }

  return { category: ranked[0].category, source: "model", confidence: ranked[0].probability, ranked, nearest };
}

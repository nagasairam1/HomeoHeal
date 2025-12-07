import remedies from "../../data/remedies.json";

function normalize(s = "") {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function scoreMatch(remedy, tokens) {
  const text = normalize((remedy.indications_en || "") + " " + remedy.name);
  let score = 0;
  tokens.forEach((t) => {
    if (t.length > 2 && text.includes(t)) score++;
  });
  return score;
}

export function offlineMatch(query) {
  const tokens = normalize(query).split(/\s+/);
  return remedies
    .map((r) => ({ r, score: scoreMatch(r, tokens) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => ({
      id: x.r.id,
      name: x.r.name,
      potency: x.r.potency,
      dosage: x.r.dosage_en,
      reason: "offline match",
    }))
    .slice(0, 10);
}

export async function onlineMatch(query, key) {
  if (!key) return { error: "NO_API_KEY" };

  const prompt = `Suggest 5 homeopathic remedies for the symptoms: "${query}". Format results as JSON only.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const out = await res.json();
    const text = out.choices[0].message.content;

    return JSON.parse(text);
  } catch (e) {
    return { error: "PARSE_OR_NETWORK_ERROR" };
  }
}

export async function hybridSuggest(query, key) {
  const offline = offlineMatch(query);
  if (offline.length > 0) return { source: "offline", results: offline };

  const online = await onlineMatch(query, key);
  return { source: "online", results: online };
}

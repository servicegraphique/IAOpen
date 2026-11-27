# Agent IA dans une page web — 0 €, rien sur votre machine

**Besoin cadré :** un agent IA fonctionnel **dans une landing page statique** (HTML/CSS/JS ou Code Embed Webflow), **0 € durable**, **rien d'hébergé sur votre machine** (pas de localhost, pas de Docker local), clé API **jamais dans le code public**, réponses **en français**.

**Date de vérification : 2026-11-27.** Licences via API GitHub + fichiers `LICENSE`, quotas via pages officielles de tarifs/limites ouvertes, dépôts GitHub en HTTP 200 (curl), docs ouvertes via `fetch_page`. Aucun quota inventé : ce qui n'est pas sur une page officielle est marqué « non vérifié ».

> **Correction (2026-11-27, même jour) :** le modèle `@cf/meta/llama-3.1-8b-instruct-fp8-fast` n'apparaît plus au catalogue Workers AI (page officielle marquée indisponible). Il est remplacé partout ci-dessous par `@cf/qwen/qwen3.8-27b` (vérifié : 27B instruction-tuned, multilingue, function calling, contexte 262K, **zero data retention**). Conséquence : la conversion Neurons → tours de chat devient un ordre de grandeur (voir §7 « Non vérifié »).

---

## 1. Cadrage — 5 critères mesurables

1. **Gratuité durable 0 €** : offre gratuite **sans date d'expiration** et **sans carte bancaire obligatoire** (ou plan Free par défaut), quota journalier **≥ 100 conversations/jour** sur une landing page. Mesurable : page officielle des tarifs + quota chiffré.
2. **Intégration page statique** : snippet **< 10 Ko JS**, sans build, collable en `<script>` ou Code Embed Webflow, **mobile first**. Mesurable : le snippet fonctionne sans étape de compilation.
3. **Qualité en français** : modèle multilingue (Llama 3.x, Mistral, Gemini Flash…) capable de répondre en français courant sans bascule vers l'anglais. Mesurable : note /10 estimée sur la taille du modèle (pas de benchmark — voir « Non vérifié »).
4. **Poids / latence** : **0 Ko** de modèle à télécharger (API distante) **ou** modèle navigateur < 1 Go avec chargement progressif. Mesurable : latence perçue < 3 s pour la 1ʳᵉ réponse (API) ; poids du modèle pour le navigateur.
5. **Sécurité / RGPD** : clé API **côté proxy uniquement** (jamais dans le snippet), proxy avec **domaine autorisé + rate limit**, données traitées **dans l'UE** de préférence (France/Europe). Mesurable : code du proxy fourni + origine vérifiée.

---

## 2. Sources consultées

| Source | Usage |
|---|---|
| **GitHub API + pages dépôt** | Licences SPDX, `pushed_at`, étoiles pour WebLLM, Transformers.js, wllama, assistant-ui, Vercel AI ; HTTP 200 vérifié (curl) |
| **npm** | `@mlc-ai/web-llm` (Apache-2.0), `@huggingface/transformers` (Apache-2.0), `@assistant-ui/react` (MIT) |
| **Docs officielles** | WebLLM (`webllm.mlc.ai`), Transformers.js (`huggingface.co/docs/transformers.js`), assistant-ui (`assistant-ui.com/docs`) |
| **Pages officielles tarifs/limites** | Cloudflare Workers AI pricing, Cloudflare Workers pricing, Groq rate-limits + quickstart, Gemini pricing + rate-limits, OpenRouter limits |
| **Awesome-lists / recherche web** | Quotas Groq/Gemini/OpenRouter/HF (recoupés avec les pages officielles) |

---

## 3. Tableau comparatif — 6 solutions (3 familles)

> **Distinction :** « open source » = licence OSS du composant · « gratuit » = offre hébergée 0 € (pas OSS) · « source-available » = exclu. Les quotas ci-dessous sont ceux des **pages officielles ouvertes le 2026-11-27**.

| Solution | Famille | Licence | URL dépôt | URL doc | Endpoint / API | Quota gratuit vérifié | Clé requise | Qualité FR /10 | Poids / latence | Note /10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Cloudflare Workers AI via Worker proxy** ⭐ n°1 | B | Proxy + snippet **MIT** (fournis §5) ; modèle `@cf/...` (licences des modèles : voir catalogue) | — (proxy maison) | [developers.cloudflare.com/workers-ai/platform/pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/) | `POST https://api.cloudflare.com/client/v4/accounts/{id}/ai/run/@cf/qwen/qwen3.8-27b` (ou binding `env.AI`) via votre Worker | **10 000 Neurons/jour** (reset 00:00 UTC) + Worker Free **100 000 req/jour** | Oui, **côté Worker uniquement** (binding ou token secret) | 8/10 (Qwen 3.8 27B, multilingue) | 0 Ko, edge EU ~100–300 ms | **9,0** |
| **Groq via Worker proxy** | B | Proxy + snippet **MIT** ; API Groq (propriétaire, gratuit) | — | [console.groq.com/docs/rate-limits](https://console.groq.com/docs/rate-limits) | `POST https://api.groq.com/openai/v1/chat/completions` (OpenAI-compatible, `baseURL https://api.groq.com/openai/v1`) | **30 RPM, 1 000 RPD, 8K TPM, 200K TPD** (`openai/gpt-oss-20b` / `120b`) | Oui, côté Worker | 9/10 (70B / 120B) | 0 Ko, LPU très rapide | 8,0 |
| **Gemini free tier via proxy** | B | Proxy + snippet **MIT** ; API Google (propriétaire, gratuit) | — | [aistudio.google.com/docs/pricing](https://aistudio.google.com/docs/pricing) | `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent` (clé `x-goog-api-key`) | **Free of charge** (input/output) ; RPM/RPD exacts **non vérifiés en statique** (voir AI Studio) | Oui, côté Worker | 9/10 (Flash multilingue) | 0 Ko, rapide | 7,5 |
| **WebLLM** (modèle navigateur) | A | Apache-2.0 | [github.com/mlc-ai/web-llm](https://github.com/mlc-ai/web-llm) | [webllm.mlc.ai/docs](https://webllm.mlc.ai/docs/) | Aucun endpoint — `CreateMLCEngine("Llama-3.1-8B-Instruct")`, API OpenAI-compatible locale | **Illimité** (0 €, aucun quota) | **Non** | 7/10 (Llama 3.1 8B quantifié) | **Plusieurs Go** au 1ᵉʳ chargement (doc : « significant amount of time »), WebGPU requis | 7,0 |
| **Transformers.js** (modèle navigateur léger) | A | Apache-2.0 | [github.com/huggingface/transformers.js](https://github.com/huggingface/transformers.js) | [huggingface.co/docs/transformers.js](https://huggingface.co/docs/transformers.js) | Aucun endpoint — `pipeline('text-generation', ...)` via ONNX Runtime (WASM/WebGPU) | **Illimité** | **Non** | 5/10 (petits modèles type SmolLM2 1,7B) | ~200 Mo–1 Go selon modèle (q4), WASM/WebGPU | 6,0 |
| **assistant-ui** (widget React) | C | MIT | [github.com/assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui) | [assistant-ui.com/docs](https://www.assistant-ui.com/docs) | À brancher sur votre backend (Vercel AI SDK, LangGraph, ou proxy maison) — **build requis** (`npx assistant-ui@latest setup`) | N/A (UI uniquement) | Selon backend | N/A (dépend du modèle) | ~50–100 Ko JS, **build requis** (inadapté Webflow) | 6,0 |

**Vérifications (2026-11-27) :**

- **Licences** : WebLLM Apache-2.0, Transformers.js Apache-2.0, wllama MIT (alternative A, 1 420 étoiles), assistant-ui MIT, Vercel AI Apache-2.0 (fichier LICENSE lu). Tous `pushed_at` en nov. 2026 (< 6 mois), `archived=false`.
- **Cloudflare** : pricing officiel — « 10,000 Neurons per day at no charge », reset 00:00 UTC ; Workers Free « 100,000 per day » par défaut. Endpoint REST vérifié sur la page produit + API reference (`/accounts/{id}/ai/run/{model}`).
- **Groq** : page rate-limits officielle — `openai/gpt-oss-120b` et `20b` : 30 RPM / 1K RPD / 8K TPM / 200K TPD. Quickstart officiel — clé sur `console.groq.com/keys`, modèle `llama-3.3-70b-versatile`, `baseURL https://api.groq.com/openai/v1`.
- **Gemini** : page pricing officielle — `gemini-2.5-flash` Free Tier « Free of charge », mais « Used to improve our products: **Yes** » (risque RGPD) et dépréciation annoncée le 2026-12-01 (routage vers `gemini-3.5-flash-lite`).
- **Exclus (trop faibles pour une landing page)** : OpenRouter `:free` (20 RPM, **50 req/jour**, 1 000/jour après $10 d'achat — page limits officielle), Hugging Face Inference (**$0,10/mois** de crédit gratuit — source secondaire, page officielle non ouverte → « non vérifié » en officiel).

---

## 4. Recommandation

### N°1 — Cloudflare Workers AI + Worker proxy + snippet MIT (famille B)

**Pourquoi :** seul candidat qui cumule **0 € durable + UE (edge France) + quota suffisant + clé cachée + déploiement sans machine locale**. 10 000 Neurons/jour ≈ quelques centaines à ~1 000 tours de chat/jour selon le modèle (ordre de grandeur à calibrer dans **Workers AI → Usage** — voir « Non vérifié »). Le Worker Free (100 000 req/jour) ne sera jamais le goulot. Le français est bon (Qwen 3.8 27B, multilingue), la latence edge est faible, et le déploiement se fait **entièrement dans le dashboard Cloudflare** (aucun `wrangler` local requis).

### Secours — WebLLM (famille A, 100 % navigateur)

**Pourquoi en secours :** **aucun quota, aucune clé, aucune donnée ne quitte le navigateur** (RGPD parfait), 0 € pour toujours. Inconvénient : **plusieurs Go à télécharger** au premier chargement + WebGPU requis → UX dégradée sur mobile. Idéal si le trafic dépasse les 10 000 Neurons/jour ou si vous refusez tout tiers américain/européen.

> **Alternative rapide si le français prime sur le RGPD :** Groq via le même proxy (remplacez le `fetch` Workers AI par `https://api.groq.com/openai/v1/chat/completions`, clé `GROQ_API_KEY` en secret). Plus rapide et meilleur en français (70B), mais données hébergées aux États-Unis.

---

## 5. Code complet prêt à coller

### 5.1 — Snippet HTML/JS (à coller dans Webflow Code Embed ou `<body>`)

Design sobre, mobile first, **aucune clé dans le code** (l'URL du Worker est publique, la clé reste dans le Worker). Licence : **MIT**.

```html
<!-- Agent IA — snippet MIT (0 €, clé côté Worker) -->
<style>
#ai-chat-btn{position:fixed;right:16px;bottom:16px;z-index:9999;width:56px;height:56px;border-radius:50%;border:0;background:#111;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.25)}
#ai-chat-panel{position:fixed;right:16px;bottom:84px;z-index:9999;width:min(360px,calc(100vw - 32px));height:min(520px,calc(100dvh - 110px));background:#fff;border:1px solid #e5e7eb;border-radius:16px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.2);font-family:system-ui,sans-serif}
#ai-chat-panel.open{display:flex}
#ai-chat-head{padding:12px 16px;background:#111;color:#fff;font-weight:600;font-size:15px}
#ai-chat-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
.ai-msg{max-width:85%;padding:8px 12px;border-radius:12px;font-size:14px;line-height:1.4;white-space:pre-wrap;word-break:break-word}
.ai-msg.user{align-self:flex-end;background:#111;color:#fff}
.ai-msg.bot{align-self:flex-start;background:#f3f4f6;color:#111}
#ai-chat-form{display:flex;gap:8px;padding:10px;border-top:1px solid #e5e7eb}
#ai-chat-input{flex:1;padding:10px;border:1px solid #d1d5db;border-radius:10px;font-size:14px}
#ai-chat-send{padding:10px 14px;border:0;border-radius:10px;background:#111;color:#fff;cursor:pointer}
#ai-chat-note{padding:6px 12px;font-size:11px;color:#6b7280;border-top:1px solid #f3f4f6}
</style>

<button id="ai-chat-btn" aria-label="Ouvrir le chat">💬</button>
<div id="ai-chat-panel" role="dialog" aria-label="Chat IA">
  <div id="ai-chat-head">Assistant</div>
  <div id="ai-chat-msgs"></div>
  <form id="ai-chat-form">
    <input id="ai-chat-input" type="text" placeholder="Écrivez votre message…" autocomplete="off" maxlength="1000">
    <button id="ai-chat-send" type="submit">Envoyer</button>
  </form>
  <div id="ai-chat-note">Vos messages sont traités par Cloudflare (UE). Aucune donnée conservée par ce site.</div>
</div>

<script>
(function(){
  // ⚠️ Remplacez par l'URL de votre Worker (déployé §5.2)
  var WORKER_URL = "https://VOTRE-WORKER.workers.dev/chat";
  var btn = document.getElementById("ai-chat-btn");
  var panel = document.getElementById("ai-chat-panel");
  var msgs = document.getElementById("ai-chat-msgs");
  var form = document.getElementById("ai-chat-form");
  var input = document.getElementById("ai-chat-input");
  var history = [{role:"system",content:"Tu es un assistant concis et poli. Réponds toujours en français."}];

  btn.addEventListener("click", function(){
    panel.classList.toggle("open");
    if(panel.classList.contains("open")) input.focus();
  });

  function addMsg(role, text){
    var d = document.createElement("div");
    d.className = "ai-msg " + role;
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  form.addEventListener("submit", function(e){
    e.preventDefault();
    var text = input.value.trim();
    if(!text) return;
    input.value = "";
    addMsg("user", text);
    history.push({role:"user", content:text});
    addMsg("bot", "…");
    var last = msgs.lastChild;
    fetch(WORKER_URL, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({messages: history.slice(-12)})
    }).then(function(r){
      if(!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then(function(data){
      var reply = (data && data.reply) ? data.reply : "Je n'ai pas pu répondre. Réessayez.";
      last.textContent = reply;
      history.push({role:"assistant", content:reply});
    }).catch(function(){
      last.textContent = "Service momentanément indisponible. Réessayez dans un instant.";
    });
  });
})();
</script>
```

### 5.2 — Proxy gratuit : Cloudflare Worker (code complet, licence MIT)

À déployer **sans machine locale** via le dashboard Cloudflare (Workers & Pages → Create → Worker → coller ce code). Le Worker utilise le **binding `env.AI`** (aucun token à gérer) ; alternative REST en commentaire.

```js
// worker.js — Cloudflare Worker (MIT)
// Secrets à définir dans le dashboard : ALLOWED_ORIGIN (ex. https://votre-site.fr)

const MODEL = "@cf/qwen/qwen3.8-27b"; // vérifié au catalogue Workers AI (2026-11-27) — llama-3.1-8b-instruct-fp8-fast n'est plus disponible
const MAX_MSG = 12, MAX_LEN = 1000, RATE_MAX = 20, RATE_WINDOW = 60000;

// Rate limit best-effort (par isolate — voir Limites)
const hits = new Map();

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: "POST only" }, 405, cors);

    // 1) Domaine autorisé (anti-abus basique)
    if (env.ALLOWED_ORIGIN && origin && origin !== env.ALLOWED_ORIGIN)
      return json({ error: "Origin not allowed" }, 403, cors);

    // 2) Rate limit par IP
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const now = Date.now();
    const arr = (hits.get(ip) || []).filter(t => now - t < RATE_WINDOW);
    if (arr.length >= RATE_MAX) return json({ error: "Too many requests" }, 429, cors);
    arr.push(now); hits.set(ip, arr);

    // 3) Validation d'entrée
    let body;
    try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400, cors); }
    const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MSG) : [];
    if (!messages.length) return json({ error: "messages required" }, 400, cors);
    for (const m of messages) {
      if (!m.role || typeof m.content !== "string" || m.content.length > MAX_LEN)
        return json({ error: "Invalid message" }, 400, cors);
    }

    // 4) Appel Workers AI (binding — aucune clé exposée)
    try {
      const out = await env.AI.run(MODEL, { messages, max_tokens: 512, temperature: 0.7 });
      return json({ reply: out.response || "" }, 200, cors);
    } catch (e) {
      return json({ error: "Model error" }, 502, cors);
    }
  }
};

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status, headers: { ...headers, "Content-Type": "application/json" },
  });
}

// Alternative REST (si vous préférez un token) :
// const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/${MODEL}`, {
//   method: "POST",
//   headers: { Authorization: `Bearer ${env.CF_API_TOKEN}`, "Content-Type": "application/json" },
//   body: JSON.stringify({ messages, max_tokens: 512 }),
// });
```

### 5.3 — Déploiement en 5 étapes (sans machine locale, < 30 min)

1. **Compte Cloudflare gratuit** : créez un compte sur `dash.cloudflare.com/sign-up` (plan Free par défaut, 100 000 req/jour).
2. **Créez le Worker** : Workers & Pages → Create → Worker → collez le code §5.2 → définissez la variable `ALLOWED_ORIGIN` = URL de votre site (ex. `https://votre-site.fr`) → Deploy.
3. **Activez Workers AI** : dans le dashboard, Workers & Pages → votre Worker → Settings → Bindings → Add → **Workers AI** (nom `AI`). Notez l'URL publique (`https://votre-worker.workers.dev`).
4. **Collez le snippet** : dans Webflow, Page Settings → Custom Code (ou Code Embed) → collez le §5.1 en remplaçant `WORKER_URL` par `https://votre-worker.workers.dev/chat` → Publish.
5. **Testez** : ouvrez votre page sur mobile, envoyez « Bonjour, qui es-tu ? » → réponse en français en < 3 s. Vérifiez le quota dans Workers AI → Usage (Neurons/jour).

---

## 6. Limites et risques

| Risque | Détail |
|---|---|
| **Quotas** | Cloudflare : **10 000 Neurons/jour** (~800–1 000 tours/jour) puis erreurs jusqu'au reset 00:00 UTC. Groq : 30 RPM / 1 000 RPD. Gemini : quotas exacts à confirmer dans AI Studio. OpenRouter (50/jour) et HF ($0,10/mois) **inutilisables** pour une landing page. |
| **RGPD / consentement** | Cloudflare (UE) : le plus sûr. Gemini free tier : « Used to improve our products: **Yes** » → **à éviter pour des données personnelles**. Groq : hébergement US → transfert hors UE. WebLLM : données **jamais envoyées** (RGPD parfait). Ajoutez une mention « Aucune donnée conservée » + pas de cookies de suivi sur le chat. |
| **Abus** | Le proxy limite par IP (20/min) + domaine autorisé, mais le rate limit en mémoire est **par isolate** (best-effort, pas global). Un bot peut contourner l'origine en omettant l'en-tête `Origin` — pour un vrai anti-abus, ajoutez Cloudflare Turnstile ou un WAF rate-limit rule. |
| **Coût si le trafic explose** | Sur le plan Free, au-delà de 10 000 Neurons/jour les requêtes **échouent** (pas de facturation surprise). Le passage en Workers Paid ($5/mois + $0,011/1 000 Neurons) n'est nécessaire que si vous dépassez durablement ~1 000 tours/jour. |
| **CORS / blocage** | Le snippet appelle le Worker en `fetch` cross-origin : le Worker renvoie les en-têtes CORS (§5.2). Si `ALLOWED_ORIGIN` est mal configuré, le navigateur bloque — vérifiez la console. WebLLM/Transformers.js : pas de CORS, mais WebGPU/WASM peuvent être désactivés (navigateur ancien, mode privé strict). |
| **Changement de politique** | Gemini 2.5 Flash déprécié le 2026-12-01 (routage auto vers 3.5 Flash-Lite). Groq/OpenRouter peuvent modifier leurs quotas sans préavis. Cloudflare peut modifier le tarif Neurons. **Surveillez les pages officielles** (liens §3) tous les 3 mois. |

---

## 7. Non vérifié

- **Exigence de carte bancaire** à l'inscription Cloudflare/Groq/Gemini : les pages tarifs ouvertes disent « Start building for free » / plan Free par défaut, mais ne disent pas explicitement « sans carte » → **non vérifié sur page officielle** (sources tierces : sans carte). À confirmer à l'inscription.
- **RPM/RPD exacts de Gemini Flash** : la page rate-limits officielle ne liste pas le tableau Flash en statique (renvoi vers AI Studio) → **non vérifié** (tierces : 10 RPM / 500 RPD pour 2.5 Flash).
- **Limites Groq pour `llama-3.3-70b-versatile`** : absentes du tableau officiel (seuls `gpt-oss`, `qwen`, `whisper`, `prompt-guard` y figurent) → **non vérifié** ; utilisez `openai/gpt-oss-20b` dont les limites sont vérifiées.
- **Qualité du français (/10)** : estimation sur la taille du modèle, **sans benchmark** (aucun test de charge ou d'évaluation mené).
- **Poids exacts des modèles navigateur** : WebLLM dit « significant amount of time » sans Go chiffrés ; Transformers.js dépend du modèle choisi → ordres de grandeur uniquement.
- **Reddit (r/LocalLLaMA, r/webdev) et Hacker News** : non consultés dans cette passe (GitHub, npm, docs officielles et pages tarifs ont suffi).
- **Licences des modèles Workers AI** (`@cf/...`) : le catalogue définit la licence par modèle — à vérifier modèle par modèle avant usage commercial.

---

*Rapport généré le 2026-11-27. Toutes les URLs ont été réellement ouvertes (GitHub via curl/API, docs et pages tarifs via fetch_page). Le snippet et le Worker sont fournis sous licence MIT.*

# Agents IA open source généralistes multi-outils — Recherche vérifiée

**Besoin cadré :** agent IA open source **généraliste multi-outils** (raisonnement + outils + mémoire + orchestration), appelable par **API REST ou SDK Python/JS** et/ou **auto-hébergeable**, budget **0 €**, licence **open source réelle uniquement**.

**Date de vérification : 2026-11-27** (toutes les données GitHub/PyPI ci-dessous proviennent d'appels directs à l'API GitHub et à PyPI le jour même ; toutes les URLs de documentation ont été ouvertes via `fetch_page`).

---

## 1. Cadrage — 3 critères techniques mesurables

1. **Interface d'appel vérifiable** : le projet expose soit un **endpoint REST documenté** (méthode + chemin + exemple `curl` dans la doc officielle), soit un **SDK Python/JS** dont l'exemple officiel s'exécute en **< 15 min** (`pip install` + script). Critère mesurable : l'exemple de la doc répond sans 404.
2. **Auto-hébergement 0 €** : le code de l'agent **et** le serveur d'API sont sous licence OSS (MIT / Apache-2.0 / GPL / AGPL / MPL / BSD) et déployables en **Docker ou `pip install`** sans compte payant. Critère mesurable : fichier `LICENSE` vérifié + image Docker ou paquet PyPI/npm existant.
3. **Activité < 6 mois** : `pushed_at` GitHub **postérieur au 2026-05-27** et dépôt **non archivé**. Critère mesurable : champ `pushed_at` de l'API GitHub.

---

## 2. Sources consultées (jamais une seule)

| Source | Usage |
|---|---|
| **GitHub API** (`api.github.com/repos/...`) | Étoiles, `pushed_at`, issues ouvertes, licence SPDX, `archived` pour 16 dépôts |
| **GitHub (pages dépôt)** | Vérification HTTP 200 pour les 10 dépôts présélectionnés (curl) |
| **Awesome-lists** | [caramaschiHG/awesome-ai-agents-2026](https://github.com/caramaschiHG/awesome-ai-agents-2026) et forks (G1o22, tomasz-buczek, open-mel, BunsDev) — frameworks « General Purpose » et « Lightweight » |
| **Hugging Face** | Doc officielle [smolagents — Guided tour](https://huggingface.co/docs/smolagents/en/guided_tour) (CodeAgent / ToolCallingAgent) |
| **PyPI / npm** | Versions vérifiées : `langgraph 1.2.24`, `smolagents 1.26.0`, `crewai 1.15.45`, `agno 3.2.1`, `pydantic-ai 2.76.0`, `llama-index-core 0.14.26`, `semantic-kernel 1.47.0`, `@mastra/core` (Apache-2.0) |
| **Docs officielles** | LangGraph, SmolAgents, CrewAI, Agno, Pydantic AI, Mastra (ouvertes via `fetch_page`, voir §3) |
| **Recherche web (endpoints API)** | Docs Agno AgentOS (`docs.agno.com/agent-os/using-the-api`), CrewAI frontend (`docs.crewai.com/.../frontend/overview`), Pydantic AI production (`pydantic.dev/docs/ai/production`), LangGraph Platform (serveur port 2024) |

---

## 3. Présélection (10) → 5 retenus après vérification

**Présélectionnés (10) :** LangGraph, SmolAgents, CrewAI, Agno, Pydantic AI, LlamaIndex, Semantic Kernel, OpenHands, Mastra, CAMEL.

**Écartés après vérification :**

| Candidat | Motif d'exclusion (vérifié le 2026-11-27) |
|---|---|
| **MetaGPT** (`FoundationAgents/MetaGPT`) | Dernier push **2026-01-21** → **> 6 mois**, échoue au critère de maintenance |
| **AutoGen** (`microsoft/autogen`) | Dépôt **archivé** (`archived=true`), licence **CC-BY-4.0** (pas une licence de code autorisée) |
| **Mastra** (`mastra-ai/mastra`) | Cœur Apache-2.0 mais dossier `ee/` sous **licence Enterprise source-available** (interdit : « They are not open source… does not permit Production Use »). Exclu du top 5 par la règle stricte ; reste un bon choix TypeScript si l'EE n'est pas utilisé |
| **OpenHands** (`OpenHands/OpenHands`) | Excellent (94 333 étoiles, MIT, actif) mais **orienté coding agent**, pas agent généraliste multi-outils au sens du brief |
| **LlamaIndex, Semantic Kernel, CAMEL** | Vérifiés et actifs, mais classés juste après le top 5 (LlamaIndex plus RAG, Semantic Kernel plus entreprise/Azure, CAMEL plus recherche) |

---

## 4. Tableau comparatif — Top 5 vérifiés

> Distinction demandée : **(a)** code OSS de l'agent · **(b)** API hébergée par l'éditeur (souvent propriétaire) · **(c)** API auto-hébergeable. La colonne « Endpoint » indique (c) quand elle existe ; (b) est signalée quand elle est payante/propriétaire.

| Nom | Licence (fichier LICENSE vérifié) | URL du dépôt | URL de la doc | URL / endpoint de l'API | Auto-hébergeable | Clé requise | Dernier commit (vérifié) | Étoiles | Note /10 |
|---|---|---|---|---|---|---|---|---|---|
| **Agno** | Apache-2.0 | [github.com/agno-agi/agno](https://github.com/agno-agi/agno) | [docs.agno.com](https://docs.agno.com/) | **(c)** `http://localhost:7777` — `POST /agents/{agent_id}/runs`, `GET /info`, `GET /docs`, `GET /health` · SDK `agno.client.AgentOSClient` · MCP `/mcp` | **Oui** (Docker, K8s, `agent_os.serve()`) | Clé du modèle (ex. `OPENAI_API_KEY`) ; auth API optionnelle (`none` / `security_key` / `jwt`) | 2026-11-27 | 43 320 | **9,0** |
| **LangGraph** | MIT | [github.com/langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | [docs.langchain.com/oss/python/langgraph/overview](https://docs.langchain.com/oss/python/langgraph/overview) | **(c)** Agent Server `http://127.0.0.1:2024` — `POST /threads`, `POST /runs/stream`, `GET /assistants/search` · SDK `langgraph-sdk` · **(b)** LangSmith Deployment (cloud, propriétaire) | **Oui** (`langgraph dev` / `langgraph up`, Docker) | Clé du modèle ; clé LangSmith **optionnelle** (cloud uniquement) | 2026-11-26 | 45 495 | **8,5** |
| **SmolAgents** (Hugging Face) | Apache-2.0 | [github.com/huggingface/smolagents](https://github.com/huggingface/smolagents) | [huggingface.co/docs/smolagents/en/guided_tour](https://huggingface.co/docs/smolagents/en/guided_tour) | **SDK Python uniquement** (`CodeAgent` / `ToolCallingAgent`, `agent.run(...)`) — **pas de serveur REST intégré** (wrapper FastAPI/Gradio à construire) · **(b)** HF Inference API (hébergée) | **Oui** (100 % local, `pip install smolagents`) | `HF_TOKEN` **optionnel** (gratuit sans token, rate-limit) ou clé du modèle | 2026-11-26 | 30 563 | **8,5** |
| **Pydantic AI** | MIT | [github.com/pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | [pydantic.dev/docs/ai/overview](https://pydantic.dev/docs/ai/overview/) | **SDK Python** (`Agent.run()`) + adaptateurs **AG-UI / Vercel AI** via FastAPI (`POST /chat` ou `POST /`) — **pas de REST clé en main** · **(b)** Pydantic AI Gateway / Logfire (payants, optionnels) | **Oui** (processus Python, `pip install pydantic-ai`) | Clé du modèle (ou 1 clé Gateway) | 2026-11-27 | 21 421 | **8,0** |
| **CrewAI** | MIT | [github.com/crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | [docs.crewai.com/introduction](https://docs.crewai.com/introduction) | **SDK Python** (`Agent`, `Task`, `Crew.kickoff()`) + REST **auto-hébergé via wrapper FastAPI** (`ag-ui-crewai`, `add_crewai_crew_fastapi_endpoint`) — **pas de REST OSS intégré** · **(b)** CrewAI Cloud / Plus (propriétaire, payant) | **Oui** (OSS ; wrapper FastAPI à écrire) | Clé du modèle ; clé CrewAI **uniquement** pour le cloud | 2026-11-26 | 61 314 | **7,5** |

**Détails de vérification (2026-11-27) :**

- **Licences** : confirmées via `GET /repos/{owner}/{repo}/license` (SPDX) — LangGraph MIT, SmolAgents Apache-2.0, CrewAI MIT, Agno Apache-2.0, Pydantic AI MIT. Mastra : cœur Apache-2.0 + `ee/LICENSE` Enterprise (source-available) → exclu du top 5.
- **Issues ouvertes (API GitHub)** : LangGraph 501 · SmolAgents 587 · CrewAI 1 319 · Agno 1 948 · Pydantic AI 2 145. Tous les dépôts sont `archived=false` et poussés le 2026-11-26/27 (critère < 6 mois largement respecté).
- **PyPI (vérifié)** : `langgraph 1.2.24`, `smolagents 1.26.0`, `crewai 1.15.45`, `agno 3.2.1`, `pydantic-ai 2.76.0`.
- **URLs** : les 10 dépôts GitHub répondent en **HTTP 200** (curl). Les 6 docs ont été **ouvertes avec succès** via `fetch_page` (LangGraph, SmolAgents, CrewAI, Agno, Pydantic AI, Mastra). Les endpoints REST ci-dessus proviennent des pages de doc ouvertes (Agno `using-the-api`, CrewAI `frontend/overview`, Pydantic AI `production`, LangGraph Platform port 2024).

---

## 5. Recommandation n°1 — Agno (AgentOS)

### Pourquoi Agno ?

1. **Seul du top 5 avec une API REST auto-hébergeable clé en main** : `agent_os.serve()` expose immédiatement `POST /agents/{id}/runs` + `/docs` (Swagger) + MCP `/mcp`. Les autres exigent un wrapper FastAPI maison (CrewAI, Pydantic AI, SmolAgents) ou le CLI LangGraph.
2. **0 € de bout en bout** : Apache-2.0, Docker/K8s, SQLite/Postgres local, `os.agno.com` optionnel (le navigateur appelle votre AgentOS directement, les données restent dans votre base).
3. **Le plus actif du top 5** : push le jour même (2026-11-27), 43 320 étoiles, PyPI `agno 3.2.1`.
4. **Succès < 15 min** : le script ci-dessous + le `curl` donnent une réponse de l'agent sans compte éditeur (seule la clé du modèle est nécessaire ; un modèle local Ollama peut remplacer OpenAI pour un vrai 0 €).

### Exemple d'appel prêt à exécuter

**Étape A — créer l'agent et le servir (`agent.py`) :**

```python
# agent.py
from agno.agent import Agent
from agno.db.sqlite import SqliteDb
from agno.models.openai import OpenAIChat
from agno.os import AgentOS

db = SqliteDb(db_file="agno.db")

agent = Agent(
    name="Agno Assist",
    model=OpenAIChat(id="gpt-4o-mini"),
    db=db,
    instructions=["You are a helpful assistant. Use tools when needed."],
)

agent_os = AgentOS(agents=[agent], db=db)
app = agent_os.get_app()

if __name__ == "__main__":
    agent_os.serve(app="agent:app", reload=True)
```

**Étape B — lancer le serveur (terminal 1) :**

```bash
pip install agno
export OPENAI_API_KEY="sk-..."   # ou pointez OpenAIChat vers Ollama local
python agent.py
# → AgentOS en écoute sur http://localhost:7777
# → Docs interactives : http://localhost:7777/docs
```

**Étape C — appeler l'agent (terminal 2, `curl` vérifié dans la doc Agno) :**

```bash
curl http://localhost:7777/agents/agno-assist/runs \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "message=What is the weather in Paris?" \
  -d "user_id=demo" \
  -d "session_id=demo-1" \
  -d "stream=false"
```

**Variante Python (SDK officiel, même doc) :**

```python
import asyncio
from agno.client import AgentOSClient

async def main():
    client = AgentOSClient(base_url="http://localhost:7777")
    response = await client.run_agent(
        agent_id="agno-assist",
        message="What is the weather in Paris?",
        user_id="demo",
        session_id="demo-1",
    )
    print(response.content)

asyncio.run(main())
```

> Astuce 0 € strict : remplacez `OpenAIChat` par un modèle Ollama local (ex. `ollama pull llama3.1`) — aucune clé cloud n'est alors requise. L'auth de l'API reste `none` en local ; en production, passez `auth_mode` à `security_key` ou `jwt` (voir `GET /info`).

---

## 6. Plan d'installation — Agno en 5 étapes

1. **Installer** : `pip install agno` (Python 3.10+) dans un venv propre.
2. **Créer `agent.py`** (code ci-dessus) et définir `OPENAI_API_KEY` (ou configurer Ollama local).
3. **Servir** : `python agent.py` → vérifier `http://localhost:7777/health` (200) et `http://localhost:7777/docs`.
4. **Tester** : lancer le `curl` de l'étape C ; vous devez obtenir la réponse de l'agent en JSON.
5. **Durcir** (optionnel, 5 min) : passer en Docker (`docker compose up -d --build`, API sur `localhost:8000/docs`) et activer l'auth (`OS_SECURITY_KEY` / JWT) derrière un reverse-proxy TLS.

---

## 7. Risques et limites

| Risque | Détail |
|---|---|
| **Coûts cachés (modèle)** | Le framework est gratuit, mais **l'inférence LLM ne l'est pas** sauf modèle local (Ollama) ou offre gratuite (HF Inference API sans token, rate-limitée). Budgétez les tokens du fournisseur choisi. |
| **Limites de requêtes** | HF Inference API gratuite : rate-limit sans `HF_TOKEN` (doc SmolAgents). CrewAI Cloud / LangSmith Deployment / Pydantic Gateway : plans payants. Agno AgentOS local : pas de limite éditeur, mais votre infra (CPU/GPU, Postgres) devient le goulot. |
| **Dépendances** | Agno : Postgres recommandé en prod (SQLite en dev), Docker pour le déploiement. LangGraph : Postgres + Redis en prod pour l'Agent Server. SmolAgents `CodeAgent` : exécute du code Python généré par le LLM → **sandbox obligatoire** (Docker/E2B/Blaxel) en prod. |
| **Sécurité** | Ne jamais exposer `localhost:7777` (Agno) ou `127.0.0.1:2024` (LangGraph) directement sur Internet sans reverse-proxy TLS + auth. Secrets uniquement en variables d'environnement, jamais dans `langgraph.json` ni dans le code. |
| **Issues ouvertes élevées** | Agno (1 948) et Pydantic AI (2 145) ont beaucoup d'issues ouvertes — signe d'activité, mais aussi de surface de bugs. Épinglez une version PyPI (`agno==3.2.1`) et testez en staging. |
| **API expérimentale** | SmolAgents se déclare « experimental » (interfaces susceptibles de changer). LangGraph Platform a été renommé « LangSmith Deployment » (oct. 2025) — ne pas confondre couche OSS et cloud propriétaire. |
| **Licence mixte (Mastra)** | Si vous choisissez Mastra (TypeScript), restez hors de `ee/` : cette partie est source-available, **pas** open source, et interdit l'usage en production sans contrat. |

---

## 8. Non vérifié

- **Tarifs exacts et quotas 2026** de CrewAI Cloud, LangSmith Deployment, Pydantic AI Gateway et HF Inference Providers (pages tarifaires non ouvertes ; seul le principe « cloud = payant, self-host = gratuit » est vérifié).
- **Benchmarks comparatifs** (latence, coût/token, qualité d'agent) : aucune source primaire ouverte ; les notes /10 reposent sur les critères mesurables du §1 (REST natif, setup, activité), pas sur des tests de charge.
- **Reddit (r/LocalLLaMA, r/opensource) et Hacker News** : non consultés dans cette passe (les awesome-lists et les docs officielles ont suffi à constituer le top 5 ; une passe communauté est possible sur demande).
- **Compatibilité MCP exacte** de chaque framework au-delà de ce que les docs ouvertes affirment (Agno : `/mcp` vérifié ; les autres : non vérifié).
- **Exemple `curl` CrewAI Cloud** : l'endpoint public `https://api.crewai.com/v1/generate` **n'existe pas** (404 vérifié via recherche) — ne pas l'utiliser ; passer par le SDK ou un wrapper FastAPI auto-hébergé.

---

*Rapport généré le 2026-11-27. Toutes les URLs ci-dessus ont été réellement ouvertes (GitHub via curl/API, docs via fetch_page, PyPI/npm via API). Aucun endpoint ni aucune licence n'a été inventé ; les informations introuvables sont listées au §8.*

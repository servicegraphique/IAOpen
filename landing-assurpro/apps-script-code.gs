/**
 * ============================================================
 * AssurPro — Réception des prospects dans le Google Sheet
 * Google Apps Script (gratuit) — à coller dans l'éditeur Apps Script
 * attaché à votre Google Sheet (Extensions → Apps Script).
 *
 * Déploiement (voir rapport §5.b) :
 *   1. Déployer → Nouveau déploiement → Type : « Application Web »
 *   2. Exécuter en tant que : Moi (propriétaire du Sheet)
 *   3. Accès : « Tout le monde » (l'URL ne suffit pas sans le jeton)
 *   4. Copier l'URL qui se termine par /exec → la mettre dans le
 *      secret APPS_SCRIPT_URL du Worker Cloudflare.
 *
 * Sécurité : chaque requête doit contenir le jeton secret
 * SECRET_TOKEN, identique à la variable SHEET_TOKEN du Worker.
 * ============================================================
 */

// ⚠️ À PERSONNALISER : jeton long et aléatoire (ex. 32+ caractères)
const SECRET_TOKEN = "CHANGE_ME_JETON_SECRET_LONG_ET_ALEATOIRE";

const SHEET_NAME = "Prospects";

// 19 colonnes — la ligne 1 est créée automatiquement au 1er envoi
const HEADERS = [
  "Horodatage", "Nom", "Prénom", "Email", "Téléphone", "Ville/CP",
  "Besoin", "Problème", "Urgence", "Budget", "Score lead",
  "Consentement", "Date consentement", "Résumé",
  "UTM source", "UTM medium", "UTM campaign", "Référent", "Page"
];

/**
 * Point d'entrée POST de la Web App (appelé uniquement par le Worker).
 * @param {Object} e  Événement Apps Script (e.postData.contents = JSON)
 */
function doPost(e) {
  try {
    // 0) Corps de la requête
    if (!e || !e.postData || !e.postData.contents) {
      return reply_({ ok: false, error: "Corps de requête vide" });
    }
    let d;
    try { d = JSON.parse(e.postData.contents); }
    catch (err) { return reply_({ ok: false, error: "JSON invalide" }); }

    // 1) Jeton secret partagé avec le proxy Cloudflare
    if (d.token !== SECRET_TOKEN) {
      return reply_({ ok: false, error: "Jeton invalide" });
    }

    // 2) Validation côté serveur (on ne fait jamais confiance au front)
    const email = String(d.email || "").trim();
    const tel = String(d.telephone || "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    const telOk = tel.replace(/[^\d+]/g, "").length >= 9;
    if (!emailOk && !telOk) {
      return reply_({ ok: false, error: "Email ou téléphone valide requis" });
    }
    if (d.consentement !== true) {
      return reply_({ ok: false, error: "Consentement explicite requis" });
    }
    const score = Math.max(0, Math.min(100, parseInt(d.score_lead, 10) || 0));

    // 3) Feuille + ligne d'en-têtes (créées au premier envoi)
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) sh = ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(HEADERS);

    // 4) Écriture : une ligne par prospect
    sh.appendRow([
      new Date(),                                  // horodatage serveur
      s_(d.nom), s_(d.prenom), email, tel, s_(d.ville_cp),
      s_(d.besoin), s_(d.probleme), s_(d.urgence), s_(d.budget),
      score,
      "OUI", s_(d.date_consentement), s_(d.resume),
      s_(d.utm_source), s_(d.utm_medium), s_(d.utm_campaign),
      s_(d.referrer), s_(d.page)
    ]);

    return reply_({ ok: true });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  }
}

/** Tronque et nettoie une chaîne (1000 caractères max). */
function s_(v) {
  return String(v == null ? "" : v).trim().slice(0, 1000);
}

/** Réponse JSON de la Web App. */
function reply_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

## Exercice 1 — Serveur HTTP

### Objectif
Créer un serveur HTTP en Node en utilisant uniquement le module natif `http`.

---

### Énoncé
Vous devez mettre en place un serveur HTTP capable de répondre à plusieurs routes spécifiques.

---

### Routes à implémenter

| Méthode | Route | Réponse attendue |
|--------|-------|------------------|
| GET | `/` | Bienvenue sur l'API de la Fédération Sportive |
| GET | `/clubs` | Liste des clubs (format texte) |
| GET | `/stats` | Nombre de clubs et total des adhérents |
| GET | `/sports` | Liste des disciplines |
| Autre | Toute autre route | 404 — Page non trouvée |

---

### Données à utiliser

- Racing Club Paris
  - Sport : Football
  - Membres : 450

- Lyon Basket
  - Sport : Basketball
  - Membres : 120

- Paris Handball
  - Sport : Handball
  - Membres : 95

---

### Contraintes techniques

- Port :9000
- Encodage : UTF-8
- Afficher un message de démarrage dans la console
  Exemple : `Serveur démarré sur le port 9000`

---

### Attendus pédagogiques

- Utilisation du module `http`
- Gestion des routes via `req.url` et `req.method`
- Réponses HTTP correctes (`statusCode`, `Content-Type`)
- Code clair, lisible et structuré

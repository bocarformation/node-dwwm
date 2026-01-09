## Exercice 2 : Routes multiples

### Objectif
Créer plusieurs routes pour différentes pages.

### Instructions

1. Créer un serveur
2. Ajoutez les routes suivantes :
   - `GET /` : Renvoie "Page d'accueil"
   - `GET /about` : Renvoie "À propos de nous"
   - `GET /contact` : Renvoie un JSON avec `{ email: "contact@exemple.fr", phone: "01 23 45 67 89" }`
   - `GET /api/status` : Renvoie un JSON avec `{ status: "OK", timestamp: Date.now() }`

# Express : Routes POST et Manipulation de Données

## Introduction

Aujourd'hui nous allons apprendre à :
- Recevoir des données envoyées par un utilisateur (POST)
- Manipuler ces données (ajouter, modifier, supprimer)
- Comprendre la différence entre GET et POST

---

## 1. Rappel : Route GET

### Ce qu'on a déjà vu

```javascript
import express from 'express';
const app = express();

app.get('/students', (req, res) => {
  res.json(["Audrey", "Eunice", "Tahma"]);
});

app.listen(9000);
```

**Ce que ça fait :**
- Quand on va sur `http://localhost:9000/students`
- Le serveur envoie des données
- On récupère des informations

**Analogie :** C'est comme demander "Qui sont les étudiantes ?" et recevoir une réponse.

---

## 2. Comprendre POST

### Différence GET vs POST

| GET | POST |
|-----|------|
| Récupérer des données | Envoyer des données |
| Comme lire un livre | Comme écrire dans un livre |
| URL visible dans le navigateur | Données cachées dans le corps de la requête |
| Exemple : afficher une liste | Exemple : ajouter un élément |

### Exemple concret

**GET : "Montre-moi la liste des étudiantes"**

```javascript
app.get('/students', (req, res) => {
  // On envoie la liste
});
```

**POST : "Ajoute cette nouvelle étudiante à la liste"**

```javascript
app.post('/students', (req, res) => {
  // On reçoit les infos et on ajoute
});
```

---

## 3. Créer des données en mémoire

### Étape 1 : Créer un tableau de données

Avant de faire des routes POST, on a besoin d'un endroit pour stocker les données.

```javascript
import express from 'express';
const app = express();

// Notre "base de données" (pour l'instant juste un tableau)
const students = [
  { id: 1, name: "Audrey", email: "audrey@dwwm.fr" },
  { id: 2, name: "Eunice", email: "eunice@dwwm.fr" },
  { id: 3, name: "Tahma", email: "tahma@dwwm.fr" }
];
```

**Pourquoi `let` et pas `const` ?**
- Avec `let`, on pourra modifier le tableau (ajouter, supprimer)
- Avec `const`, le tableau ne pourrait pas changer

### Étape 2 : Route GET pour afficher toutes les étudiantes

```javascript
app.get('/students', (req, res) => {
  res.json(students);
});
```

**Test dans le navigateur :**
- Allez sur `http://localhost:9000/students`
- Vous devez voir le tableau JSON avec les 3 étudiantes

---

## 4. Recevoir des données avec POST

### Problème : Express ne comprend pas le JSON automatiquement

Par défaut, Express ne sait pas lire les données JSON qu'on lui envoie. Il faut lui dire de les transformer.

### Solution : Ajouter le middleware `express.json()`

```javascript
import express from 'express';
const app = express();

// TRÈS IMPORTANT : Permet de lire le JSON envoyé
app.use(express.json());

const students = [
  { id: 1, name: "Audrey", email: "audrey@dwwm.fr" },
  { id: 2, name: "Eunice", email: "eunice@dwwm.fr" },
  { id: 3, name: "Tahma", email: "tahma@dwwm.fr" }
];
```

**Ce que fait `express.json()` :**
- Il transforme le JSON reçu en objet JavaScript
- Il le met dans `req.body`
- Sans ça, `req.body` serait `undefined`

---

## 5. Créer une route POST pour ajouter une étudiante

### Code complet avec explications

```javascript
app.post('/students', (req, res) => {
  // Étape 1 : Récupérer les données envoyées
  const newStudent = req.body;

  console.log("Données reçues :", newStudent);
  // Affichera quelque chose comme : { name: "Sophie", email: "sophie@dwwm.fr" }

  // Étape 2 : Créer un ID automatique
  const newId = students.length + 1;

  // Étape 3 : Ajouter l'ID aux données
  newStudent.id = newId;

  // Étape 4 : Ajouter au tableau
  students.push(newStudent);

  // Étape 5 : Renvoyer une confirmation
  res.status(201).json(newStudent);
});
```

### Explication détaillée ligne par ligne

**Ligne 1 : `app.post('/students', (req, res) => {`**
- `app.post` : créer une route qui réagit aux requêtes POST
- `'/students'` : l'URL où envoyer les données
- `(req, res) =>` : fonction qui s'exécute quand on reçoit une requête

**Ligne 2 : `const newStudent = req.body;`**
- `req.body` : contient les données envoyées (grâce à `express.json()`)
- On les met dans une variable pour faciliter la lecture

**Ligne 5 : `const newId = students.length + 1;`**
- `students.length` : nombre d'éléments dans le tableau (exemple : 3)
- `+ 1` : on ajoute 1 pour avoir le prochain ID (exemple : 4)

**Ligne 8 : `newStudent.id = newId;`**
- On ajoute la propriété `id` à l'objet
- Maintenant l'objet a : `{ name: "Sophie", email: "...", id: 4 }`

**Ligne 11 : `students.push(newStudent);`**
- `push()` : ajoute un élément à la fin du tableau
- Notre tableau a maintenant 4 étudiantes

**Ligne 14 : `res.status(201).json(newStudent);`**
- `status(201)` : code HTTP pour "créé avec succès"
- `json(...)` : renvoie l'étudiante créée en JSON

---

## 6. Tester la route POST

### Impossible de tester avec le navigateur

Le navigateur fait uniquement des requêtes GET quand on tape une URL. Pour POST, on doit utiliser un outil.

### Méthode 1 : Postman

**Installation :**
1. Téléchargez Postman : https://www.postman.com/downloads/
2. Installez l'application
3. Créez un compte (gratuit) ou utilisez sans compte

**Utilisation :**
1. Ouvrez Postman
2. Cliquez sur "New" puis "HTTP Request" (ou utilisez le raccourci Ctrl+N)
3. Changez la méthode de GET à POST (menu déroulant à gauche)
4. Entrez l'URL : `http://localhost:9000/students`
5. Allez dans l'onglet "Body"
6. Sélectionnez "raw"
7. Dans le menu déroulant à droite, choisissez "JSON"
8. Tapez dans la zone de texte :

```json
{
  "name": "Sophie",
  "email": "sophie@dwwm.fr"
}
```

9. Cliquez sur "Send"

**Résultat attendu :**

```json
{
  "id": 4,
  "name": "Sophie",
  "email": "sophie@dwwm.fr"
}
```

### Méthode 2 : cURL (ligne de commande)

```bash
curl -X POST http://localhost:9000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Sophie","email":"sophie@dwwm.fr"}'
```

---

## 7. Vérifier que ça a fonctionné

### Faire un GET pour voir toutes les étudiantes

Dans le navigateur, allez sur `http://localhost:9000/students`

Vous devriez voir 4 étudiantes maintenant :

```json
[
  {"id":1,"name":"Audrey","email":"audrey@dwwm.fr"},
  {"id":2,"name":"Eunice","email":"eunice@dwwm.fr"},
  {"id":3,"name":"Tahma","email":"tahma@dwwm.fr"},
  {"id":4,"name":"Sophie","email":"sophie@dwwm.fr"}
]
```

---

## 8. Code complet jusqu'ici

```javascript
import express from 'express';
const app = express();

// Middleware pour lire le JSON
app.use(express.json());

// Données en mémoire
const students = [
  { id: 1, name: "Audrey", email: "audrey@dwwm.fr" },
  { id: 2, name: "Eunice", email: "eunice@dwwm.fr" },
  { id: 3, name: "Tahma", email: "tahma@dwwm.fr" }
];

// GET : Récupérer toutes les étudiantes
app.get('/students', (req, res) => {
  res.json(students);
});

// POST : Ajouter une étudiante
app.post('/students', (req, res) => {
  const newStudent = req.body;
  const newId = students.length + 1;
  newStudent.id = newId;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Démarrer le serveur
app.listen(9000, () => {
  console.log('Serveur sur http://localhost:9000');
});
```

---

## 9. Ajouter une validation des données

### Problème

Si quelqu'un envoie des données vides, on ajoute quand même l'étudiante. Ce n'est pas correct.

### Solution : Vérifier avant d'ajouter

```javascript
app.post('/students', (req, res) => {
  const newStudent = req.body;

  // VÉRIFICATION : Est-ce qu'il y a un nom ?
  if (!newStudent.name) {
    return res.status(400).json({
      error: "Le nom est obligatoire"
    });
  }

  // VÉRIFICATION : Est-ce qu'il y a un email ?
  if (!newStudent.email) {
    return res.status(400).json({
      error: "L'email est obligatoire"
    });
  }

  // Si on arrive ici, tout est OK
  const newId = students.length + 1;
  newStudent.id = newId;
  students.push(newStudent);
  res.status(201).json(newStudent);
});
```

### Explication des vérifications

**`if (!newStudent.name)`**
- `!` signifie "NON" ou "PAS"
- Ça veut dire : "Si il n'y a PAS de nom"
- Si c'est vrai, on renvoie une erreur

**`return res.status(400).json(...)`**
- `return` arrête la fonction immédiatement
- `status(400)` : code HTTP pour "mauvaise requête"
- On renvoie un message d'erreur en JSON

### Test avec Postman

**Configuration de la requête :**
- **Méthode :** POST
- **URL :** `http://localhost:9000/students`
- **Body :** raw → JSON

Essayez d'envoyer ça (sans nom) :

```json
{
  "email": "test@test.fr"
}
```

**Résultat attendu :**

```json
{
  "error": "Le nom est obligatoire"
}
```

---

## 10. Récupérer une étudiante par son ID

### Route GET avec paramètre

```javascript
app.get('/students/:id', (req, res) => {
  // Récupérer l'ID depuis l'URL
  const id = parseInt(req.params.id);

  // Chercher l'étudiante dans le tableau
  const student = students.find(s => s.id === id);

  // Si pas trouvée
  if (!student) {
    return res.status(404).json({ error: "Étudiante non trouvée" });
  }

  // Si trouvée
  res.json(student);
});
```

### Explication

**`parseInt(req.params.id)`**
- `req.params.id` : récupère l'ID depuis l'URL
- `parseInt()` : transforme le texte en nombre
- Exemple : `"1"` devient `1`

**`students.find(s => s.id === id)`**
- `find()` : cherche dans le tableau
- `s => s.id === id` : condition de recherche
- Retourne l'élément trouvé ou `undefined`

### Test

- `http://localhost:9000/students/1` → retourne Audrey
- `http://localhost:9000/students/999` → erreur 404

---

## 11. Modifier une étudiante (PUT)

### Route PUT pour modification complète

```javascript
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  // Trouver l'index de l'étudiante
  const index = students.findIndex(s => s.id === id);

  // Si pas trouvée
  if (index === -1) {
    return res.status(404).json({ error: "Étudiante non trouvée" });
  }

  // Garder l'ID et remplacer les données
  updatedData.id = id;
  students[index] = updatedData;

  res.json(students[index]);
});
```

### Explication

**`findIndex()`**
- Trouve la position de l'élément dans le tableau
- Retourne `-1` si pas trouvé
- Exemple : Audrey est à l'index 0

**`students[index] = updatedData`**
- Remplace complètement l'élément à cette position

### Test avec Postman

**Configuration de la requête :**
- **Méthode :** PUT
- **URL :** `http://localhost:9000/students/1`
- **Body :** raw → JSON

```json
{
  "name": "Audrey Martin",
  "email": "audrey.martin@dwwm.fr"
}
```

---

## 12. Supprimer une étudiante (DELETE)

### Route DELETE

```javascript
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Trouver l'index
  const index = students.findIndex(s => s.id === id);

  // Si pas trouvée
  if (index === -1) {
    return res.status(404).json({ error: "Étudiante non trouvée" });
  }

  // Supprimer du tableau
  students.splice(index, 1);

  // Renvoyer succès sans contenu
  res.status(204).send();
});
```

### Explication

**`splice(index, 1)`**
- Supprime 1 élément à partir de l'index
- Modifie le tableau original

**`status(204).send()`**
- `204` = "No Content" (succès sans données à renvoyer)
- `send()` sans paramètre = réponse vide

### Test avec Postman

**Configuration de la requête :**
- **Méthode :** DELETE
- **URL :** `http://localhost:9000/students/4`
- Pas besoin de Body (laissez vide)

---

## 13. Récapitulatif : Les 4 opérations CRUD

**CRUD = Create, Read, Update, Delete**

| Opération | Méthode HTTP | Route | Ce que ça fait |
|-----------|--------------|-------|----------------|
| Create | POST | `/students` | Créer une nouvelle étudiante |
| Read (all) | GET | `/students` | Lire toutes les étudiantes |
| Read (one) | GET | `/students/:id` | Lire une étudiante |
| Update | PUT | `/students/:id` | Modifier une étudiante |
| Delete | DELETE | `/students/:id` | Supprimer une étudiante |

---

## 14. Code complet final

```javascript
import express from 'express';
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Audrey", email: "audrey@dwwm.fr" },
  { id: 2, name: "Eunice", email: "eunice@dwwm.fr" },
  { id: 3, name: "Tahma", email: "tahma@dwwm.fr" }
];

// GET : Toutes les étudiantes
app.get('/students', (req, res) => {
  res.json(students);
});

// GET : Une étudiante par ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "Étudiante non trouvée" });
  }

  res.json(student);
});

// POST : Créer une étudiante
app.post('/students', (req, res) => {
  const newStudent = req.body;

  if (!newStudent.name) {
    return res.status(400).json({ error: "Le nom est obligatoire" });
  }

  if (!newStudent.email) {
    return res.status(400).json({ error: "L'email est obligatoire" });
  }

  newStudent.id = students.length + 1;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT : Modifier une étudiante
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Étudiante non trouvée" });
  }

  updatedData.id = id;
  students[index] = updatedData;
  res.json(students[index]);
});

// DELETE : Supprimer une étudiante
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Étudiante non trouvée" });
  }

  students.splice(index, 1);
  res.status(204).send();
});

app.listen(9000, () => {
  console.log('Serveur sur http://localhost:9000');
});
```

---

## 15. Points importants à retenir

| Chose | À retenir |
|-------|-----------|
| `req.body` | Contient les données envoyées en POST/PUT |
| `req.params.id` | Contient le paramètre d'URL |
| `express.json()` | OBLIGATOIRE pour lire le JSON |
| `status(201)` | Code pour "créé" |
| `status(400)` | Code pour "erreur de données" |
| `status(404)` | Code pour "non trouvé" |
| `status(204)` | Code pour "succès sans contenu" |
| `push()` | Ajoute au tableau |
| `find()` | Trouve un élément |
| `findIndex()` | Trouve la position |
| `splice()` | Supprime du tableau |

---

**Prochaine étape :** Organisation modulaire - séparer ce code en plusieurs fichiers (routes, controllers).


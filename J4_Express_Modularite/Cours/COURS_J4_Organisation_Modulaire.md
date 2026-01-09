# Organisation Modulaire : Routes et Controllers

## Introduction

### Pourquoi organiser le code ?

Jusqu'à présent, nous avons mis tout notre code dans un seul fichier `server.js`. C'est bien pour apprendre, mais quand votre application grandit, cela devient difficile à gérer.

**Problème avec un seul fichier :**
- Le fichier devient très long (200, 300, 500 lignes...)
- Difficile de trouver une fonction spécifique
- Plusieurs personnes ne peuvent pas travailler en même temps
- Si vous modifiez une route, vous risquez de casser autre chose

**Solution : Organisation modulaire**
- Séparer le code en plusieurs fichiers
- Chaque fichier a une responsabilité précise
- Plus facile à lire, à comprendre et à maintenir

### Ce que nous allons apprendre

1. **Controllers** : La logique métier (ce que fait chaque route)
2. **Routes** : La définition des endpoints (quelles URLs existent)
3. **Structure de dossiers** : Comment organiser les fichiers
4. **Import/Export** : Comment faire communiquer les fichiers entre eux

---

## 1. Comprendre la structure actuelle

### Code actuel (tout dans server.js)

```javascript
import express from 'express';
const app = express();

app.use(express.json());

const students = [
  { id: 1, name: "Audrey", email: "audrey@dwwm.fr" },
  { id: 2, name: "Eunice", email: "eunice@dwwm.fr" }
];

// Route GET : Toutes les étudiantes
app.get('/students', (req, res) => {
  res.json(students);
});

// Route GET : Une étudiante par ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "Étudiante non trouvée" });
  }

  res.json(student);
});

// Route POST : Créer une étudiante
app.post('/students', (req, res) => {
  const newStudent = req.body;

  if (!newStudent.name) {
    return res.status(400).json({ error: "Le nom est obligatoire" });
  }

  newStudent.id = students.length + 1;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.listen(9000, () => {
  console.log('Serveur sur http://localhost:9000');
});
```

**Problème :** Tout est mélangé dans un seul fichier !

---

## 2. La nouvelle structure

### Structure de dossiers

Nous allons créer cette structure :

```
mon-projet/
├── controllers/
│   └── studentController.js
├── routes/
│   └── studentRoutes.js
└── server.js
```

**Explication :**
- `controllers/` : Dossier pour les controllers (la logique)
- `routes/` : Dossier pour les routes (les URLs)
- `server.js` : Le fichier principal qui démarre le serveur

---

## 3. Les Controllers (La logique métier)

### Qu'est-ce qu'un controller ?

Un **controller** est un fichier qui contient les **fonctions** qui font le travail réel.

**Exemple :** Au lieu d'avoir le code directement dans la route, on met le code dans une fonction dans le controller.

### Créer le controller

**Étape 1 : Créer le dossier**

```bash
mkdir controllers
```

**Étape 2 : Créer le fichier `studentController.js`**

```javascript
// controllers/studentController.js

// Nos données (pour l'instant en mémoire)
const students = [
  { id: 1, name: "Audrey", email: "audrey@dwwm.fr" },
  { id: 2, name: "Eunice", email: "eunice@dwwm.fr" }
];

// Fonction pour récupérer toutes les étudiantes
export const getAllStudents = (req, res) => {
  res.json(students);
};

// Fonction pour récupérer une étudiante par son ID
export const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "Étudiante non trouvée" });
  }

  res.json(student);
};

// Fonction pour créer une nouvelle étudiante
export const createStudent = (req, res) => {
  const newStudent = req.body;

  if (!newStudent.name) {
    return res.status(400).json({ error: "Le nom est obligatoire" });
  }

  newStudent.id = students.length + 1;
  students.push(newStudent);
  res.status(201).json(newStudent);
};
```

### Explication détaillée

**Ligne 1 : `// controllers/studentController.js`**
- C'est un commentaire qui indique le chemin du fichier
- Utile pour se repérer

**Ligne 4-7 : Les données**
- On met les données dans le controller
- `const students = [...]` : notre tableau d'étudiantes

**Ligne 10 : `export const getAllStudents = (req, res) => {`**
- `export` : permet d'utiliser cette fonction dans d'autres fichiers
- `const getAllStudents` : nom de la fonction (en camelCase)
- `(req, res) =>` : la fonction reçoit `req` et `res` comme paramètres
- C'est exactement la même chose que dans les routes !

**Ligne 11 : `res.json(students);`**
- On renvoie toutes les étudiantes
- C'est le même code qu'avant, juste dans une fonction

**Ligne 15 : `export const getStudentById = (req, res) => {`**
- Nouvelle fonction pour récupérer une étudiante par ID
- Même principe : `export` pour l'utiliser ailleurs

**Ligne 25 : `export const createStudent = (req, res) => {`**
- Fonction pour créer une étudiante
- Même logique qu'avant

### Pourquoi `export` ?

**Sans `export` :**
- La fonction existe seulement dans ce fichier
- On ne peut pas l'utiliser ailleurs

**Avec `export` :**
- La fonction peut être utilisée dans d'autres fichiers
- On peut l'importer dans `server.js` ou dans les routes

---

## 4. Les Routes (Les URLs)

### Qu'est-ce qu'un fichier de routes ?

Un fichier de **routes** définit **quelles URLs existent** et **quelle fonction appeler** pour chaque URL.

### Créer le fichier de routes

**Étape 1 : Créer le dossier**

```bash
mkdir routes
```

**Étape 2 : Créer le fichier `studentRoutes.js`**

```javascript
// routes/studentRoutes.js

import express from 'express';
import * as studentController from '../controllers/studentController.js';

// Créer un router Express
const router = express.Router();

// Définir les routes
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);

// Exporter le router
export default router;
```

### Explication détaillée ligne par ligne

**Ligne 1 : `// routes/studentRoutes.js`**
- Commentaire pour indiquer le chemin

**Ligne 3 : `import express from 'express';`**
- On importe Express (nécessaire pour créer un router)

**Ligne 4 : `import * as studentController from '../controllers/studentController.js';`**
- `import` : on importe quelque chose d'un autre fichier
- `* as studentController` : on importe TOUTES les fonctions exportées et on les met dans un objet appelé `studentController`
- `from '../controllers/studentController.js'` : le chemin vers le fichier
  - `..` signifie "remonter d'un niveau" (on est dans `routes/`, on remonte à la racine)
  - `controllers/studentController.js` : le fichier à importer

**Ligne 7 : `const router = express.Router();`**
- `express.Router()` : crée un objet router
- Un router permet de regrouper plusieurs routes ensemble
- On le met dans une variable `router`

**Ligne 10 : `router.get('/', studentController.getAllStudents);`**
- `router.get` : définit une route GET
- `'/'` : l'URL (ici c'est relatif, on verra plus tard)
- `studentController.getAllStudents` : la fonction à appeler quand on accède à cette route
  - `studentController` : l'objet qu'on a importé
  - `.getAllStudents` : la fonction à l'intérieur

**Ligne 11 : `router.get('/:id', studentController.getStudentById);`**
- Route GET avec un paramètre `:id`
- Appelle la fonction `getStudentById`

**Ligne 12 : `router.post('/', studentController.createStudent);`**
- Route POST
- Appelle la fonction `createStudent`

**Ligne 15 : `export default router;`**
- `export default` : on exporte le router
- `default` signifie que c'est l'export principal du fichier
- On pourra l'importer dans `server.js`

### Différence entre `export` et `export default`

**`export const maFonction = ...` (export nommé)**
- On peut exporter plusieurs choses
- On doit utiliser le même nom à l'import : `import { maFonction } from ...`

**`export default router` (export par défaut)**
- On exporte une seule chose principale
- On peut utiliser n'importe quel nom à l'import : `import monRouter from ...`

---

## 5. Modifier server.js

### Le nouveau server.js

```javascript
// server.js

import express from 'express';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

// Middleware pour lire le JSON
app.use(express.json());

// Utiliser les routes des étudiantes
app.use('/students', studentRoutes);

// Démarrer le serveur
app.listen(9000, () => {
  console.log('Serveur sur http://localhost:9000');
});
```

### Explication détaillée

**Ligne 1 : `// server.js`**
- Commentaire

**Ligne 3 : `import express from 'express';`**
- On importe Express (comme avant)

**Ligne 4 : `import studentRoutes from './routes/studentRoutes.js';`**
- On importe le router qu'on a créé
- `./routes/studentRoutes.js` : chemin relatif (même dossier que server.js)
- On l'appelle `studentRoutes` (mais on pourrait l'appeler autrement)

**Ligne 6 : `const app = express();`**
- On crée l'application Express (comme avant)

**Ligne 9 : `app.use(express.json());`**
- Middleware pour lire le JSON (comme avant)

**Ligne 12 : `app.use('/students', studentRoutes);`**
- `app.use` : on utilise quelque chose
- `'/students'` : le préfixe pour toutes les routes
- `studentRoutes` : le router qu'on a importé

**Comment ça fonctionne ?**
- Dans `studentRoutes.js`, on a défini `router.get('/', ...)`
- Avec `app.use('/students', studentRoutes)`, cette route devient `/students/`
- Donc `GET /students` appelle `getAllStudents`

**Ligne 15-17 : Démarrer le serveur**
- Comme avant

---

## 6. Résumé du flux

### Quand on fait une requête GET /students

1. **Le serveur reçoit la requête** dans `server.js`
2. **server.js** voit que c'est `/students` et utilise `studentRoutes`
3. **studentRoutes.js** voit que c'est `GET /` et appelle `studentController.getAllStudents`
4. **studentController.js** exécute la fonction `getAllStudents` et renvoie les données

### Schéma

```
Requête GET /students
    ↓
server.js (app.use('/students', studentRoutes))
    ↓
studentRoutes.js (router.get('/', getAllStudents))
    ↓
studentController.js (getAllStudents fonction)
    ↓
Réponse JSON
```

---

## 7. Code complet organisé

### Structure finale

```
mon-projet/
├── controllers/
│   └── studentController.js
├── routes/
│   └── studentRoutes.js
└── server.js
```

### controllers/studentController.js

```javascript
// controllers/studentController.js

const students = [
  { id: 1, name: "Audrey", email: "audrey@dwwm.fr" },
  { id: 2, name: "Eunice", email: "eunice@dwwm.fr" }
];

export const getAllStudents = (req, res) => {
  res.json(students);
};

export const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "Étudiante non trouvée" });
  }

  res.json(student);
};

export const createStudent = (req, res) => {
  const newStudent = req.body;

  if (!newStudent.name) {
    return res.status(400).json({ error: "Le nom est obligatoire" });
  }

  newStudent.id = students.length + 1;
  students.push(newStudent);
  res.status(201).json(newStudent);
};
```

### routes/studentRoutes.js

```javascript
// routes/studentRoutes.js

import express from 'express';
import * as studentController from '../controllers/studentController.js';

const router = express.Router();

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);

export default router;
```

### server.js

```javascript
// server.js

import express from 'express';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

app.use(express.json());

app.use('/students', studentRoutes);

app.listen(9000, () => {
  console.log('Serveur sur http://localhost:9000');
});
```

---

## 8. Tester que tout fonctionne

### Test 1 : GET /students

**Dans Postman :**
- **Méthode :** GET
- **URL :** `http://localhost:9000/students`

**Résultat attendu :** Liste de toutes les étudiantes

### Test 2 : GET /students/1

**Dans Postman :**
- **Méthode :** GET
- **URL :** `http://localhost:9000/students/1`

**Résultat attendu :** Détails d'Audrey

### Test 3 : POST /students

**Dans Postman :**
- **Méthode :** POST
- **URL :** `http://localhost:9000/students`
- **Body :** raw → JSON

```json
{
  "name": "Sophie",
  "email": "sophie@dwwm.fr"
}
```

**Résultat attendu :** Nouvelle étudiante créée avec ID 3

---

## 9. Avantages de cette organisation

### Avant (un seul fichier)

```javascript
// server.js - 100 lignes, tout mélangé
app.get('/students', ...);
app.post('/students', ...);
app.get('/products', ...);
app.post('/products', ...);
// Difficile de s'y retrouver !
```

### Après (organisation modulaire)

```
controllers/
  ├── studentController.js (logique des étudiantes)
  └── productController.js (logique des produits)

routes/
  ├── studentRoutes.js (routes des étudiantes)
  └── productRoutes.js (routes des produits)

server.js (juste la configuration)
```

**Avantages :**
- Chaque fichier a un rôle clair
- Facile de trouver une fonction
- Plusieurs personnes peuvent travailler en même temps
- Facile d'ajouter de nouvelles fonctionnalités

---

## 10. Points importants à retenir

| Concept | Explication |
|---------|-------------|
| **Controller** | Fichier qui contient les fonctions (la logique) |
| **Routes** | Fichier qui définit les URLs et appelle les fonctions |
| **export** | Permet d'utiliser une fonction dans un autre fichier |
| **import** | Permet d'utiliser une fonction d'un autre fichier |
| **Router** | Objet Express qui regroupe plusieurs routes |
| **app.use()** | Utilise un router avec un préfixe d'URL |

### Syntaxe importante

**Exporter une fonction :**
```javascript
export const maFonction = (req, res) => {
  // code
};
```

**Importer toutes les fonctions :**
```javascript
import * as monController from './controllers/monController.js';
// Utilisation : monController.maFonction
```

**Exporter par défaut :**
```javascript
export default router;
```

**Importer par défaut :**
```javascript
import monRouter from './routes/monRoutes.js';
```

---

## 11. Erreurs courantes

### Erreur 1 : Oublier `export`

```javascript
// MAUVAIS
const getAllStudents = (req, res) => {
  res.json(students);
};

// BON
export const getAllStudents = (req, res) => {
  res.json(students);
};
```

**Problème :** Sans `export`, la fonction n'est pas accessible dans d'autres fichiers.

### Erreur 2 : Mauvais chemin d'import

```javascript
//  MAUVAIS (si on est dans routes/)
import * as controller from 'controllers/studentController.js';

// BON
import * as controller from '../controllers/studentController.js';
```

**Problème :** Il faut utiliser `..` pour remonter d'un niveau de dossier.

### Erreur 3 : Oublier `.js` à la fin

```javascript
// MAUVAIS
import studentRoutes from './routes/studentRoutes';

// BON
import studentRoutes from './routes/studentRoutes.js';
```

**Problème :** Avec ES modules, il faut l'extension `.js`.

### Erreur 4 : Confondre `export` et `export default`

```javascript
// Dans le controller
export const getAllStudents = ...; // export nommé

// Dans les routes
import { getAllStudents } from ...; //  BON
import getAllStudents from ...;     //  MAUVAIS (pour export nommé)
```

---

## 12. Prochaine étape

Maintenant que vous savez organiser votre code, vous pouvez :
- Ajouter d'autres routes (PUT, DELETE)
- Créer d'autres controllers (products, courses, etc.)
- Ajouter des middlewares
- Organiser encore mieux avec des modèles (models)

**Dans le prochain cours, nous verrons :**
- Comment ajouter les routes PUT et DELETE
- Comment créer plusieurs controllers
- Comment partager des données entre fichiers

---

## Récapitulatif

### Structure de fichiers

```
mon-projet/
├── controllers/          ← La logique (les fonctions)
│   └── studentController.js
├── routes/              ← Les URLs (les routes)
│   └── studentRoutes.js
└── server.js            ← Le point d'entrée
```

### Flux d'une requête

```
Requête → server.js → routes → controller → Réponse
```

### Commandes importantes

```bash
# Créer les dossiers
mkdir controllers
mkdir routes

# Créer les fichiers
touch controllers/studentController.js
touch routes/studentRoutes.js
```

### Syntaxe à retenir

**Exporter :**
```javascript
export const maFonction = ...;
export default monRouter;
```

**Importer :**
```javascript
import * as controller from './controllers/controller.js';
import router from './routes/routes.js';
```

---

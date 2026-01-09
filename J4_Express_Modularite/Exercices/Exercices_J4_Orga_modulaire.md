## Exercice 1 : Structure complète avec validation (Avancé)

### Objectif
Créer une API complète pour les cours avec validation et organisation modulaire.

### Instructions

1. Créez `controllers/courseController.js` avec les données suivantes :

```javascript
// controllers/courseController.js

const courses = [
  {
    id: 1,
    title: "Express.js",
    duration: 7,
    instructor: "Jean Dupont"
  },
  {
    id: 2,
    title: "SQL",
    duration: 14,
    instructor: "Marie Martin"
  }
];

// TODO: Créez getAllCourses
// TODO: Créez getCourseById
// TODO: Créez createCourse avec validations :
//       - title : obligatoire, minimum 5 caractères
//       - duration : obligatoire, nombre entre 1 et 30
//       - instructor : obligatoire, minimum 3 caractères
// TODO: Créez updateCourse (mêmes validations)
// TODO: Créez deleteCourse
```

2. Créez `routes/courseRoutes.js` avec toutes les routes CRUD

3. Ajoutez les routes dans `server.js`

### Test

Testez toutes les opérations :
- Créer un cours valide
- Créer un cours avec titre trop court (erreur 400)
- Créer un cours avec durée invalide (erreur 400)


## Exercice 2 : Refactoriser du code existant (Avancé)

### Objectif
Prendre du code existant dans un seul fichier et le réorganiser.

### Code à refactoriser

Voici un `server.js` avec tout le code mélangé :

```javascript
import express from 'express';
const app = express();

app.use(express.json());

const books = [
  { id: 1, title: "Le Petit Prince", author: "Saint-Exupéry" },
  { id: 2, title: "1984", author: "Orwell" }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Livre non trouvé" });
  }
  res.json(book);
});

app.post('/books', (req, res) => {
  const newBook = req.body;
  if (!newBook.title) {
    return res.status(400).json({ error: "Le titre est obligatoire" });
  }
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Livre non trouvé" });
  }
  updatedData.id = id;
  books[index] = updatedData;
  res.json(books[index]);
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Livre non trouvé" });
  }
  books.splice(index, 1);
  res.status(204).send();
});

app.listen(9000, () => {
  console.log('Serveur sur http://localhost:9000');
});
```

### Instructions

1. Créez la structure de dossiers
2. Créez `controllers/bookController.js` avec toutes les fonctions
3. Créez `routes/bookRoutes.js` avec toutes les routes
4. Modifiez `server.js` pour utiliser les routes
5. Testez que tout fonctionne comme avant

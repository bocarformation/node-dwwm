## Questions

### Question 1
Quel est le principal avantage d'organiser le code en plusieurs fichiers ?

A) Le code est plus rapide
B) Le code est plus facile à lire et maintenir
C) Le code utilise moins de mémoire
D) Le code est plus sécurisé

---

### Question 2
Dans quelle structure de dossiers doit-on mettre les fonctions qui contiennent la logique métier ?

A) `routes/`
B) `controllers/`
C) `models/`
D) `utils/`

---

### Question 3
Dans quelle structure de dossiers doit-on mettre les définitions des routes (URLs) ?

A) `routes/`
B) `controllers/`
C) `models/`
D) `utils/`

---

### Question 4
Quel mot-clé permet d'exporter une fonction pour l'utiliser dans un autre fichier ?

A) `import`
B) `export`
C) `require`
D) `module`

---

### Question 5
Comment importer TOUTES les fonctions exportées d'un controller ?

A) `import getAllStudents from './controllers/studentController.js'`
B) `import * as studentController from './controllers/studentController.js'`
C) `import { getAllStudents } from './controllers/studentController.js'`
D) `import studentController from './controllers/studentController.js'`

---

### Question 6
Quel objet Express permet de regrouper plusieurs routes ensemble ?

A) `express.App()`
B) `express.Router()`
C) `express.Route()`
D) `express.Group()`

---

### Question 7
Dans `routes/studentRoutes.js`, quel est le bon chemin pour importer le controller ?

A) `'./controllers/studentController.js'`
B) `'../controllers/studentController.js'`
C) `'controllers/studentController.js'`
D) `'/controllers/studentController.js'`

---

### Question 8
Quelle méthode permet d'utiliser un router avec un préfixe d'URL dans server.js ?

A) `app.get()`
B) `app.post()`
C) `app.use()`
D) `app.route()`

---

### Question 9
Si on a `app.use('/students', studentRoutes)` et dans `studentRoutes.js` on a `router.get('/', ...)`, quelle est l'URL complète ?

A) `/`
B) `/students`
C) `/students/`
D) `/routes/students`

---

### Question 10
Quelle syntaxe permet d'exporter par défaut un router ?

A) `export router`
B) `export default router`
C) `export { router }`
D) `module.exports = router`

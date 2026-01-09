## Exercice 4 : Modifier un produit (PUT) (Intermédiaire)

### Objectif
Créer une route pour modifier complètement un produit existant.

### Instructions

Créez une route `PUT /products/:id` qui :
- Récupère l'ID depuis l'URL
- Trouve la position du produit avec `findIndex()`
- Si non trouvé : erreur 404
- Si trouvé : remplace les données
- Garde l'ID original
- Renvoie le produit modifié

### Code de départ

```javascript
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  // TODO: Trouver l'index avec findIndex()

  // TODO: Vérifier si index === -1 (non trouvé)

  // TODO: Garder l'ID et remplacer les données

  // TODO: Renvoyer le produit modifié
});
```

### Test avec Postman

**Configuration :**
- **Méthode :** PUT
- **URL :** `http://localhost:9000/products/1`
- **Body :** raw → JSON

```json
{
  "name": "PC Gaming",
  "price": 1200
}
```

**Résultat attendu :**

```json
{
  "id": 1,
  "name": "PC Gaming",
  "price": 1200
}
```

---

## Exercice 5 : Supprimer un produit (DELETE) (Intermédiaire)

### Objectif
Créer une route pour supprimer un produit.

### Instructions

Créez une route `DELETE /products/:id` qui :
- Récupère l'ID depuis l'URL
- Trouve la position avec `findIndex()`
- Si non trouvé : erreur 404
- Si trouvé : supprime avec `splice()`
- Renvoie status 204 (pas de contenu)

### Code de départ

```javascript
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // TODO: Trouver l'index

  // TODO: Vérifier si existe

  // TODO: Supprimer avec splice(index, 1)

  // TODO: Renvoyer status 204
});
```

### Test avec Postman

**Configuration :**
- **Méthode :** DELETE
- **URL :** `http://localhost:9000/products/2`
- Pas de Body

Ensuite, faites un GET pour vérifier que le produit a bien été supprimé.

---

## Exercice 6 : API complète des étudiantes (Avancé)

### Objectif
Créer une API REST complète pour gérer les étudiantes de la classe.

### Instructions

Créez un serveur avec les données suivantes :

```javascript
const students = [
  { id: 1, name: "Audrey", age: 24, course: "DWWM" },
  { id: 2, name: "Eunice", age: 22, course: "DWWM" },
  { id: 3, name: "Tahma", age: 23, course: "DWWM" }
];
```

### Routes à créer

#### 1. GET /students
Renvoie toutes les étudiantes

#### 2. GET /students/:id
Renvoie une étudiante spécifique
- Erreur 404 si non trouvée

#### 3. POST /students
Crée une nouvelle étudiante

**Validations :**
- `name` : obligatoire, minimum 2 caractères
- `age` : obligatoire, doit être un nombre entre 16 et 99
- `course` : obligatoire, doit être "DWWM" ou "CDA"

- Status 201 si succès
- Status 400 si validation échoue

#### 4. PUT /students/:id
Modifie une étudiante
- Applique les mêmes validations que POST
- Erreur 404 si non trouvée

#### 5. DELETE /students/:id
Supprime une étudiante
- Status 204 si succès
- Erreur 404 si non trouvée

### Tests à effectuer

**Test POST avec données valides :**

```json
{
  "name": "Sophie",
  "age": 25,
  "course": "DWWM"
}
```

**Test POST avec age invalide :**

```json
{
  "name": "Test",
  "age": 150,
  "course": "DWWM"
}
```

Doit renvoyer une erreur 400

**Test POST avec course invalide :**

```json
{
  "name": "Test",
  "age": 25,
  "course": "INVALID"
}
```

Doit renvoyer une erreur 400
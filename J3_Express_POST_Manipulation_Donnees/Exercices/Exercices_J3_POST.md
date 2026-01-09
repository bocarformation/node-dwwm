# Exercices : Routes POST et Manipulation de Données

## Exercice 1 : Premier POST (Débutant)

### Objectif
Créer votre première route POST pour ajouter des données.

### Instructions

1. Créez un fichier `server.js`
2. Initialisez Express avec ESM (`"type": "module"` dans package.json)
3. Créez un tableau de produits :

```javascript
const products = [
  { id: 1, name: "Ordinateur", price: 800 },
  { id: 2, name: "Souris", price: 25 }
];
```

4. Créez les routes suivantes :
   - `GET /products` : Affiche tous les produits
   - `POST /products` : Ajoute un nouveau produit

### Points à respecter

- N'oubliez pas `app.use(express.json());`
- L'ID doit être auto-incrémenté
- Renvoyez un status 201 pour la création

### Test avec Postman

**Configuration :**
- **Méthode :** POST
- **URL :** `http://localhost:9000/products`
- **Body :** raw → JSON

```json
{
  "name": "Clavier",
  "price": 45
}
```

**Résultat attendu :**

```json
{
  "id": 3,
  "name": "Clavier",
  "price": 45
}
```

---

## Exercice 2 : Validation des données (Débutant)

### Objectif
Ajouter des vérifications avant de créer un produit.

### Instructions

Reprenez l'exercice 1 et ajoutez des validations dans la route POST :

**Règles de validation :**
- `name` : obligatoire, minimum 2 caractères
- `price` : obligatoire, doit être un nombre positif

### Code de départ

```javascript
app.post('/products', (req, res) => {
  const newProduct = req.body;

  // TODO: Vérifier que name existe et fait au moins 2 caractères

  // TODO: Vérifier que price existe et est un nombre positif

  // Si tout est OK, ajouter le produit
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});
```

### Tests à faire

**Test 1 - Sans nom :**

```json
{
  "price": 50
}
```

Doit renvoyer : `{ "error": "Le nom est obligatoire" }` avec status 400

**Test 2 - Nom trop court :**

```json
{
  "name": "A",
  "price": 50
}
```

Doit renvoyer : `{ "error": "Le nom doit faire au moins 2 caractères" }` avec status 400

**Test 3 - Prix négatif :**

```json
{
  "name": "Test",
  "price": -10
}
```

Doit renvoyer : `{ "error": "Le prix doit être positif" }` avec status 400

**Test 4 - Données valides :**

```json
{
  "name": "Écran",
  "price": 200
}
```

Doit renvoyer le produit créé avec status 201

---

## Exercice 3 : GET par ID (Intermédiaire)

### Objectif
Récupérer un seul produit en fonction de son ID.

### Instructions

Ajoutez une route `GET /products/:id` qui :
- Récupère l'ID depuis l'URL
- Le transforme en nombre avec `parseInt()`
- Cherche le produit dans le tableau avec `find()`
- Si trouvé : renvoie le produit
- Si non trouvé : renvoie une erreur 404

### Code de départ

```javascript
app.get('/products/:id', (req, res) => {
  // TODO: Récupérer l'ID depuis req.params.id et le convertir en nombre

  // TODO: Chercher le produit avec find()

  // TODO: Si pas trouvé, renvoyer erreur 404

  // TODO: Si trouvé, renvoyer le produit
});
```

### Tests

- `GET /products/1` → doit renvoyer le premier produit
- `GET /products/999` → doit renvoyer `{ "error": "Produit non trouvé" }` avec status 404

---
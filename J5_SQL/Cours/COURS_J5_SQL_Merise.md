# Jour 3 : Introduction à SQL, Merise et Variables d'Environnement pour la BDD

## Objectifs de la journée

- Comprendre ce qu'est une base de données relationnelle et SQL
- S'initier à la méthode de conception Merise (MCD/MLD)
- Installer l'environnement MySQL (serveur et client graphique)
- Utiliser les variables d'environnement pour la connexion BDD
- Apprendre les requêtes SQL de base (CRUD simple)

---

## Introduction : Pourquoi les Bases de Données ?

Jusqu'à présent, nos applications stockent les données en mémoire (dans des tableaux JavaScript). Le problème, c'est que si on arrête le serveur, toutes les données sont perdues !

Une **Base de Données (BDD)** est un système qui permet de :
- **Stocker** des données de manière permanente (même si l'application s'arrête)
- **Organiser** ces données de façon structurée (comme dans un tableau Excel, mais en mieux)
- **Récupérer**, **modifier** et **supprimer** ces données facilement

---

## 1. SQL : Le langage des Bases de Données Relationnelles

### Qu'est-ce que SQL ?

**SQL** (Structured Query Language) est le langage standard pour communiquer avec les bases de données relationnelles.

Imaginez une base de données comme une immense bibliothèque. SQL est le langage que vous utilisez pour dire au bibliothécaire :
- "Donne-moi tous les livres de l'auteur X" (`SELECT`)
- "Ajoute ce nouveau livre" (`INSERT`)
- "Le titre de ce livre est faux, corrige-le" (`UPDATE`)
- "Supprime ce livre" (`DELETE`)

### Bases de données relationnelles populaires

Il existe plusieurs systèmes de gestion de bases de données (SGBD) qui utilisent SQL :
- **MySQL** (très populaire, souvent utilisé avec PHP, Node.js)
- **PostgreSQL** (très robuste, populaire pour les applications complexes)
- **SQLite** (léger, intégré, souvent pour des petites applications ou mobiles)
- **SQL Server** (Microsoft)
- **Oracle Database** (Oracle)

Nous allons nous concentrer sur **MySQL** pour l'installation et les exemples.

---

## 2. Merise : La méthode pour concevoir une Base de Données

### Qu'est-ce que Merise ?

**Merise** est une méthode française de conception de systèmes d'information. Pour les bases de données, elle nous aide à penser *avant* de coder.

Elle se divise en plusieurs étapes, dont les deux plus importantes pour nous sont :

1.  **Modèle Conceptuel de Données (MCD)** :
    - C'est une vue "humaine" des données.
    - On identifie les **entités** (les choses importantes comme `Étudiant`, `Cours`, `Produit`)
    - On identifie leurs **propriétés** (les informations sur l'entité, ex: `nom`, `age`, `prix`)
    - On identifie les **relations** entre les entités (ex: un `Étudiant` *s'inscrit à* un `Cours`)
    - *Pas de technique, juste l'idée des informations*.

2.  **Modèle Logique de Données (MLD)** :
    - C'est la traduction du MCD en tables (ce que la base de données comprend).
    - Chaque entité devient une **table**.
    - Chaque propriété devient une **colonne**.
    - Les relations sont transformées en clés étrangères (`FOREIGN KEY`).
    - *C'est la partie technique qui sera transformée en SQL*.

**Analogie simple :**
- **MCD** : Faire un croquis de ce que vous voulez construire (une maison, un robot).
- **MLD** : Créer les plans techniques détaillés de cette maison/robot, prêts à être construits.

Nous ne ferons qu'une introduction très simple pour le moment, le détail sera vu plus tard.

---

## 3. Installation de l'environnement MySQL (Windows)

Pour travailler avec MySQL, nous avons besoin de deux choses :
1.  Le **serveur MySQL** : le logiciel qui stocke et gère les bases de données.
2.  Un **client MySQL** : un outil pour envoyer des commandes au serveur (ligne de commande ou interface graphique).

### Étape 1 : Télécharger et Installer MySQL Installer

1.  Allez sur le site officiel de MySQL : link:https://dev.mysql.com/downloads/installer/[MySQL Downloads]
2.  Cliquez sur "**MySQL Installer for Windows**" (normalement le plus gros fichier `.msi`).
3.  Choisissez l'option "**Download**" sans compte Oracle (cliquez sur "No thanks, just start my download.")
4.  Lancez le fichier `.msi` téléchargé.

### Étape 2 : Configuration de MySQL Installer

1.  **Choisir un type d'installation :** Sélectionnez "**Developer Default**". Cela installera le serveur, Workbench, et d'autres outils.
2.  **Vérification des prérequis :** L'installateur peut signaler des prérequis (par exemple, un package Visual C++). Suivez les instructions pour les installer si nécessaire.
3.  **Installation :** Cliquez sur "**Execute**" pour installer chaque composant.
4.  **Configuration du serveur :**
    -   **Type et chemin réseau :** Laissez par défaut ("Standalone MySQL Server / Classic MySQL Replication")
    -   **Port :** Laissez le port par défaut **3306** (très important)
    -   **Méthode d'authentification :** Sélectionnez "**Use Strong Password Encryption for Authentication (RECOMMENDED)**"
    -   **Mot de passe ROOT :** C'est le mot de passe de l'administrateur de votre base de données. Choisissez un mot de passe **FACILE À RETENIR** pour les cours (ex: `root` ou `password`), mais **N'UTILISEZ JAMAIS ÇA EN PRODUCTION !**
    -   **Utilisateurs :** Vous pouvez ajouter un utilisateur si vous voulez, mais le compte `root` suffira pour l'instant.
    -   **Nom du service Windows :** Laissez par défaut.
    -   **Appliquer la configuration :** Cliquez sur "Execute" pour appliquer toutes les configurations.
5.  **Installation terminée :** Cliquez sur "Finish".

### Étape 3 : Tester avec MySQL Workbench

1.  Lancez **MySQL Workbench** (vous le trouverez dans vos programmes).
2.  Vous devriez voir une connexion "**Local instance MySQL80**" (ou similaire) dans la liste.
3.  Cliquez dessus. Il vous demandera le mot de passe `root` que vous avez défini pendant l'installation.
4.  Si la connexion réussit, vous verrez l'interface de MySQL Workbench. Cela signifie que votre serveur MySQL est bien installé et fonctionne !

---

## 4. Variables d'Environnement pour la Base de Données

### Pourquoi les utiliser avec la BDD ?

C'est **CRUCIAL** de ne jamais mettre les informations sensibles de votre base de données (nom d'utilisateur, mot de passe) directement dans votre code JavaScript.

**Raisons :**
- **Sécurité :** Si votre code est partagé (ex: sur GitHub), n'importe qui pourrait voir vos identifiants de BDD.
- **Flexibilité :** Vous pouvez changer les informations de connexion sans modifier le code (ex: BDD de développement, BDD de production).

Nous allons utiliser le package `dotenv`

### Étape 1 : Installer `dotenv`

```bash
npm install dotenv
```

### Étape 2 : Créer un fichier `.env` à la racine de votre projet

```env
# Fichier .env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_root
DB_NAME=dwwm_app
DB_PORT=3306

PORT=9000 # Le port de votre serveur Express
NODE_ENV=development
```

**Explication :**
- `DB_HOST` : L'adresse de votre serveur de base de données (souvent `localhost` sur votre machine)
- `DB_USER` : Le nom d'utilisateur (par défaut, c'est `root` pour MySQL)
- `DB_PASSWORD` : Le mot de passe que vous avez choisi lors de l'installation de MySQL
- `DB_NAME` : Le nom de la base de données spécifique que votre application utilisera (nous la créerons plus tard)
- `DB_PORT` : Le port de MySQL (par défaut `3306`)

### Étape 3 : Ajouter `.env` au `.gitignore`

Assurez-vous que votre fichier `.gitignore` contient `/.env` pour ne pas envoyer vos identifiants sensibles sur Git.

```
# .gitignore
node_modules/
.env
```

### Étape 4 : Utiliser les variables d'environnement dans votre code Node.js

```javascript
// server.js ou un fichier de configuration de BDD

import dotenv from 'dotenv';
dotenv.config(); // Charge les variables du .env dans process.env

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

console.log(`Connexion à la BDD:
  Hôte: ${dbHost}
  Utilisateur: ${dbUser}
  Mot de passe: ${dbPassword} (Ne jamais afficher en prod !)
  Base de données: ${dbName}
  Port: ${dbPort}
`);

// Plus tard, nous utiliserons ces variables pour nous connecter réellement à la BDD
```

**Explication :**
- `dotenv.config()` : Lit le fichier `.env` et met les variables dedans dans `process.env`.
- `process.env.DB_HOST` : Accède à la variable `DB_HOST`.

---

## 5. SQL : Les requêtes de base (CRUD)

Maintenant que l'environnement est prêt, voyons les commandes SQL de base.

### Concepts clés

-   **Table** : C'est comme une feuille Excel. Elle contient des données organisées.
-   **Colonne** : Un champ de la table (ex: `id`, `name`, `email`). Chaque colonne a un **type de données**.
-   **Ligne (ou Enregistrement)** : Une entrée complète dans la table (ex: un utilisateur).
-   **Clé Primaire (PRIMARY KEY)** : Une colonne spéciale qui identifie de manière unique chaque ligne dans une table (souvent `id`). Elle ne peut pas être vide et doit être unique pour chaque ligne.

### Types de données SQL courants

-   `INT` : Nombre entier (ex: 1, 100, -5)
-   `VARCHAR(taille)` : Texte de longueur variable (ex: `VARCHAR(255)` pour un nom)
-   `TEXT` : Texte long
-   `BOOLEAN` ou `TINYINT(1)` : Vrai/Faux
-   `DATE` : Date (ex: 'YYYY-MM-DD')
-   `DATETIME` : Date et heure
-   `FLOAT` ou `DOUBLE` : Nombres à virgule

### Requêtes SQL de base (Utilisation dans MySQL Workbench)

Ouvrez MySQL Workbench, connectez-vous, puis ouvrez un onglet "SQL File" ou cliquez sur l'icône "Query" pour taper des commandes.

#### 1. Créer une base de données (`CREATE DATABASE`)

```sql
CREATE DATABASE IF NOT EXISTS dwwm_app;
USE dwwm_app;
```

- `CREATE DATABASE` : Crée une nouvelle base de données.
- `IF NOT EXISTS` : Évite une erreur si la BDD existe déjà.
- `USE dwwm_app` : Sélectionne la base de données pour travailler dedans.

#### 2. Créer une table (`CREATE TABLE`)

Créons une table `users` pour stocker des informations sur les utilisateurs.

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

-   `id INT AUTO_INCREMENT PRIMARY KEY` :
    -   `INT` : Type entier.
    -   `AUTO_INCREMENT` : L'ID est généré automatiquement (1, 2, 3...). Pratique !
    -   `PRIMARY KEY` : C'est la clé primaire, unique et non nulle.
-   `name VARCHAR(255) NOT NULL` :
    -   `VARCHAR(255)` : Texte jusqu'à 255 caractères.
    -   `NOT NULL` : Ce champ ne peut pas être vide.
-   `email VARCHAR(255) NOT NULL UNIQUE` :
    -   `UNIQUE` : Chaque email doit être différent (pas deux utilisateurs avec le même email).
-   `created_at DATETIME DEFAULT CURRENT_TIMESTAMP` : Date et heure de création, remplie automatiquement.

#### 3. Insérer des données (`INSERT INTO`)

Ajoutons quelques utilisateurs à notre table.

```sql
INSERT INTO users (name, email) VALUES ('Audrey', 'audrey@dwwm.fr');
INSERT INTO users (name, email) VALUES ('Eunice', 'eunice@dwwm.fr');
INSERT INTO users (name, email) VALUES ('Tahma', 'tahma@dwwm.fr');
```

- `INSERT INTO users` : Spécifie la table.
- `(name, email)` : Liste des colonnes où insérer (l'`id` est auto-incrémenté).
- `VALUES (...)` : Les valeurs à insérer, dans le même ordre que les colonnes.

#### 4. Lire des données (`SELECT`)

Récupérer toutes les données :

```sql
SELECT * FROM users;
```

- `SELECT *` : Sélectionne toutes les colonnes.
- `FROM users` : De la table `users`.

Récupérer des données spécifiques (avec `WHERE`) :

```sql
SELECT name, email FROM users WHERE id = 1;
SELECT * FROM users WHERE name = 'Audrey';
```

- `SELECT name, email` : Sélectionne seulement les colonnes `name` et `email`.
- `WHERE id = 1` : Filtre les résultats pour n'avoir que l'utilisateur avec `id` 1.

#### 5. Modifier des données (`UPDATE`)

Changeons le nom de l'utilisateur avec l'ID 1.

```sql
UPDATE users SET name = 'Audrey Martin', email = 'audrey.m@dwwm.fr' WHERE id = 1;
```

- `UPDATE users` : Spécifie la table à modifier.
- `SET name = '...', email = '...'` : Définit les nouvelles valeurs pour les colonnes.
- `WHERE id = 1` : **TRÈS IMPORTANT !** Sans `WHERE`, vous modifieriez TOUTES les lignes de la table !

#### 6. Supprimer des données (`DELETE`)

Supprimons l'utilisateur avec l'ID 2.

```sql
DELETE FROM users WHERE id = 2;
```

- `DELETE FROM users` : Spécifie la table d'où supprimer.
- `WHERE id = 2` : **TRÈS IMPORTANT !** Sans `WHERE`, vous supprimeriez TOUTES les lignes de la table !

---

## 6. Merise : Du MCD au MLD (Exemple simple)

### Exemple de MCD

Imaginez que nous voulons gérer des `Produits` et des `Catégories`.

```
+-----------+
| CATÉGORIE |
+-----------+
| id_cat PK |
| nom_cat   |
+-----|-----+
      |1,n
      |appartient_à
      |1,1
+----------+
| PRODUIT  |
+----------+
| id_prod PK |
| nom_prod   |
| prix_prod  |
+----------+
```

**Explication :**
- `CATÉGORIE` et `PRODUIT` sont des **entités**.
- `id_cat`, `nom_cat`, `id_prod`, `nom_prod`, `prix_prod` sont des **propriétés**.
- `PK` : Clé Primaire.
- `appartient_à` : Relation.
- `1,n` : Une catégorie peut avoir plusieurs produits.
- `1,1` : Un produit appartient à une seule catégorie (obligatoire).

### Traduction en MLD et SQL (simplifié)

Le MLD va transformer ces entités et relations en tables SQL.

**Tables :**

1.  **`categories`** (pour l'entité CATÉGORIE)
    - `id_cat` (PRIMARY KEY, INT, AUTO_INCREMENT)
    - `nom_cat` (VARCHAR)

2.  **`products`** (pour l'entité PRODUIT)
    - `id_prod` (PRIMARY KEY, INT, AUTO_INCREMENT)
    - `nom_prod` (VARCHAR)
    - `prix_prod` (FLOAT)
    - `category_id` (INT, FOREIGN KEY vers `categories.id_cat`) ← C'est la relation !

**Requêtes SQL de création :**

```sql
-- Table des catégories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Table des produits
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

**Explication de `FOREIGN KEY` :**
-   `FOREIGN KEY (category_id)` : La colonne `category_id` de la table `products` est une clé étrangère.
-   `REFERENCES categories(id)` : Elle fait référence à la colonne `id` de la table `categories`.
-   Cela crée un lien entre les tables : un `product` ne peut exister que si son `category_id` correspond à un `id` existant dans la table `categories`.

---

## Récapitulatif

-   **Base de Données** : Stockage persistant des données.
-   **SQL** : Langage pour interroger les bases de données relationnelles.
-   **Merise (MCD/MLD)** : Méthode pour concevoir la structure de la BDD.
-   **Installation MySQL** : Serveur (MySQL Server) et client (MySQL Workbench).
-   **Variables d'environnement (.env)** : Pour la sécurité et la flexibilité des identifiants BDD.
-   **Requêtes SQL de base (CRUD)** : `CREATE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`.

---

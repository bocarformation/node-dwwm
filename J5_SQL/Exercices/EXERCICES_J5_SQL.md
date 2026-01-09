## Exercice 1 : Opérations CRUD de base en SQL (Pratique)

### Objectif
Maîtriser les requêtes SQL `INSERT`, `SELECT`, `UPDATE`, `DELETE` pour manipuler les données de la table `students`.

### Instructions

1.  **Assurez-vous d'être connecté à `dwwm_app`** dans MySQL Workbench (utilisez `USE dwwm_app;` si nécessaire).
2.  **Exécutez les commandes SQL suivantes** dans l'ordre et observez les résultats après chaque `SELECT` :

    ```sql
    -- 1. Insérer 3 étudiants dans la table students
    INSERT INTO students (name, email, age, course) VALUES ('Audrey', 'audrey@dwwm.fr', 24, 'DWWM');
    INSERT INTO students (name, email, age, course) VALUES ('Eunice', 'eunice@dwwm.fr', 22, 'DWWM');
    INSERT INTO students (name, email, age, course) VALUES ('Tahma', 'tahma@dwwm.fr', 23, 'CDA');

    -- 2. Sélectionner tous les étudiants
    SELECT * FROM students;

    -- 3. Sélectionner l'étudiant avec l'ID 1
    SELECT * FROM students WHERE id = 1;

    -- 4. Sélectionner les étudiants du cours 'DWWM'
    SELECT * FROM students WHERE course = 'DWWM';

    -- 5. Mettre à jour l'email de l'étudiant avec l'ID 1
    UPDATE students SET email = 'audrey.martin@dwwm.fr' WHERE id = 1;

    -- 6. Sélectionner à nouveau l'étudiant avec l'ID 1 pour vérifier la modification
    SELECT * FROM students WHERE id = 1;

    -- 7. Supprimer l'étudiant avec l'ID 2
    DELETE FROM students WHERE id = 2;

    -- 8. Sélectionner tous les étudiants pour vérifier la suppression
    SELECT * FROM students;
    ```

### Vérification

-   Après chaque `SELECT`, vous devez voir les résultats attendus dans le panneau de sortie de MySQL Workbench.
-   L'étudiant avec l'ID 1 doit avoir un nouvel email après l'`UPDATE`.
-   L'étudiant avec l'ID 2 ne doit plus apparaître après le `DELETE`.

---
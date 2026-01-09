import express from "express";

const app = express();
const PORT = 9000;

// Permet de lire le JSON que le serveur reçoit
app.use(express.json());
// Permet de lire le body (x-www-form-url-encoded)
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {

    res.send("Bienvenue sur notre app express !")
})

// Simule une base de données
const students = [
    { id: 1, name: "Audrey", email: "audrey@dwwm.fr" }, // 0
    { id: 20, name: "Eunice", email: "eunice@dwwm.fr" }, // 1
    { id: 3, name: "Tahma", email: "tahma@dwwm.fr" }, // 2

]
app.get("/students", (req, res) => {
    res.json(students)
})

app.post("/students", (req, res) => {
    // Récupérer les infos du client
    const newStudent = req.body

    // Vérification: Le nom est-il bien présent ?
    if (!newStudent.name || newStudent.name.trim() === "" ) {
        return res.status(400).json({
            error: "Le nom est obligatoire"
        })
    }

    if(newStudent.name.length < 2){
        return res.status(400).json({
            error: "trop court"
        })
    }
    // Bonjour Eunice
    // Vérification: l'email est-il bien présent?
    if (!newStudent.email || newStudent.email.trim() === "") {
        return res.status(400).json({
            error: "L'email est obligatoire"
        })
    }

    console.log(newStudent);

    // Créer un ID automatique
    const newId = students.length + 1;

    // Ajouter l'ID aux données
    newStudent.id = newId;

    // Ajouter au tableau
    students.push(newStudent);

    // Envoyer une confirmation
    res.status(201).json(newStudent)

})

// Récupérer un étudiant par son ID
app.get("/students/:id", (req, res) => {
    // On récupère l'ID depuis l'URL
    // parseInt converti une chaine de caractères en nombre
    const id = parseInt(req.params.id); // Exemple : "1" converti en 1

    // Chercher l'étudiant-edans le tableau
    const student = students.find((oneStudent) => oneStudent.id === id);

    // Si pas trouvé
    if(!student){
        return res.status(404).json({
            error:"Etudiant non trouvé"
        })
    }

    res.json(student)

})

app.listen(PORT, () => {
    console.log("Serveur est bien démarré à http://localhost:" + PORT)
})



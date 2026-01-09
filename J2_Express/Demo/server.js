// Ne fonctionne pas si le type est "module"
// const express = require("express"); // commonJS
import express from "express"; // ESModule

const app = express();
const PORT = 9000;

app.get("/", (req, res) => {
    res.send("Bonjour avec Express"); // Du texte
})

// Paramètre dynamique

const datas = [
    { id: 1, title: "Comment créer un serveur" },
    { id: 2, title: "Lancer un serveur" },
    { id: 3, title: "Configurer le port du serveur" },
    { id: 4, title: "Ajouter une route GET" },
    { id: 5, title: "Ajouter une route POST" },
    { id: 6, title: "Redémarrer un serveur Node" },
    { id: 7, title: "Utiliser un middleware" },
    { id: 8, title: "Gérer les paramètres URL" },
    { id: 9, title: "Sécuriser un serveur" },
    { id: 10, title: "Servir des fichiers statiques" },
    { id: 11, title: "Activer le CORS" },
    { id: 12, title: "Connecter une base de données" },
    { id: 13, title: "Créer un logger serveur" },
    { id: 14, title: "Mettre en place JWT" },
    { id: 15, title: "Tester un serveur" },
    { id: 16, title: "Déployer un serveur" },
    { id: 17, title: "Surveiller un serveur" },
    { id: 18, title: "Créer un serveur HTTPS" },
    { id: 19, title: "Optimiser les performances" },
    { id: 20, title: "Documenter un serveur" }
]

app.get("/articles/:articleId", (req, res) => {
    const articleId = req.params.articleId; // Pour récupérer le paramètre dynamique
    // const {articleId} = req.params;
    // console.log(req.params);


    res.json({ article: datas[articleId - 1] }); // du JSON
})


//Query Strings

app.get("/search", (req, res) => {
    // const {color, productName} = req.query;
    const color = req.query.color;
    const productName  = req.query.productName;

    res.json({ color: color, name: productName})

})


app.listen(PORT, () => {
    console.log("Serveur est bien demarré: http://localhost:" + PORT);

})
// -----------------------------------------



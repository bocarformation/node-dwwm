import express from "express";

const app = express();
const PORT = 9001

// - `GET /` : Renvoie "Page d'accueil"
app.get("/", (req, res) => {
    res.send("Page d'accueil")
})

//   - `GET /about` : Renvoie "À propos de nous"
app.get("/about", (req, res) => {

    res.send("À propos de nous")
})

//    - `GET /contact` : Renvoie un JSON avec `{ email: "contact@exemple.fr", phone: "01 23 45 67 89" }`
app.get("/contact", (req, res) => {
    res.json({ email: "bocar@dev.fr", phone: "01 45 78 88 25" })
})

//    - `GET /api/status` : Renvoie un JSON avec `{ status: "OK", timestamp: Date.now() }`
app.get("/api/status", (req, res) => {
res.json({status: "OK", timestamp: Date.now()})
})




app.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT);
})
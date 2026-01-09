import express from "express";
import studentRouter from "./routes/studentRoutes.js";

const app = express();
const PORT = 9000;

// Permet de lire le JSON que le serveur reçoit
app.use(express.json());
// Permet de lire le body (x-www-form-url-encoded)
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {

    res.send("Bienvenue sur notre app express !")
})

// http://localhost:9000/students/
// http://localhost:9000/students/:id
app.use("/students", studentRouter);


app.listen(PORT, () => {
    console.log("Serveur est bien démarré à http://localhost:" + PORT)
})



const http = require("http");
const clubs = require("./data");


// Je créé mon serveur

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "text/plain; charset=utf-8")

    if (req.url === "/") {
        res.end("Bienvenue sur l'API de la fédération sportive");
    } else if (req.url === "/clubs") {
        let response = "Liste des clubs: \n";
        for (let i = 0; i < clubs.length; i++) {
            response += clubs[i].name + " " + clubs[i].sport + " " + clubs[i].members + " membres \n";
        }
        res.end(response)
    } else if (req.url === "/stats") {
        let totalMembers = 0;
        for (let i = 0; i < clubs.length; i++) {
            totalMembers += clubs[i].members;
        }
        const response = "Statistiques : \n" +
            "Nombre de clubs : " + clubs.length + "\n" +
            "Nombre total de membres : " + totalMembers;
        res.end(response)
    } else if (req.url === "/sports") {
        const sports = [];
        for (let i = 0; i < clubs.length; i++) {
            if (sports.indexOf(clubs[i].sport) === -1) {
                sports.push(clubs[i].sport);
            }
        }
        let response = "Liste des disciplines disponibles: \n";
        for (let i = 0; i < sports.length; i++) {
            response += sports[i] + "\n"
        }
        res.end(response)
    } else {
        res.statusCode = 404;
        res.end("Page non trouvée");
    }

})


server.listen(9000, () => {
    console.log("Server is running at http://localhost:9000");
})
// _________________________________________________
// NE RIEN METTRE APRES server.listen
//___________________________________________________



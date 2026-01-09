const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    if(req.url === "/"){
        res.end("Accueil - Fédération sportive");
    } else if(req.url === "/clubs"){
        res.end("Liste des clubs: Paris, Lyon")
    }
})


const PORT = 9000;

// Routes


server.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT);

})
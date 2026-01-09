import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = [
    { id: 1, name: "Ordinateur", price: 800 },
    { id: 20, name: "Souris", price: 25 }
]

app.get("/", (req, res) => {
    res.json({ message: "Welcome" })
})

app.get("/products", (req, res) => {
    res.json(products)
})

app.post("/products", (req, res) => {
    const newProduct = req.body;

    if (!newProduct.name) {
        return res.status(400).json({ error: "Le nom est obligatoire" });
    }

    if (newProduct.name.length < 2) {
        return res.status(400).json({ error: "Le nom doit faire au moins 2 caractères" })
    }

    if (!newProduct.price) {
        return res.status(400).json({ error: "Le prix est obligatoire" })
    }
    // const audrey = "audrey"
    // console.log(typeof audrey) // string;

    // Toujours pour le prix
    if (typeof newProduct.price !== "number" || newProduct.price <= 0) {
        return res.status(400).json({ error: "Le prix doit être positif" })
    }

    newProduct.id = products.length + 1;
    products.push(newProduct);
    res.status(201).json(newProduct)
})


app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ error: "Produit non trouvé" })
    }

    res.json(product);
})

const PORT = 9000;
app.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT);

})